import Vue from 'vue'
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import elementEN from 'element-ui/lib/locale/lang/en' // lang i18n
import VueI18n from 'vue-i18n' // i18n
import menuZH from './zh'
import menuEN from './en'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  // 字典材料
  messages: {
    zh: {
      goodday: '祝你开心每一天',
      ...elementZH,
      ...menuZH
    },
    en: {
      goodday: 'have a good day',
      ...elementEN,
      ...menuEN
    }
  }
})
export default i18n
