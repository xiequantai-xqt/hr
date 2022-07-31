import { getUserDetailById, getUserInfo, login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  setToken(state, data) {
    state.token = data
    // token持久化
    setToken(data)
  },
  setUserInfo(state, data) {
    state.userInfo = data
  },
  // 清除token
  removeUserToken(state) {
    state.token = ''
    removeToken()
  },
  // 清除userInfo
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 登录
  async login(store, data) {
    const res = await login(data)
    // 存储token
    store.commit('setToken', res)
  },
  // 获取用户信息
  async getUserInfo(store) {
    const res = await getUserInfo()
    const detail = await getUserDetailById(res.userId)
    store.commit('setUserInfo', { ...res, ...detail })
  },
  // 登出
  logout(store) {
    store.commit('removeUserToken')
    store.commit('removeUserInfo')
    resetRouter()
  }
}
export default {
  namespaced: true,
  state,
  mutations, // 注意，后面有个s
  actions // 注意，同上
}
