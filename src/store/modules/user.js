import { getTokenAPI } from '@/api/user'
import { setTokenCookie, getTokenCookie } from '@/utils/auth'

const state = {
  token: getTokenCookie() || ''
}
const mutations = {
  setToken(state, data) {
    state.token = data
    setTokenCookie(data)
  }
}
const actions = {
  async getTokenAsync(store, data) {
    const res = await getTokenAPI(data)
    store.commit('setToken', res.data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
