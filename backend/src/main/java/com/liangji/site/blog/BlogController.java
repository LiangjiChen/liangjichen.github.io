package com.liangji.site.blog;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping("/posts")
    public List<PostMeta> posts() {
        return blogService.listPosts();
    }

    @GetMapping("/posts/{slug}")
    public Post post(@PathVariable String slug) {
        return blogService.getPost(slug);
    }
}
