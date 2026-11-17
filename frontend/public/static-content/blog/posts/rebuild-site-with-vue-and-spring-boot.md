原来的站点是一个 Jekyll 静态博客。这次把它改造成前后端分离的结构，方便后续扩展工具箱这类交互内容，也让文章与个人资料可以统一由后端管理。

## 整体结构

项目按前端、后端拆分成两个目录，三个板块的代码各自归位：

```text
.
├── frontend/                  Vue 3 + Vite
│   └── src/
│       ├── views/intro/       个人介绍
│       ├── views/toolbox/     工具箱
│       └── views/blog/        博客
└── backend/                   Spring Boot
    └── src/main/
        ├── java/com/liangji/site/
        │   ├── intro/         个人介绍接口
        │   ├── toolbox/       工具箱接口
        │   └── blog/          博客接口
        └── resources/content/
            ├── intro/         个人资料
            ├── toolbox/       工具清单
            └── blog/          文章索引与正文
```

## 前端：Vue 3 + Vue Router

页面按板块拆分，路由对应三个入口：

```js
const routes = [
  { path: '/', component: ProfileView },
  { path: '/toolbox', component: ToolboxView },
  { path: '/blog', component: BlogListView },
  { path: '/blog/:slug', component: BlogPostView }
]
```

开发时通过 Vite 的代理把 `/api` 转发到后端，避免额外的跨域配置：

```js
server: {
  proxy: {
    '/api': { target: 'http://localhost:8080', changeOrigin: true }
  }
}
```

## 后端：Spring Boot 提供内容接口

后端不接数据库，内容以 JSON 与 Markdown 文件的形式放在 `resources/content` 下，启动时加载、按需读取：

- `GET /api/intro/profile`：个人介绍
- `GET /api/toolbox/tools`：工具清单
- `GET /api/blog/posts`：文章列表
- `GET /api/blog/posts/{slug}`：文章详情

博客正文保留 Markdown 格式，前端用 `marked` 渲染成 HTML，写作体验和静态博客保持一致。

## 小结

这次改造的重点不是技术栈本身，而是把内容按板块沉淀到清晰的目录里。之后新增一篇文章或一个工具，只需要改对应的内容文件，不用动页面代码。
