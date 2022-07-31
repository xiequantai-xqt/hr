// 导航守卫
import router from '@/router'
import store from '@/store'

router.beforeEach(async(to, from, next) => {
  // token存在
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.state.user.userInfo.username) {
        await store.dispatch('user/getUserInfo')
        // 动态路由的筛选和追加
        const routes = await store.dispatch('permission/filterRoutes')
        // console.log('动态路由', routes)
        router.addRoutes([
          ...routes,
          { path: '*', redirect: '/404', hidden: true }
        ])
        next(to.path)
        return
      }
      next()
    }
  } else {
    // token不存在
    const whiteList = ['/login', '/404']
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
