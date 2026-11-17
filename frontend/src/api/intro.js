import { request } from './client'

export function fetchProfile() {
  return request('/intro/profile')
}
