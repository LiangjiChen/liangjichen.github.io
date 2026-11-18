<script setup>
import { computed, onMounted, ref } from 'vue'
import { fetchTools } from '../../api/toolbox'

const tools = ref([])
const error = ref('')
const activeCategory = ref('全部')

const categories = computed(() => {
  const names = [...new Set(tools.value.map((tool) => tool.category))]
  return ['全部', ...names.sort((a, b) => a.localeCompare(b, 'zh-CN'))]
})

const visibleTools = computed(() =>
  activeCategory.value === '全部'
    ? tools.value
    : tools.value.filter((tool) => tool.category === activeCategory.value)
)

onMounted(async () => {
  try {
    tools.value = await fetchTools()
  } catch (err) {
    error.value = err.message
  }
})
</script>

<template>
  <div class="page">
    <div class="page-head">
      <p class="page-kicker">Toolbox</p>
      <h1 class="page-title">工具箱</h1>
      <p class="page-desc">
        日常开发中高频使用的工具与文档，按用途分类整理，随时取用。
      </p>
    </div>

    <p v-if="error" class="state state-error">工具箱加载失败：{{ error }}</p>
    <p v-else-if="!tools.length" class="state">加载中…</p>

    <template v-else>
      <div class="toolbar">
        <button
          v-for="category in categories"
          :key="category"
          class="filter-btn"
          :class="{ 'is-active': category === activeCategory }"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div class="tool-grid">
        <a
          v-for="tool in visibleTools"
          :key="tool.id"
          class="tool-card"
          :href="tool.url"
          target="_blank"
          rel="noopener"
        >
          <div class="tool-topline">
            <span class="tool-category">{{ tool.category }}</span>
            <span class="tool-arrow" aria-hidden="true">↗</span>
          </div>
          <h2 class="tool-name">{{ tool.name }}</h2>
          <p class="tool-desc">{{ tool.description }}</p>
          <div class="tool-tags">
            <span v-for="tag in tool.tags" :key="tag" class="tool-tag">{{ tag }}</span>
          </div>
        </a>
      </div>
    </template>
  </div>
</template>
