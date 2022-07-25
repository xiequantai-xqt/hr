<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用一个行列布局 -->
        <el-row type="flex" align="middle" style="height: 40px;width: 100%;">
          <el-col>江苏传智播客教育科技股份有限公司</el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单，也可以添加属性trigger="click"，就是点击后显示 -->
                <el-dropdown>
                  <span>操作<i class="el-icon-arrow-drwn" /></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                    <el-dropdown-item>查看部门</el-dropdown-item>
                    <el-dropdown-item>删除部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%;">
          <el-col>
            <span>6666</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>经理</el-col>
              <el-col>
                <!-- 下拉菜单，也可以添加属性trigger="click"，就是点击后显示 -->
                <el-dropdown>
                  <span>操作<i class="el-icon-arrow-drwn" /></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.dashboard-container{
  .app-container{
    .tree-card {
      padding: 30px  140px;
      font-size:14px;
      .el-icon-arrow-drwn::before{
        content: "\e6df";
      }
    }
  }
}

</style>

