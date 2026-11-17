package com.liangji.site.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 允许本地开发时前端（Vite dev server）跨域访问 API；
 * 同时支持把前端 dist 构建产物打包进后端，由后端统一托管静态资源（Nginx 替代）。
 * 通过 site.frontend-dist 配置静态资源目录，默认不存在时 Web 应用只暴露 /api/**。
 *
 * SPA 回退策略：
 *  - 真实静态文件、/api/** 控制器优先命中（controller > resource handler > error page）；
 *  - 当没有真实文件也没有 API 控制器匹配时，通过 Tomcat 的 404 error page 回退到 /index.html，
 *    从而让 Vue Router 的 history 模式刷新子路由不会 404。
 */
@Configuration
public class WebConfig implements WebMvcConfigurer,
        WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    @Value("${site.frontend-dist:${user.dir}/../frontend/dist}")
    private String frontendDist;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET")
                .maxAge(3600);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        java.io.File dir = new java.io.File(frontendDist);
        if (!dir.isDirectory()) {
            return;
        }
        registry.addResourceHandler("/**")
                .addResourceLocations("file:" + dir.getAbsolutePath() + "/")
                .setCachePeriod(3600);
    }

    @Override
    public void customize(ConfigurableServletWebServerFactory factory) {
        java.io.File dir = new java.io.File(frontendDist);
        if (!dir.isDirectory()) {
            return;
        }
        // 只有 SPA 入口（index.html）存在时才启用 404 回退
        if (!new java.io.File(dir, "index.html").isFile()) {
            return;
        }
        factory.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/index.html"));
    }
}
