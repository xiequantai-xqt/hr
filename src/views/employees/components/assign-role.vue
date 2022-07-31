<template>
  <el-dialog title="分配角色" :visible="isShowRole" @close="onCancle">
    <!-- 被选中的角色列表 -->
    <el-checkbox-group v-model="checkedList">
      <!-- 遍历所有的角色列表 -->
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="onCancle">取消</el-button>
          <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { assignRolesAPI, getRoleListAPI } from '@/api/employee'
import { getUserDetailById } from '@/api/user'
export default {
  props: {
    isShowRole: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleList: [], // 全部角色列表
      checkedList: [], // 被选中的角色列表
      userId: ''
    }
  },
  created() {
    // 获取角色列表
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoleListAPI()
      this.roleList = res.rows
    },
    // 获取选中的角色
    async getCheckedListFn(id) {
      const res = await getUserDetailById(id)
      if (res.roleIds === null || res.roleIds.length === 0) {
        res.roleIds = []
      }
      this.checkedList = res.roleIds
      this.userId = res.id
    },
    async onSubmit() {
      // 给员工分配角色
      await assignRolesAPI({ roleIds: this.checkedList, id: this.userId })
      this.$message.success('修改成功')
      this.$emit('closeRoleDialog')
      this.getRoleList()
    },
    onCancle() {
      this.$emit('closeRoleDialog')
    }
  }
}
</script>

<style>

</style>
