<script setup>
import { onMounted, ref } from 'vue'
import { fetchPosts } from '../../api/blog'

const posts = ref([])
const error = ref('')

const formatDate = (value) =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(value))

onMounted(async () => {
  try {
    posts.value = await fetchPosts()
  } catch (err) {
    error.value = err.message
  }
})
</script>

<template>
  <div class="page">
    <div class="page-head">
      <p class="page-kicker">Blog</p>
      <h1 class="page-title">博客</h1>
      <p class="page-desc">记录软件工程、SCM 与编程教育中的实践与思考。</p>
    </div>

    <p v-if="error" class="state state-error">博客加载失败：{{ error }}</p>
    <p v-else-if="!posts.length" class="state">加载中…</p>

    <div v-else class="post-list">
      <RouterLink
        v-for="post in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="post-item"
      >
        <time class="post-date" :datetime="post.date">{{ formatDate(post.date) }}</time>
        <div>
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-summary">{{ post.summary }}</p>
          <div class="post-meta">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
