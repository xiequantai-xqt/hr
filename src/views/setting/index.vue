<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addRoleFn"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="roleList">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRoleFn(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRoleFn(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                layout="prev,pager,next"
                :total="total"
                :page-size="pageSetting.pagesize"
                @current-change="currentPageFn"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog title="新增角色" :visible="addRoleDialog" @close="onCancle">
      <el-form ref="addRole" :model="formData" label-width="120px" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formData.description" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="onCancle">取 消</el-button>
        <el-button type="primary" @click="onOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRoleAPI, delRoleAPI, getRoleDetailAPI, getRoleListAPI, updateRoleAPI } from '@/api/setting'
export default {
  data() {
    return {
      pageSetting: {
        page: 1,
        pagesize: 2
      },
      total: 0,
      roleList: [],
      addRoleDialog: false, // 新增角色弹窗
      formData: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleList(this.pageSetting)
  },
  methods: {
    async getRoleList(pageSetting) {
      const res = await getRoleListAPI(pageSetting)
      this.total = res.data.total
      this.roleList = res.data.rows
    },
    currentPageFn(page) {
      this.pageSetting = { ...this.pageSetting, page }
      this.getRoleList(this.pageSetting)
    },
    async delRoleFn(id) {
      await this.$confirm('确定要删除该角色吗？')
      await delRoleAPI(id)
      this.getRoleList(this.pageSetting)
    },
    async addRoleFn() {
      this.addRoleDialog = true
    },
    async onOk() {
      await this.$refs.addRole.validate()
      if (this.formData.id) {
        // 编辑
        await updateRoleAPI(this.formData)
        this.$message.success('编辑角色成功')
      } else {
        // 新增
        await addRoleAPI(this.formData)
        this.$message.success('新增角色成功')
      }
      this.addRoleDialog = false
      this.getRoleList(this.pageSetting)
    },
    async onCancle() {
      await this.$refs.addRole.resetFields()
      this.formData = {
        name: '',
        description: ''
      }
      this.addRoleDialog = false
    },
    // 编辑角色
    async editRoleFn(id) {
      this.addRoleDialog = true
      const res = await getRoleDetailAPI(id)
      this.formData = res.data
    }
  }
}
</script>
