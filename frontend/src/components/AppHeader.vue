<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { to: '/', label: '个人介绍' },
  { to: '/toolbox', label: '工具箱' },
  { to: '/blog', label: '博客' }
]

const isActive = (item) =>
  item.to === '/' ? route.path === '/' : route.path.startsWith(item.to)

const currentLabel = computed(() => {
  const active = navItems.find(isActive)
  return active ? active.label : '个人介绍'
})
</script>

<template>
  <header class="site-header">
    <div class="container">
      <RouterLink to="/" class="brand" :aria-label="`陈良骥的个人网站，当前栏目：${currentLabel}`">
        <span class="brand-mark">L</span>
        <span class="brand-name">陈良骥 · Liangji Chen</span>
      </RouterLink>
      <nav class="nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ 'is-active': isActive(item) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
