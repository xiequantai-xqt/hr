<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" @change="dateChange">
        <el-option
          v-for="year in yearList"
          :key="year"
          :label="`${year}年`"
          :value="year"
        />
      </el-select>
      <el-select v-model="currentMonth" size="small" @change="dateChange">
        <el-option
          v-for="month in 12"
          :key="month"
          :label="`${month}月`"
          :value="month"
        />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template #dateCell="{ data,date }" class="content">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(oldVal) {
      return oldVal.split('-')[2]
    }
  },
  data() {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    const yearList = []
    for (let i = 0; i < 11; i++) {
      yearList.push(currentYear - 5 + i)
    }
    return {
      currentDate,
      currentMonth,
      currentYear,
      yearList
    }
  },
  methods: {
    dateChange() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}`)
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>

<style lang="scss"  scoped>
::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,
 ::v-deep .el-calendar-table tr td:first-child,
 ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>

