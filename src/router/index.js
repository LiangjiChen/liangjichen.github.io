import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/intro/ProfileView.vue'
import AboutView from '../views/intro/AboutView.vue'
import ToolboxView from '../views/toolbox/ToolboxView.vue'
import BlogListView from '../views/blog/BlogListView.vue'
import BlogPostView from '../views/blog/BlogPostView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'profile', component: ProfileView, meta: { title: '个人介绍' } },
    { path: '/about', name: 'about', component: AboutView, meta: { title: '关于我' } },
    { path: '/toolbox', name: 'toolbox', component: ToolboxView, meta: { title: '工具箱' } },
    { path: '/blog', name: 'blog', component: BlogListView, meta: { title: '博客' } },
    { path: '/blog/:slug', name: 'blog-post', component: BlogPostView, meta: { title: '博客' } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · 陈良骥` : '陈良骥 · Liangji Chen'
})

export default router
