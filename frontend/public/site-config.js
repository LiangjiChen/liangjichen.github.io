// 站点运行模式开关
// 三种取值：
//   'auto'     —— 默认。优先请求后端 /api，失败或不可达时自动回退到静态内容
//   'static'   —— 纯静态。只使用 public/static-content 下的内容，不发起任何 API 请求
//   'dynamic'  —— 纯动态。强制请求后端 /api，后端不可达时直接报错
//
// 修改本文件即可切换模式，无需重新构建前端。
window.__SITE_MODE__ = 'auto'
