<template>
  <el-dialog
    title="新增部门"
    :visible="isShowDialog"
    @close="btnClose"
  >
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="formData" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @blur="checkManager">
          <el-option
            v-for="item in employeeList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="onOk">确定</el-button>
        <el-button size="small" @click="onCancle">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple } from '@/api/employee'
import { addDepartment, getDepartmentDetail, getDepartmentList, updateDepartment } from '@/api/departments'
import { Message } from 'element-ui'

export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      required: true
    }
  },
  data() {
    const checkRepeatCode = async(rule, val, callback) => {
      const { depts } = await getDepartmentList()
      let isRepeat
      if (this.formData.id) {
        // 编辑
        isRepeat = depts.some(v => v.code === val && v.id !== this.formData.id)
      } else {
        // 新增
        isRepeat = depts.some(v => v.code === val)
      }
      if (isRepeat) {
        callback(new Error('部门编码必须唯一'))
      } else {
        callback()
      }
    }
    const checkRepeatName = async(rule, value, callback) => {
      // 1. 筛选出当前部门下面所有子部门的列表
      const { depts } = await getDepartmentList()
      let isRepeat
      if (this.formData.id) {
        // 编辑
        const res = depts.filter(item => item.pid === this.nodeData.pid)
        isRepeat = res.some(item => item.name === value && item.id !== this.nodeData.id)
      } else {
        // 新增
        const res = depts.filter(item => item.pid === this.nodeData.id)
        isRepeat = res.some(item => item.name === value)
      }
      if (isRepeat) {
        callback(new Error('名字不允许重复'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      formData: {
        code: '', // 部门编码
        introduce: '', // 介绍
        manager: '', // 负责人名称
        name: ''// 部门名称
      },
      // 定义校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: checkRepeatName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: checkRepeatCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }
        ]
      },
      // 员工简单名单
      employeeList: []
    }
  },
  async created() {
    const res = await getEmployeeSimple()
    // console.log(res) // id username
    this.employeeList = res
  },
  methods: {
    async onOk() {
      // 1. 触发校验表单
      await this.$refs.formData.validate()
      // 2. 发请求
      if (this.formData.id) {
        // 编辑
        await updateDepartment(this.formData)
      } else {
        // 新增
        await addDepartment({ ...this.formData, pid: this.nodeData.id })
      }
      // 3. 通知用户
      Message.success('新增成功')
      // 4. 关闭弹窗
      this.$emit('update:isShowDialog', false)
      // 5. 通知父组件，更新页面
      this.$emit('updateDepartments')
    },
    onCancle() {
      // 重置表单
      this.formData = {
        code: '', // 部门编码
        introduce: '', // 介绍
        manager: '', // 负责人名称
        name: ''// 部门名称
      }
      this.$refs.formData.resetFields()
      // 关闭弹窗
      this.$emit('update:isShowDialog', false)
    },
    btnClose() {
      this.onCancle()
    },
    async getDepartmentDetail(id) {
      const res = await getDepartmentDetail(id)
      this.formData = res
    },
    checkManager() {
      setTimeout(() => {
        this.$refs.formData.validateField('manager')
      }, 100)
    }
  }
}
</script>

<style>

</style>
