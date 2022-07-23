import { getTokenAPI, getUserBaseInfoAPI, getUserProfileAPI } from '@/api/user'
import { setTokenCookie, getTokenCookie } from '@/utils/auth'

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
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
