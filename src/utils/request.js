import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  function(config) {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // 网络层面成功
  function(response) {
    const { success, message } = response.data
    if (success) {
      // 数据层面成功
      return response.data.data
    } else {
      // 数据层面失败
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 网络层面失败
  function(error) {
    console.log('网络层面失败')
    console.dir(error)
    if (error.response && error.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    }
    Message.error(error)
    return Promise.reject(error)
  }
)

export default instance
