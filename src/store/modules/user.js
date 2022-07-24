import { getTokenAPI, getUserBaseInfoAPI, getUserProfileAPI } from '@/api/user'
import { setTokenCookie, getTokenCookie, removeTokenCookie } from '@/utils/auth'

const state = {
  token: getTokenCookie() || '',
  profile: ''
}
const mutations = {
  setToken(state, data) {
    state.token = data
    setTokenCookie(data)
  },
  setProfile(state, profile) {
    state.profile = profile
  },
  logout(state) {
    state.token = ''
    state.profile = ''
    removeTokenCookie()
  }
}
const actions = {
  async getTokenAsync(store, data) {
    const res = await getTokenAPI(data)
    store.commit('setToken', res.data)
  },
  async getProfileAsync(store) {
    const baseInfoRes = await getUserBaseInfoAPI()
    const baseInfo = baseInfoRes.data
    const employeeRes = await getUserProfileAPI(baseInfo.userId)
    const employee = employeeRes.data
    store.commit('setProfile', { ...baseInfo, ...employee })
  },
  async logoutAsync(store) {
    store.commit('logout')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
