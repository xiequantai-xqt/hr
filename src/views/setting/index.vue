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
                @click="dialogVisible=true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="roleList">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{row}">
                  <el-button size="small" type="success" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="updateRoleFn(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
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
                @current-change="currentChange"
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
                <el-input v-model="companyInfo.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
      </el-card>
      <!-- 弹窗组件 -->
      <el-dialog
        title="提示"
        :visible="dialogVisible"
        @close="()=>onCancle()"
      >
        <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="formData.description" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCancle">取 消</el-button>
          <el-button type="primary" @click="addRoleFn">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="分配权限" :visible="showPermDialog" @close="btnPermCancel">
        <el-checkbox-group v-model="checkPermList">
          <el-tree
            :data="permissionList"
            :props="{label:'name'}"
            default-expand-all
            :expand-on-click-node="false"
          >
            <template #default="{data}">
              <el-checkbox :label="data.id">
                {{ data.name }}
              </el-checkbox>
            </template>
          </el-tree>
        </el-checkbox-group>
        <template #footer>
          <el-button size="small" type="primary" @click="onPermOk">确定</el-button>
          <el-button size="small" @click="onPermCancle">取消</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionListAPI } from '@/api/permission'
import { addRoleAPI, delRoleAPI, getCompanyInfo, getRoleDetailByIdAPI, getRoleList, updateAssignPermAPI, updateRoleAPI } from '@/api/setting'
import { listToTreeData } from '@/utils'

export default {
  data() {
    return {
      companyInfo: {}, // 公司信息
      roleList: [],
      // 分页信息
      pageSetting: {
        page: 1,
        pagesize: 2
      },
      total: 0,
      dialogVisible: false,
      formData: {
        name: '',
        description: ''
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ]
      },
      showPermDialog: false, // 分配权限弹窗
      permissionList: [], // 权限列表
      checkPermList: [], // 被选中的权限点
      userId: ''
    }
  },
  created() {
    this.getCompanyInfo()
    this.getRoleList()
    this.getPermissionListFn()
  },
  methods: {
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.$store.state.user.userInfo.companyId)
    },
    async getRoleList() {
      const res = await getRoleList(this.pageSetting)
      this.roleList = res.rows
      this.total = res.total
    },
    // 分页功能
    currentChange(currentPage) {
      this.pageSetting.page = currentPage
      this.getRoleList()
    },
    // 删除角色
    async delRole(rowId) {
      // 1. 二次询问
      await this.$confirm('是否要删除？')
      // 2. 发请求
      await delRoleAPI(rowId)
      // 3. 提示用户
      this.$message.success('删除成功')
      // 4. 更新页面
      this.getRoleList()
    },
    // 新增角色
    async addRoleFn() {
      // 1. 手动校验表单
      await this.$refs.form.validate()
      // 2. 发请求
      if (this.formData.id) {
        // 编辑
        await updateRoleAPI(this.formData)
        this.$message.success('编辑成功')
      } else {
        // 新增
        await addRoleAPI(this.formData)
        this.$message.success('新增成功')
      }
      // 3. 关闭弹窗
      this.dialogVisible = false
      // 4. 更新页面
      this.getRoleList()
    },
    onCancle() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 编辑角色
    async updateRoleFn(id) {
      this.dialogVisible = true
      this.formData = await getRoleDetailByIdAPI(id)
    },
    // 分配角色
    async assignPerm(id) {
      const { permIds } = await getRoleDetailByIdAPI(id)
      this.checkPermList = permIds
      this.showPermDialog = true
      this.userId = id
    },
    btnPermCancel() {
      this.showPermDialog = false
    },
    // 获取权限数据
    async getPermissionListFn() {
      // 转成树形结构
      this.permissionList = listToTreeData(await getPermissionListAPI(), '0')
    },
    async onPermOk() {
      // 1. 发请求
      await updateAssignPermAPI({ id: this.userId, permIds: this.checkPermList })
      // 2. 提示用户
      this.$message.success('修改成功')
      // 3. 弹窗
      this.showPermDialog = false
    },
    onPermCancle() {
      // 1. 清理数据
      this.checkPermList = []
      // 2. 关闭弹窗
      this.showPermDialog = false
    }
  }
}
</script>

<style>

</style>

