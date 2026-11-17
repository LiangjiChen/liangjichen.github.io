import { getStrategy } from './client'

export async function fetchTools() {
  const s = getStrategy()
  return s.fetchJson('/toolbox/tools', '/toolbox/tools.json')
}
