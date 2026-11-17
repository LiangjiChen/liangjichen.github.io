package com.liangji.site.common;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * 统一从 classpath 的 content 目录读取 JSON / Markdown 内容。
 */
@Component
public class ContentLoader {

    private final ObjectMapper objectMapper;

    public ContentLoader(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public <T> T loadJson(String path, Class<T> type) {
        try (InputStream input = open(path)) {
            return objectMapper.readValue(input, type);
        } catch (IOException e) {
            throw new IllegalStateException("无法读取内容文件: " + path, e);
        }
    }

    public <T> List<T> loadJsonList(String path, TypeReference<List<T>> type) {
        try (InputStream input = open(path)) {
            return objectMapper.readValue(input, type);
        } catch (IOException e) {
            throw new IllegalStateException("无法读取内容文件: " + path, e);
        }
    }

    public String loadText(String path) {
        try (InputStream input = open(path)) {
            return StreamUtils.copyToString(input, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalStateException("无法读取内容文件: " + path, e);
        }
    }

    private InputStream open(String path) throws IOException {
        return new ClassPathResource(path).getInputStream();
    }
}
