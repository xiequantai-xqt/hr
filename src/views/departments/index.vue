<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用一个行列布局 -->
        <TreeTools @toggleAddDialog="toggleAddDialogFn" />
        <hr>
        <el-tree :data="depts" :props="{label:'name'}" :default-expand-all="true">
          <template #default="{data}">
            <TreeTools
              :node-data="data"
              :is-company="true"
              @updateDep="getDepartment"
              @toggleAddDialog="toggleAddDialogFn"
              @passNodeData="passNodeDataFn"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <AddDept
      :add-dept-dialog="addDeptDialog"
      :node-data="nodeData"
      @toggleAddDialog="toggleAddDialogFn"
      @updateDep="getDepartment"
    />
  </div>
</template>

<script>
import { getDepartmentListAPI } from '@/api/departments'
import TreeTools from './components/tree-tools.vue'
import { dataToTree } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  components: { TreeTools, AddDept },
  data() {
    return {
      depts: [],
      addDeptDialog: false, // 新增部门弹窗
      nodeData: ''
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const deptsRes = await getDepartmentListAPI()
      const { depts } = deptsRes.data
      const deptsFlat = depts.filter(item => item.pid !== '-1')
      this.depts = dataToTree(deptsFlat, '')
    },
    toggleAddDialogFn(value) {
      this.addDeptDialog = value
    },
    passNodeDataFn(nodeData) {
      this.nodeData = nodeData
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  .app-container{
    .tree-card {
      padding: 30px  140px;
      font-size:14px;
    }
  }
}

</style>

