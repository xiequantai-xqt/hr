<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用一个行列布局 -->
        <TreeTools :is-company="true" :node-data="companyInfo" />
        <hr>
        <!-- 分割线以下是部门树形数据 -->
        <el-tree :data="depts" default-expand-all :props="{label:'name'}">
          <template #default="{data}">
            <TreeTools
              :node-data="data"
              @addDepartment="addDptFn"
              @updateDepartment="updateDepartmentFn"
              @delDepartment="delDepartmentFn"
            />
          </template>
        </el-tree>
      </el-card>
      <AddDept
        ref="addDept"
        :is-show-dialog.sync="isShowDialog"
        :node-data="tempDepartment"
        @updateDepartments="updateDepartmentsFn"
      />
    </div>
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/departments'
import TreeTools from './components/tree-tools.vue'
import { listToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  components: { TreeTools, AddDept },
  data() {
    return {
      depts: [],
      companyInfo: {},
      isShowDialog: false,
      tempDepartment: {}
    }
  },
  async created() {
    const res = await getDepartmentList()
    this.depts = listToTreeData(res.depts, '')
    this.companyInfo = {
      name: res.companyName,
      manager: '负责人'
    }
  },
  methods: {
    // 新增部门
    addDptFn(node) {
      this.tempDepartment = node
      this.isShowDialog = true
    },
    // 新增后更新页面
    async updateDepartmentsFn() {
      const res = await getDepartmentList()
      this.depts = listToTreeData(res.depts, '')
    },
    // 编辑
    updateDepartmentFn(nodeData) {
      this.tempDepartment = nodeData
      this.$refs.addDept.getDepartmentDetail(nodeData.id)
      this.isShowDialog = true
    },
    // 删除后更新页面
    async delDepartmentFn() {
      const res = await getDepartmentList()
      this.depts = listToTreeData(res.depts, '')
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>

