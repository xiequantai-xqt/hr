<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共{{ total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="()=>$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
          <el-button size="small" type="primary" @click="addEmployeeFn">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeeList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatterFn" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template #default="{row}">
              {{ row.timeOfEntry|filterTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template #default="{row}">
              <el-switch
                :value="row.enableState"
                :active-value="1"
                :inactive-value="2"
                disabled
              />

            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployeeFn(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pagesetting.size"
            @current-change="currentPageFn"
          />
        </el-row>
      </el-card>
    </div>
    <el-dialog title="新增员工" :visible="addEmployeeDialog" @close="onCancle">
      <el-form ref="addEmployee" :model="formData" label-width="120px" :rules="rules">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile" />
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="formData.timeOfEntry"
            type="date"
            placeholder="选择日期"
            style="width:100%"
          />
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select v-model="formData.formOfEmployment" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in hireType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="formData.workNumber" />
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input
            v-model="formData.departmentName"
            @focus="isShowTree='block'"
            @blur="treeBlurFn"
          />
          <el-tree
            :data="depts"
            :props="{label:'name'}"
            :default-expand-all="true"
            :style="{display:isShowTree}"
            @node-click="handleNodeClick"
          />
        </el-form-item>
        <el-form-item label="转正时间">
          <el-date-picker
            v-model="formData.correctionTime"
            type="date"
            placeholder="选择日期"
            style="width:100%"
          />
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
import { getEmployeeListAPI } from '@/api/user'
import { export_json_to_excel } from '@/vendor/Export2Excel'
import { getDepartmentListAPI } from '@/api/departments'
import { dataToTree } from '@/utils'
import { addEmployeesAPI, delEmployeesAPI } from '@/api/employees'
export default {
  data() {
    return {
      pagesetting: {
        page: 1,
        size: 10
      },
      total: 0,
      employeeList: [],
      addEmployeeDialog: false, // 新增员工弹窗
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      hireType: [
        {
          value: '1',
          label: '正式'
        },
        {
          value: '2',
          label: '非正式'
        }
      ],
      depts: [], // 部门
      isShowTree: 'none', // 部门树展开
      rules: {
        username: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEmployeeList(this.pagesetting)
    this.getDepartment()
  },
  methods: {
    async getEmployeeList(pagesetting) {
      const res = await getEmployeeListAPI(pagesetting)
      this.total = res.data.total
      this.employeeList = res.data.rows
    },
    currentPageFn(page) {
      this.pagesetting = { ...this.pagesetting, page }
      this.getEmployeeList(this.pagesetting)
    },
    // 格式化聘用形式
    formatterFn(row) {
      const hireType = [
        {
          type: '1',
          value: '正式'
        },
        {
          type: '2',
          value: '非正式'
        }
      ]
      if (!row.formOfEmployment) {
        return ''
      } else {
        const hireItem = hireType.find(item => item.type === String(row.formOfEmployment))
        if (hireItem) {
          return hireItem.value
        } else {
          return row.formOfEmployment
        }
      }
    },
    // 导出Excel
    async exportExcel() {
      const res = await getEmployeeListAPI({ ...this.pagesetting, size: this.total })
      const headers = []
      const { rows } = res.data
      const dic = {
        'timeOfEntry': '入职日期',
        'username': '姓名',
        'workNumber': '工号',
        'mobile': '手机号',
        'correctionTime': '转正日期',
        'formOfEmployment': '聘用形式',
        'departmentName': '组织名称'
      }
      for (const header in dic) {
        headers.push(dic[header])
      }
      const data = rows.map(item => {
        const arr = []
        for (const key in dic) {
          arr.push(item[key])
        }
        return arr
      })
      export_json_to_excel({ header: headers, data })
    },
    // 新增员工
    addEmployeeFn() {
      this.addEmployeeDialog = true
    },
    // 获取部门列表
    async getDepartment() {
      const deptsRes = await getDepartmentListAPI()
      const { depts } = deptsRes.data
      const deptsFlat = depts.filter(item => item.pid !== '-1')
      this.depts = dataToTree(deptsFlat, '')
    },
    handleNodeClick(data) {
      this.formData = { ...this.formData, departmentName: data.name }
    },
    treeBlurFn() {
      setTimeout(() => {
        this.isShowTree = 'none'
      }, 500)
    },
    async onOk() {
      await this.$refs.addEmployee.validate()
      await addEmployeesAPI(this.formData)
      this.$message.success('新增成功')
      this.addEmployeeDialog = false
      this.getEmployeeList(this.pagesetting)
    },
    onCancle() {
      this.$refs.addEmployee.resetFields()
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      }
      this.addEmployeeDialog = false
    },
    // 删除
    async delEmployeeFn(id) {
      await this.$confirm('是否删除该员工？')
      await delEmployeesAPI(id)
      this.$message.success('删除成功')
      this.getEmployeeList(this.pagesetting)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep{
.el-tree{
  margin-top: 5px;
}
}
</style>
