import router from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
  if (store.state.user.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      await store.dispatch('user/getProfileAsync')
      next()
    }
  } else {
    const whitePage = ['/login', '/404']
    if (whitePage.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
