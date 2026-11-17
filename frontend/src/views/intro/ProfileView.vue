<script setup>
import { onMounted, ref } from 'vue'
import { fetchProfile } from '../../api/intro'

const profile = ref(null)
const error = ref('')

onMounted(async () => {
  try {
    profile.value = await fetchProfile()
  } catch (err) {
    error.value = err.message
  }
})
</script>

<template>
  <div class="page">
    <p v-if="error" class="state state-error">
      个人介绍加载失败：{{ error }}。请确认后端服务已启动。
    </p>
    <p v-else-if="!profile" class="state">加载中…</p>

    <template v-else>
      <section class="hero">
        <div>
          <h1 class="hero-title">{{ profile.name }}</h1>
          <p class="hero-role">{{ profile.title }}</p>
          <p class="hero-tagline">{{ profile.tagline }}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#about">了解我</a>
            <RouterLink class="btn btn-ghost" to="/blog">阅读博客</RouterLink>
          </div>
        </div>
        <div class="hero-photo">
          <img :src="profile.avatar" :alt="`${profile.name}的头像`" />
        </div>
      </section>

      <section id="about" class="section">
        <div class="section-head">
          <h2 class="section-title">关于我</h2>
          <span class="section-note">{{ profile.englishName }}</span>
        </div>
        <div class="bio">
          <p v-for="paragraph in profile.bio" :key="paragraph">{{ paragraph }}</p>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2 class="section-title">技术方向</h2>
        </div>
        <div class="skill-groups">
          <div v-for="group in profile.skills" :key="group.group" class="skill-group">
            <h3>{{ group.group }}</h3>
            <div class="chips">
              <span v-for="item in group.items" :key="item" class="chip">{{ item }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2 class="section-title">关注领域</h2>
        </div>
        <div class="focus-grid">
          <article v-for="item in profile.focus" :key="item.title" class="focus-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2 class="section-title">联系我</h2>
          <span class="section-note">欢迎交流</span>
        </div>
        <div class="contact-list">
          <a
            v-for="social in profile.socials"
            :key="social.label"
            class="contact-link"
            :href="social.url"
            target="_blank"
            rel="noopener"
          >
            {{ social.label }}
          </a>
        </div>
      </section>
    </template>
  </div>
</template>
