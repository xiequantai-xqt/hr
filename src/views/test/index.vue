<template>
  <div>
    <el-button @click="local='zh'">中文</el-button>
    <el-button @click="local='en'">English</el-button>
    <div>{{ t('sayHi') }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 要素一，当前语言的设定
      local: 'zh',
      // 要素二，字典文字材料
      dictionary: {
        zh: {
          sayHi: '亲，欢迎回来'
        },
        en: {
          sayHi: 'Dear,Welcom back'
        }
      }
    }
  },
  methods: {
    t(str) {
      const dict = this.dictionary[this.local]
      return dict[str]
    }
  }
}
</script>

<style>

</style>

