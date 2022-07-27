<template>
  <el-dialog title="新增部门" :visible="addDeptDialog" @close="cancleFn">
    <el-form label-width="120px">
      <el-form-item label="部门编码">
        <el-input style="width:80%" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input style="width:80%" />
      </el-form-item>
      <el-form-item label="负责人名称">
        <el-select placeholder="请选择负责人" style="width:80%">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-select placeholder="请选择负责人" style="width:80%">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
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
export default {
  props: {
    addDeptDialog: {
      type: Boolean
    }
  },
  methods: {
    cancleFn() {
      this.$emit('toggleAddDialog', false)
    },
    submitFn() {}
  }
}
</script>

<style>

</style>
