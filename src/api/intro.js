import { getStrategy } from './client'

export async function fetchProfile() {
  const s = getStrategy()
  return s.fetchJson('/intro/profile', '/intro/profile.json')
}
