<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共{{ total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
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
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
          <el-table-column label="账户状态" sortable="" prop="enableState" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
import { getEmployeeListAPI } from '@/api/user'
export default {
  data() {
    return {
      pagesetting: {
        page: 1,
        size: 10
      },
      total: 0,
      employeeList: []
    }
  },
  created() {
    this.getEmployeeList(this.pagesetting)
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
        const hireItem = hireType.find(item => item.type === row.formOfEmployment)
        if (hireItem) {
          return hireItem.value
        } else {
          return row.formOfEmployment
        }
      }
    }
  }
}
</script>
