package com.liangji.site.intro;

import com.liangji.site.common.ContentLoader;
import org.springframework.stereotype.Service;

@Service
public class IntroService {

    private static final String CONTENT_PATH = "content/intro/profile.json";

    private final Profile profile;

    public IntroService(ContentLoader contentLoader) {
        this.profile = contentLoader.loadJson(CONTENT_PATH, Profile.class);
    }

    public Profile getProfile() {
        return profile;
    }
}
