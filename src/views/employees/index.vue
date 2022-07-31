<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共{{ total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="importExcel">导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
          <el-button size="small" type="primary" @click="addEmployeeFn">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="formData">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像" width="200">
            <template #default="{row}">
              <img
                v-fixImg="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                class="staffPhoto"
                @click="showEWMFn(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatterFn" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template #default="{row}">
              {{ row.correctionTime|formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template #default="{row}">
              <el-switch
                v-model="row.enableState"
                :active-value="1"
                :inactive-value="2"
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="assignRoleFn(row.id)">角色</el-button>
              <el-button v-if="checkPerm('delUser')" type="text" size="small" @click="deleteEmployeeFn(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" :total="total" @current-change="currentChange" />
        </el-row>
      </el-card>
    </div>
    <AddEmployee
      :show-dialog="isShowDialog"
      @closeDialog="closeDialogFn"
      @updateEmployeeList="updateEmployeeListFn"
    />
    <el-dialog title="头像二维码" :visible="isShowEWM" @close="isShowEWM=false">
      <canvas ref="qrcode" />
    </el-dialog>
    <AssignRole
      ref="assignRole"
      :is-show-role="isShowRole"
      @closeRoleDialog="closeRoleDialogFn"
    />
  </div>
</template>

<script>
import { deleteEmployeeAPI, getEmployeeListAPI } from '@/api/employee'
import EmployeeEnum from '@/api/constant/employees.js'
import { export_json_to_excel } from '@/vendor/Export2Excel.js'
import { formatDate } from '@/filters'
import AddEmployee from '@/views/employees/components/add-employee.vue'
import QRCode from 'qrcode'
import AssignRole from './components/assign-role.vue'

export default {
  components: { AddEmployee, AssignRole },
  data() {
    return {
      pageSetting: {
        page: 1,
        size: 10
      },
      total: 10,
      formData: [],
      isShowDialog: false,
      isShowEWM: false,
      isShowRole: false // 设置角色
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取列表数据
    async getEmployeeList() {
      const res = await getEmployeeListAPI(this.pageSetting)
      this.total = res.total
      this.formData = res.rows
    },
    // 翻页功能
    currentChange(newPage) {
      this.pageSetting.page = newPage
      this.getEmployeeList()
    },
    // 聘用形式格式化
    formatterFn(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(i => i.id === cellValue)
      return obj ? obj.value : ''
    },
    // 导入Excel
    importExcel() {
      this.$router.push('/import')
    },
    // 导出Excel
    async exportExcel() {
      // 1. 从服务器拿到包括所有用户数据的数组
      const { rows } = await getEmployeeListAPI({ page: 1, size: this.total })
      const newRows = rows.map(userInfo => this.objToArrFn(userInfo))
      // 2. 通过数组转换成Excel
      export_json_to_excel({
        header: ['手机号', '姓名', '入职日期', '聘用形式', '转正日期', '工号', '部门'],
        data: newRows
      })
    },
    // 数据转换-第一次
    objToArrFn(obj) {
      const arr = []
      const dictionary = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      for (const key in dictionary) {
        const newUserKey = dictionary[key]
        // 数据处理-第二次
        if (newUserKey === 'timeOfEntry' || newUserKey === 'correctionTime') {
          // 日期处理
          arr.push(formatDate(obj[newUserKey]))
        } else if (newUserKey === 'formOfEmployment') {
          // 枚举数据
          const item = EmployeeEnum.hireType.find(item => item.id === obj[newUserKey])
          item ? arr.push(item.value) : '未知'
        } else {
          arr.push(obj[newUserKey])
        }
      }
      return arr
    },
    // 删除员工
    async deleteEmployeeFn(id) {
      await this.$confirm('确认删除吗？')
      await deleteEmployeeAPI(id)
      this.getEmployeeList()
    },
    // 新增员工
    addEmployeeFn() {
      this.isShowDialog = true
    },
    closeDialogFn() {
      this.isShowDialog = false
    },
    updateEmployeeListFn() {
      this.getEmployeeList()
    },
    // 渲染二维码
    showEWMFn(imgSrc) {
      if (imgSrc) {
        this.isShowEWM = true
        this.$nextTick(() => {
          QRCode.toCanvas(this.$refs.qrcode, imgSrc, { width: 300 })
        })
      }
    },
    // 设置角色
    async assignRoleFn(id) {
      await this.$refs.assignRole.getCheckedListFn(id)
      this.isShowRole = true
    },
    closeRoleDialogFn() {
      this.isShowRole = false
    }
  }
}
</script>

<style lang="scss" scoped>
.staffPhoto{
  width: 180px;
  height: 120px;
  object-fit: cover;
}
</style>

