import PageTools from '@/components/PageTools/index.vue'
import UploadExcel from '@/components/UploadExcel/index.vue'
import ImageUpload from '@/components/ImageUpload/index.vue'
import Lang from '@/components/Lang/index.vue'

export default {
  install(Vue) {
    // 注册全局组件
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('Lang', Lang)
  }
}
