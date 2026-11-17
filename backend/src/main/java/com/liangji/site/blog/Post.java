package com.liangji.site.blog;

import java.util.List;

public record Post(
        String slug,
        String title,
        String summary,
        String date,
        List<String> tags,
        String content
) {
}
