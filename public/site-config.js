// 站点运行模式开关
// 三种取值：
//   'static'   —— 默认。纯前端部署，只使用 static-content 下的内容，不发起 API 请求
//   'auto'     —— 优先请求后端 API，失败或不可达时自动回退到静态内容
//   'dynamic'  —— 纯动态。强制请求后端 API，后端不可达时直接报错
//
// 后端服务计划放在独立仓库中部署；如需启用动态能力，把模式改为 'auto' 或 'dynamic'，
// 并把 __API_BASE__ 指向后端地址（留空表示同源 /api）。
// 修改本文件即可切换，无需重新构建前端。
window.__SITE_MODE__ = 'static'
window.__API_BASE__ = ''
