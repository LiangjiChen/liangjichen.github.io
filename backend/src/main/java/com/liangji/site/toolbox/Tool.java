package com.liangji.site.toolbox;

import java.util.List;

public record Tool(
        String id,
        String name,
        String description,
        String category,
        String url,
        List<String> tags
) {
}
