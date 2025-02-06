import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setupRouterGuard } from './guard'
import BasicLayout from '@/layouts/BasicLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/dashboard',
    component: BasicLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard'
        }
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/index.vue'),
        meta: {
          title: '管理',
          requiresAdmin: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

setupRouterGuard(router)

export default router 