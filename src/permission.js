import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (store.state.user.token) {
    if (to.path === '/login') {
      next('/')
    } else {
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
