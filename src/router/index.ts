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
      },
      {
        path: 'dict',
        component: () => import('@/views/sys/dict'),
        name: 'SysDict'
      },
      {
        path: 'dept',
        component: () => import('@/views/sys/dept'),
        name: 'SysDept'
      },
      {
        path: 'job',
        component: () => import('@/views/sys/job'),
        name: 'SysJob'
      },
      {
        path: 'menu',
        component: () => import('@/views/sys/menu'),
        name: 'SysMenus'
      },
      {
        path: 'role',
        component: () => import('@/views/sys/role'),
        name: 'SysRole'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
