原来的站点是一个 Jekyll 静态博客。这次把它重写成 Vue 3 单页应用，整个网站以纯前端方式构建和部署，内容随构建产物一起发布。

## 整体结构

仓库现在只保留前端工程，页面、内容与构建配置都在根目录：

```text
.
├── src/
│   ├── views/intro/           个人介绍（含关于我）
│   ├── views/toolbox/         工具箱
│   └── views/blog/            博客列表与文章详情
├── public/
│   ├── site-config.js         运行模式开关
│   └── static-content/        个人资料、工具清单、文章索引与正文
├── index.html
└── vite.config.js
```

## 前端：Vue 3 + Vue Router

页面按板块拆分，路由对应主要入口：

```js
const routes = [
  { path: '/', component: ProfileView },
  { path: '/about', component: AboutView },
  { path: '/toolbox', component: ToolboxView },
  { path: '/blog', component: BlogListView },
  { path: '/blog/:slug', component: BlogPostView }
]
```

博客正文保留 Markdown 格式，前端用 `marked` 渲染成 HTML，写作体验和静态博客保持一致。

## 数据源：默认为纯静态

`public/site-config.js` 里有一个运行模式开关：

```js
window.__SITE_MODE__ = 'static'   // static | auto | dynamic
window.__API_BASE__ = ''          // 留空表示同源 /api
```

- `static`：只读取 `static-content` 下的 JSON 与 Markdown，不发起任何 API 请求；
- `auto`：优先请求后端，失败时自动回退静态内容；
- `dynamic`：强制使用后端接口。

内容以 JSON 与 Markdown 文件的形式放在 `static-content` 下：

```text
static-content/
├── intro/profile.json
├── toolbox/tools.json
└── blog/
    ├── posts.json
    └── posts/*.md
```

## 后续的动态能力

如果以后需要评论、搜索或在线管理内容，后端服务会放在另外一个独立仓库中部署，接口路径保持 `/api/...`；前端只需把 `__SITE_MODE__` 改为 `auto`，并将 `__API_BASE__` 指向后端地址即可，无需改动页面代码。

## 小结

这次改造的重点不是技术栈本身，而是让仓库保持纯前端、内容按板块沉淀到清晰的目录里。之后新增一篇文章或一个工具，只需要改对应的内容文件，不用动页面代码。
