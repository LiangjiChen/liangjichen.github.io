import { getStrategy } from './client'

export async function fetchPosts() {
  const s = getStrategy()
  return s.fetchJson('/blog/posts', '/blog/posts.json')
}

export async function fetchPost(slug) {
  const s = getStrategy()
  const mode = s.mode

  if (mode === 'static') {
    // 纯静态模式：posts.json 的 file 字段映射到 posts/<slug>.md
    const posts = await s.fetchJson('/blog/posts', '/blog/posts.json')
    const meta = posts.find((p) => p.slug === slug)
    if (!meta) throw new Error(`文章不存在: ${slug}`)
    const markdown = await s.fetchText(
      `/blog/posts/${encodeURIComponent(slug)}/content`,
      `/blog/posts/${meta.file}`
    )
    return {
      slug: meta.slug,
      title: meta.title,
      summary: meta.summary,
      date: meta.date,
      tags: meta.tags,
      content: markdown
    }
  }

  // dynamic / auto：优先让后端返回完整 Post（metadata + content）
  return s.fetchJson(`/blog/posts/${encodeURIComponent(slug)}`, `/blog/posts/${slug}.virtual`)
}
