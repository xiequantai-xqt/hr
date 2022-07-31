import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import MyComponents from '@/components'
import * as myFilters from '@/filters'
import i18n from '@/i18n'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
Vue.directive('fixImg', {
  inserted(el, options) {
    el.addEventListener('error', () => {
      el.src = options.value
    })
    el.src = el.src || options.value
  },
  componentUpdated(el, options) {
    el.src = el.src || options.value
  }
})

Vue.use(MyComponents)
// 全局注册过滤器
for (const key in myFilters) {
  Vue.filter(key, myFilters[key])
}
// 全局混入
import myMixin from '@/mixin'
Vue.mixin(myMixin)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
