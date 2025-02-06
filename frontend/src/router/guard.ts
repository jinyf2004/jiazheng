import { Router } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const whiteList = ['/login']

export function setupRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 设置页面标题
    document.title = (to.meta.title as string) || '管理系统'
    
    const userStore = useUserStore()
    const token = userStore.token

    if (token) {
      if (to.path === '/login') {
        next('/dashboard')
      } else {
        if (to.meta.requiresAdmin && !userStore.isAdmin) {
          ElMessage.error('无权访问该页面')
          next('/dashboard')
        } else {
          next()
        }
      }
    } else {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next('/login')
      }
    }
  })
} 