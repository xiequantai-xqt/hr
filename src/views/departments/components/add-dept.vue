<template>
  <el-dialog title="新增部门" :visible="addDeptDialog" @close="cancleFn">
    <el-form ref="addDept" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" />
      </el-form-item>
      <el-form-item label="介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" />
      </el-form-item>
      <el-form-item label="负责人名称" prop="manager">
        <el-select v-model="formData.manager" placeholder="请选择负责人" style="width:80%" @blur="validateManger">
          <el-option
            v-for="item in employeeList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="cancleFn">取 消</el-button>
      <el-button type="primary" @click="submitFn">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getEmployeeListAPI } from '@/api/user'
import { addDepartmentAPI, getDepartmentListAPI } from '@/api/departments'
import { dataToTree } from '@/utils'
export default {
  props: {
    addDeptDialog: {
      type: Boolean
    },
    // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
    nodeData: {}
  },
  data() {
    // 同部门下，子部门不能重名
    const validateName = async(rule, value, callback) => {
      const res = await getDepartmentListAPI()
      const { depts } = res.data
      const deptsFlat = depts.filter(item => item.pid !== '-1')
      this.depts = dataToTree(deptsFlat, '')
      const childrenDepts = this.depts.find(item => item.id === this.nodeData.id).children
      const isRepeat = childrenDepts.some(i => i.name === value)
      if (isRepeat) {
        callback(new Error('该部门名称已被占用'))
      } else {
        callback()
      }
    }
    // 全集团的code不能重复
    const validateCode = async(rule, value, callback) => {
      // 获取全集团的扁平化数据
      const res = await getDepartmentListAPI()
      const { depts } = res.data
      const isRepeat = depts.some(item => item.code === value)
      if (isRepeat) {
        callback(new Error('全集团编码保证唯一性'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      },
      employeeList: [], // 员工列表信息
      depts: [],
      rules: {
        code: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称为2-10个字符', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async cancleFn() {
      await this.$refs.addDept.resetFields()
      this.formData = {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      }
      this.$emit('toggleAddDialog', false)
    },
    async submitFn() {
      await this.$refs.addDept.validate()
      await addDepartmentAPI({ ...this.formData, pid: this.nodeData.id })
      this.$message.success('新增成功')
      this.$emit('toggleAddDialog', false)
      this.$emit('updateDep')
    },
    async getEmployeeList() {
      const employeeList = await getEmployeeListAPI()
      this.employeeList = employeeList.data.rows
    },
    validateManger() {
      setTimeout(() => {
        this.$refs.addDept.validateField('manager')
      }, 500)
    }
  }
}
</script>

<style>

</style>
