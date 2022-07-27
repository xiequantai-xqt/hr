<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用一个行列布局 -->
        <TreeTools />
        <hr>
        <el-tree :data="depts" :props="{label:'name'}">
          <template #default="{data}">
            <TreeTools :node-data="data" @updateDep="getDepartment" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartmentListAPI } from '@/api/departments'
import TreeTools from './components/tree-tools.vue'
import { dataToTree } from '@/utils'
export default {
  components: { TreeTools },
  data() {
    return {
      depts: []
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

