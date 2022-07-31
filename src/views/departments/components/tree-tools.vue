<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%;">
    <el-col>
      <strong v-if="isCompany">{{ nodeData.name }}</strong>
      <span v-else>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col v-if="isCompany">
          <strong>{{ nodeData.manager }}</strong>
        </el-col>
        <el-col v-else>{{ nodeData.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单，也可以添加属性trigger="click"，就是点击后显示 -->
          <el-dropdown>
            <strong v-if="isCompany">操作<i class="el-icon-arrow-drwn" /></strong>
            <span v-else>操作<i class="el-icon-arrow-drwn" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addDepartment">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isCompany" @click.native="updateDepartment">查看部门</el-dropdown-item>
              <el-dropdown-item v-if="!isCompany" @click.native="delDepartment(nodeData.id)">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from '@/api/departments'

export default {
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    isCompany: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async delDepartment(id) {
      // 需要二次询问
      // const res = await MessageBox.confirm('是否删除？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
      await this.$confirm('是否删除？')
      await delDepartment(id)
      this.$message.success('删除成功')
      // 更新页面
      this.$emit('delDepartment')
    },
    // 新增部门
    addDepartment() {
      this.$emit('addDepartment', this.nodeData)
    },
    // 编辑部门
    updateDepartment() {
      this.$emit('updateDepartment', this.nodeData)
    }
  }
}
</script>

<style>

</style>
