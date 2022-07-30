<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { addEmployeesBatchAPI } from '@/api/employees'
export default {
  methods: {
    async onSuccess(content) {
      // console.log('header', content.header)
      // console.log('result', content.results)
      const results = content.results.map(result => this.zhToEn(result))
      await addEmployeesBatchAPI(results)
      this.$message.success('导入成功')
      this.$router.push('/employees')
    },
    zhToEn(zhObj) {
      const dic = {
        '入职日期': 'timeOfEntry',
        '姓名': 'username',
        '工号': 'workNumber',
        '手机号': 'mobile',
        '转正日期': 'correctionTime',
        '聘用形式': 'formOfEmployment',
        '组织名称': 'departmentName'
      }
      const result = {}
      for (const index in zhObj) {
        const key = dic[index]
        result[key] = zhObj[index]
      }
      return result
    }
  }
}
</script>

<style>

</style>
