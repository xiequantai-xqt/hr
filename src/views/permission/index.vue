<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row type="flex" justify="end">
          <el-button type="primary" size="small" @click="addPerm('0',1)">添加权限</el-button>
        </el-row>
        <el-table :data="permissionList" row-key="id" default-expand-all>
          <el-table-column label="权限名称" prop="name" />
          <el-table-column label="权限标记" prop="code" />
          <el-table-column label="权限描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button v-if="row.type===1" type="text" size="small" @click="addPerm(row.id,2)">新增子权限</el-button>
              <el-button type="text" size="small" @click="updatePerm(row.id)">编辑权限</el-button>
              <el-button type="text" size="small" @click="delPerm(row.id)">删除权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :title="`${formData.id?'编辑':'新增'}权限点`" :visible="isShowDialog" @close="btnCancel">
        <!-- 表单 -->
        <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  addPermissionAPI,
  delPermissionAPI,
  getPermissionByIdAPI,
  getPermissionListAPI,
  updatePermissionAPI
} from '@/api/permission.js'
import { listToTreeData } from '@/utils'
export default {
  data() {
    return {
      permissionList: [],
      formData: {
        id: '',
        name: '',
        code: '',
        description: '',
        enVisible: '1'
      },
      isShowDialog: false,
      rules: {
        name: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getPermissionListFn()
  },
  methods: {
    async getPermissionListFn() {
      // 转成树形结构
      this.permissionList = listToTreeData(await getPermissionListAPI(), '0')
    },
    // 编辑权限点
    async updatePerm(id) {
      this.isShowDialog = true
      this.formData = await getPermissionByIdAPI(id)
    },
    async btnCancel() {
      // 1. 清理表单
      this.formData = {
        id: '',
        name: '',
        code: '',
        description: '',
        enVisible: '1'
      }
      // 2. 清理校验
      await this.$refs.perForm.resetFields()
      // 3. 关闭弹窗
      this.isShowDialog = false
    },
    async btnOK() {
      // 1. 校验表单
      await this.$refs.perForm.validate()
      // 2. 发请求
      if (this.formData.id) {
        // 编辑
        await updatePermissionAPI(this.formData)
      } else {
        // 新增
        await addPermissionAPI(this.formData)
      }
      // 3. 提示用户
      this.$message.success('修改成功')
      // 4. 关闭弹窗
      this.isShowDialog = false
      // 5. 更新数据
      this.getPermissionListFn()
    },
    // 新增权限点
    addPerm(pid, type) {
      this.isShowDialog = true
      this.formData.pid = pid
      this.formData.type = type
    },
    // 删除权限点
    async delPerm(id) {
      // 1. 二次询问
      await this.$confirm('您是否删除？')
      // 2. 发请求
      await delPermissionAPI(id)
      // 3. 提示用户
      this.$message.success('删除成功')
      // 4. 更新页面
      this.getPermissionListFn()
    }
  }
}
</script>

<style>

</style>

