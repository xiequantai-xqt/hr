<template>
  <el-row type="flex" align="middle" style="height: 40px;width: 100%;">
    <el-col>{{ nodeData.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ nodeData.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单，也可以添加属性trigger="click"，就是点击后显示 -->
          <el-dropdown>
            <span>操作<i class="el-icon-arrow-drwn" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addDeptFn(nodeData)">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isCompany" @click.native="editDeptFn(nodeData)">查看部门</el-dropdown-item>
              <el-dropdown-item v-if="isCompany" @click.native="delDepartmentFn(nodeData.id)">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartmentAPI } from '@/api/departments'
export default {
  props: {
    nodeData: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: '江苏传智播客教育科技股份有限公司',
          manager: '负责人'
        }
      }
    },
    isCompany: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async delDepartmentFn(id) {
      await this.$confirm('是否删除')
      await delDepartmentAPI(id)
      this.$emit('updateDep')
    },
    addDeptFn(nodeData) {
      this.$emit('toggleAddDialog', true)
      this.$emit('passNodeData', nodeData)
    },
    editDeptFn(nodeData) {
      this.$emit('passNodeData', nodeData)
      this.$emit('editDept')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-arrow-drwn::before{
  content: "\e6df";
}
</style>
