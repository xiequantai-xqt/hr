import router from '@/router'
import store from '@/store'
import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('error', error)
    if (error.response && error.response.data.code === 10002) {
      store.dispatch('user/logoutAsync')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service
