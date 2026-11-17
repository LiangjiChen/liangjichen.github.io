package com.liangji.site.toolbox;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/toolbox")
public class ToolboxController {

    private final ToolboxService toolboxService;

    public ToolboxController(ToolboxService toolboxService) {
        this.toolboxService = toolboxService;
    }

    @GetMapping("/tools")
    public List<Tool> tools() {
        return toolboxService.getTools();
    }
}
