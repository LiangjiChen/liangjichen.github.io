import { request } from './client'

export function fetchPosts() {
  return request('/blog/posts')
}

export function fetchPost(slug) {
  return request(`/blog/posts/${encodeURIComponent(slug)}`)
}
