<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              ref="baseInfoForm"
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
              :model="formData"
              :rules="rules"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="formData.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserProfile">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <JobInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <UserInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserProfileAPI, saveUserProfileAPI } from '@/api/user'
import JobInfo from './components/job-info.vue'
import UserInfo from './components/user-info.vue'
export default {
  components: {
    JobInfo,
    UserInfo
  },
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getBaseInfo()
  },
  methods: {
    async getBaseInfo() {
      const res = await getUserProfileAPI(this.$route.params.id)
      this.formData = { ...res.data, password: '' }
    },
    async saveUserProfile() {
      await this.$refs.baseInfoForm.validate()
      await saveUserProfileAPI(this.formData)
      this.$message.success('更新成功')
    }
  }

}
</script>

<style>

</style>
