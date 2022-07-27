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
import { addDepartmentAPI } from '@/api/departments'
export default {
  props: {
    addDeptDialog: {
      type: Boolean
    },
    // eslint-disable-next-line vue/require-default-prop
    pidId: {
      type: String
    }
  },
  data() {
    return {
      formData: {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      },
      employeeList: [], // 员工列表信息
      rules: {
        code: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称为2-10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    cancleFn() {
      this.$emit('toggleAddDialog', false)
    },
    async submitFn() {
      await this.$refs.addDept.validate()
      await addDepartmentAPI({ ...this.formData, pid: this.pidId })
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
