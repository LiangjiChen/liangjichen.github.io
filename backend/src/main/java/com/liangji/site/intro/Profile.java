package com.liangji.site.intro;

import java.util.List;

public record Profile(
        String name,
        String englishName,
        String title,
        String tagline,
        String email,
        String avatar,
        List<String> bio,
        List<Social> socials,
        List<SkillGroup> skills,
        List<Focus> focus
) {

    public record Social(String label, String url) {
    }

    public record SkillGroup(String group, List<String> items) {
    }

    public record Focus(String title, String description) {
    }
}
