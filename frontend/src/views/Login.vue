<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <el-radio-group v-model="activeTab">
            <el-radio-button label="login">登录</el-radio-button>
            <el-radio-button label="register">注册</el-radio-button>
          </el-radio-group>
        </div>
      </template>
      
      <!-- 登录表单 -->
      <el-form 
        v-if="activeTab === 'login'" 
        :model="loginForm" 
        :rules="loginRules"
        ref="loginFormRef"
        @submit.prevent="handleLogin"
      >
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="loginForm.role" placeholder="请选择身份" style="width: 100%">
            <el-option label="普通用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" block>
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 注册表单 -->
      <el-form 
        v-else 
        :model="registerForm"
        :rules="registerRules"
        ref="registerFormRef"
        @submit.prevent="handleRegister"
      >
        <el-form-item>
          <el-input v-model="registerForm.username" placeholder="用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="确认密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" block>
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const activeTab = ref('login')

const loginForm = reactive({
  username: '',
  password: '',
  role: 'user'
})

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择身份', trigger: 'change' }
  ]
}

const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    const success = await userStore.login({
      username: loginForm.username,
      password: loginForm.password,
      role: loginForm.role
    })
    if (success) {
      ElMessage.success('登录成功')
      router.push('/')
    }
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  if (!registerForm.username || !registerForm.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }

  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }

  loading.value = true
  try {
    const success = await userStore.register({
      username: registerForm.username,
      password: registerForm.password
    })
    if (success) {
      ElMessage.success('注册成功，请登录')
      activeTab.value = 'login'
      registerForm.username = ''
      registerForm.password = ''
      registerForm.confirmPassword = ''
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.login-card {
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.card-header {
  display: flex;
  justify-content: center;
}

:deep(.el-card__header) {
  padding: 10px 20px;
}
</style> 