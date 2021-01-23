import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.tsx')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layout')
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/user',
    children: [
      {
        path: 'user',
        component: () => import('@/views/sys/user'),
        name: 'SysUser'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
