import { request } from './client'

export function fetchTools() {
  return request('/toolbox/tools')
}
