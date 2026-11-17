package com.liangji.site.blog;

import com.fasterxml.jackson.core.type.TypeReference;
import com.liangji.site.common.ContentLoader;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

@Service
public class BlogService {

    private static final String INDEX_PATH = "content/blog/posts.json";
    private static final String POST_DIRECTORY = "content/blog/posts/";

    private final ContentLoader contentLoader;
    private final List<PostMeta> posts;

    public BlogService(ContentLoader contentLoader) {
        this.contentLoader = contentLoader;
        this.posts = contentLoader.loadJsonList(INDEX_PATH, new TypeReference<List<PostMeta>>() {
                }).stream()
                .sorted(Comparator.comparing((PostMeta post) -> LocalDate.parse(post.date())).reversed())
                .toList();
    }

    public List<PostMeta> listPosts() {
        return posts;
    }

    public Post getPost(String slug) {
        PostMeta meta = posts.stream()
                .filter(post -> post.slug().equals(slug))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "文章不存在: " + slug));

        String markdown = contentLoader.loadText(POST_DIRECTORY + meta.file());
        return new Post(meta.slug(), meta.title(), meta.summary(), meta.date(), meta.tags(), markdown);
    }
}
