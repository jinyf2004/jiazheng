import request from '@/utils/request'

export interface LoginForm {
  username: string
  password: string
  role: string
}

export interface RegisterForm {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  role: string
  success: boolean
}

export const login = (data: LoginForm) => {
  return request.post<any, LoginResponse>('/auth/login', data)
}

export const register = (data: RegisterForm) => {
  return request.post<any, { success: boolean }>('/auth/register', data)
} 