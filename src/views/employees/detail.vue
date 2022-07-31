<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form ref="baseForm" label-width="120px" style="margin-left: 120px; margin-top:30px" :model="formData" :rules="rules">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="formData.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployeeFn">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveEmployeeByIdAPI } from '@/api/employee'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'

export default {
  components: { UserInfo, JobInfo },
  data() {
    return {
      userId: this.$route.params.id,
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '必须输入姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必须输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.formData = { ...await getUserDetailById(this.userId), password: '' }
    },
    // 修改账户的基本信息
    async updateEmployeeFn() {
      await this.$refs.baseForm.validate()
      await saveEmployeeByIdAPI(this.formData)
      this.$message.success('修改成功')
      this.$router.push('/employees')
    }
  }
}
</script>

<style>

</style>
