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
    <div class="page-head">
      <p class="page-kicker">About</p>
      <h1 class="page-title">关于我</h1>
      <p v-if="profile" class="page-desc">{{ profile.englishName }} · {{ profile.title }}</p>
    </div>

    <p v-if="error" class="state state-error">关于我加载失败：{{ error }}</p>
    <p v-else-if="!profile" class="state">加载中…</p>

    <template v-else>
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">我是谁</h2>
        </div>
        <div class="bio">
          <p v-for="paragraph in profile.bio" :key="paragraph">{{ paragraph }}</p>
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
