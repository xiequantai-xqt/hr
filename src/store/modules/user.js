import { getTokenAPI } from '@/api/user'

const state = {
  token: ''
}
const mutations = {}
const actions = {
  async getTokenAsync(store, data) {
    const res = await getTokenAPI(data)
    console.log(data)
    console.log(res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
