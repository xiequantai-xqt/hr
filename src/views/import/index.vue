<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employee'

export default {
  methods: {
    async onSuccess(data) {
      const newData = data.results.map(user => this.zhToEn(user))
      // 1. 发请求
      await importEmployee(newData)
      // 2. 提示用户
      this.$message.success('导入成功')
      // 3. 回退到员工页面
      this.$router.back()
    },
    zhToEn(oldUser) {
      const newUser = {}
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      for (const key in oldUser) {
        const userKey = userRelations[key]
        if (userKey === 'timeOfEntry' || userKey === 'correctionTime') {
          const userVal = this.formatDate(oldUser[key])
          newUser[userKey] = userVal
        } else {
          const userVal = oldUser[key]
          newUser[userKey] = userVal
        }
      }
      return newUser
    },
    formatDate(numb, format = '-') {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
