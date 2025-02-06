import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { config } from '@/config'

const request = axios.create({
  baseURL: config.apiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => response.data,
  error => {
    console.error('响应错误:', error)
    ElMessage.error(error.response?.data?.message || '请求失败')
    return Promise.reject(error)
  }
)

export default request 