package com.liangji.site.blog;

import java.util.List;

/**
 * 博客列表项：只包含元信息，正文按需从 Markdown 文件读取。
 */
public record PostMeta(
        String slug,
        String title,
        String summary,
        String date,
        List<String> tags,
        String file
) {
}
