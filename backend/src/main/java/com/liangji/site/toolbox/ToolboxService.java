package com.liangji.site.toolbox;

import com.fasterxml.jackson.core.type.TypeReference;
import com.liangji.site.common.ContentLoader;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToolboxService {

    private static final String CONTENT_PATH = "content/toolbox/tools.json";

    private final List<Tool> tools;

    public ToolboxService(ContentLoader contentLoader) {
        this.tools = contentLoader.loadJsonList(CONTENT_PATH, new TypeReference<List<Tool>>() {
        });
    }

    public List<Tool> getTools() {
        return tools;
    }
}
