<template>
<template>
  <div class="admin-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
        </div>
      </template>
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="role" label="角色">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'success'">
              {{ row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" />
      </el-table>
    </el-card>

    <!-- 新增签名面板 -->
    <el-card class="signature-card">
      <template #header>
        <div class="card-header">
          <span>电子签名</span>
        </div>
      </template>
      <div ref="signatureCanvas"></div>
      <el-button type="primary" @click="captureSignatureData">获取签名数据</el-button>
    </el-card>
  </div>
</template>
  <div class="admin-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
        </div>
      </template>
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="role" label="角色">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'success'">
              {{ row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import captureSignature from '@/utils/signature'

interface User {
  _id: string
  username: string
  role: string
  createdAt: string
}

const userList = ref<User[]>([])
const signatureCanvas = ref(null)
let signatureInstance = null

const fetchUsers = async () => {
  try {
    const response = await request.get('/api/users')
    userList.value = response.data
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  }
}

const initSignature = () => {
  if (signatureCanvas.value) {
    signatureInstance = captureSignature()
    signatureCanvas.value.appendChild(signatureInstance.canvas)
  }
}

const captureSignatureData = () => {
  if (signatureInstance) {
    const signatureData = signatureInstance.getSignatureData()
    console.log('签名数据:', signatureData)
    // 这里可以添加保存签名数据的逻辑
  }
}

onMounted(() => {
  fetchUsers()
  initSignature()
})

onUnmounted(() => {
  if (signatureInstance) {
    signatureCanvas.value.removeChild(signatureInstance.canvas)
    signatureInstance = null
  }
})
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

interface User {
  _id: string
  username: string
  role: string
  createdAt: string
}

const userList = ref<User[]>([])

const fetchUsers = async () => {
  try {
    const response = await request.get('/api/users')
    userList.value = response.data
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.admin-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 