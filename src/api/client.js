// 站点运行模式
// 'static'  —— 默认。只使用 static-content 下的静态内容（纯前端部署）
// 'auto'    —— 优先 /api，失败回退静态内容
// 'dynamic' —— 强制 /api，失败直接抛错
export const SITE_MODE =
  (typeof window !== 'undefined' && window.__SITE_MODE__) || 'static'

export const STATIC_BASE = '/static-content'
// 后端独立部署时，可在 site-config.js 中配置完整地址（如 https://api.example.com）
export const API_BASE =
  (typeof window !== 'undefined' && window.__API_BASE__) || '/api'

/**
 * 获取当前生效的数据源：
 *   static        -> 返回 'static'
 *   dynamic       -> 返回 'api'
 *   auto + 可用   -> 根据后端连通性动态选择（每次调用时评估）
 */
export function getStrategy() {
  return new Strategy(SITE_MODE)
}

export class Strategy {
  constructor(mode) {
    this.mode = mode
    this._apiOk = null // 未知 -> true -> false
  }

  /**
   * 拉取 JSON。mode='auto' 时会先探测 API，不可达再回退静态。
   */
  async fetchJson(apiPath, staticPath) {
    if (this.mode === 'static') return this._staticJson(staticPath)
    if (this.mode === 'dynamic') return this._apiJson(apiPath, true)

    // auto：上次已知 API 失败则直接静态，已知成功则走 API
    if (this._apiOk === false) return this._staticJson(staticPath)

    try {
      const data = await this._apiJson(apiPath, false)
      this._apiOk = true
      return data
    } catch (err) {
      // dynamic 模式强制抛错；auto 模式回退静态
      if (this.mode === 'dynamic') throw err
      this._apiOk = false
      return this._staticJson(staticPath)
    }
  }

  async fetchText(apiPath, staticPath) {
    if (this.mode === 'static') return this._staticText(staticPath)
    if (this.mode === 'dynamic') return this._apiText(apiPath, true)

    if (this._apiOk === false) return this._staticText(staticPath)
    try {
      const text = await this._apiText(apiPath, false)
      this._apiOk = true
      return text
    } catch (err) {
      if (this.mode === 'dynamic') throw err
      this._apiOk = false
      return this._staticText(staticPath)
    }
  }

  async _apiJson(path, mustSucceed) {
    const res = await fetch(`${API_BASE}${path}`, { cache: 'no-cache' })
    if (!res.ok) {
      const err = new Error(`API 请求失败（${res.status}）: ${path}`)
      if (mustSucceed) throw err
      throw err
    }
    return res.json()
  }

  async _staticJson(path) {
    const res = await fetch(`${STATIC_BASE}${path}`, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`静态内容加载失败（${res.status}）: ${path}`)
    return res.json()
  }

  async _apiText(path, mustSucceed) {
    const res = await fetch(`${API_BASE}${path}`, { cache: 'no-cache' })
    if (!res.ok) {
      const err = new Error(`API 请求失败（${res.status}）: ${path}`)
      if (mustSucceed) throw err
      throw err
    }
    return res.text()
  }

  async _staticText(path) {
    const res = await fetch(`${STATIC_BASE}${path}`, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`静态内容加载失败（${res.status}）: ${path}`)
    return res.text()
  }
}
