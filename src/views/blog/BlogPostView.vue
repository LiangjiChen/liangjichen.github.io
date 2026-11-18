<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { fetchPost } from '../../api/blog'

const route = useRoute()
const post = ref(null)
const error = ref('')

const html = computed(() => (post.value ? marked.parse(post.value.content) : ''))

const formatDate = (value) =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(value))

watch(
  () => route.params.slug,
  async (slug) => {
    post.value = null
    error.value = ''
    try {
      post.value = await fetchPost(slug)
      document.title = `${post.value.title} · 陈良骥`
    } catch (err) {
      error.value = err.message
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="page">
    <p v-if="error" class="state state-error">文章加载失败：{{ error }}</p>
    <p v-else-if="!post" class="state">加载中…</p>

    <article v-else class="article">
      <header class="article-header">
        <p class="page-kicker">Blog</p>
        <h1 class="article-title">{{ post.title }}</h1>
        <div class="article-meta">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span aria-hidden="true">·</span>
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <p class="article-summary">{{ post.summary }}</p>
      </header>

      <div class="prose" v-html="html"></div>

      <RouterLink to="/blog" class="back-link">← 返回博客列表</RouterLink>
    </article>
  </div>
</template>
