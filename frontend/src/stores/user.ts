import { defineStore } from 'pinia'
import { login, register } from '@/api/auth'
import type { LoginForm, RegisterForm } from '@/api/auth'

interface UserState {
  token: string | null
  role: string | null
  loading: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    loading: false
  }),
  
  getters: {
    isAdmin: (state) => state.role === 'admin'
  },

  actions: {
    async login(form: LoginForm) {
      this.loading = true
      try {
        const { token, role } = await login(form)
        this.token = token
        this.role = role
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        return true
      } catch (error) {
        console.error('登录失败:', error)
        return false
      } finally {
        this.loading = false
      }
    },

    async register(form: RegisterForm) {
      this.loading = true
      try {
        await register(form)
        return true
      } catch (error) {
        console.error('注册失败:', error)
        return false
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.token = null
      this.role = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }
}) 