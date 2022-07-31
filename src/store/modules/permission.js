import store from '@/store'
import { asyncRoutes, constantRoutes } from '@/router'
const state = {
  routes: []
}
const mutations = {
  setRoutes(state, data) {
    state.routes = [...constantRoutes, ...data]
  }
}
const actions = {
  filterRoutes() {
    const menus = store.state.user.userInfo.roles.menus
    const routes = asyncRoutes.filter(item => menus.includes(item.name))
    store.commit('permission/setRoutes', routes)
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations, // 注意，后面有个s
  actions // 注意，同上
}
