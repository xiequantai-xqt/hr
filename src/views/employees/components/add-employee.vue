<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="onCancle">
    <!-- 表单 -->
    <el-form ref="addEmployeeForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:90%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:90%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:90%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:90%" placeholder="请选择">
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:90%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:90%" placeholder="请选择部门" @focus="isShowTree=true" />
        <el-tree
          v-if="isShowTree"
          class="departmentTree"
          :data="depts"
          :props="{label:'name'}"
          default-expand-all
          @node-click="nodeClickFn"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:90%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="onCancle">取消</el-button>
          <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees.js'
import { getDepartmentList } from '@/api/departments'
import { listToTreeData } from '@/utils'
import { addEmployeeAPI } from '@/api/employee'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      depts: [], // 部门
      isShowTree: false
    }
  },
  created() {
    this.getDepartmentListFn()
  },
  methods: {
    // 获取部门
    async getDepartmentListFn() {
      const res = await getDepartmentList()
      this.depts = listToTreeData(res.depts, '')
    },
    nodeClickFn(nodeData) {
      this.formData.departmentName = nodeData.name
      this.isShowTree = false
    },
    async onSubmit() {
      // 1. 表单校验
      await this.$refs.addEmployeeForm.validate()
      // 2. 发请求
      await addEmployeeAPI(this.formData)
      // 3. 提示用户
      this.$message.success('新增成功')
      // 4. 关闭弹窗
      this.$emit('closeDialog')
      // 5. 更新页面
      this.$emit('updateEmployeeList')
    },
    onCancle() {
      // 1. 清理数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 2. 清理报错
      this.$refs.addEmployeeForm.resetFields()
      // 3. 关闭弹窗
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>
.departmentTree {
  position: absolute;
  z-index: 9;
  width: 90%;
  border: 1px solid #888;
  height: 200px;
  overflow: auto;
}
</style>
