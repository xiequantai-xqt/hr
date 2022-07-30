import request from '@/utils/request'

// 批量新增员工
export function addEmployeesBatchAPI(data) {
  return request({
    url: `/sys/user/batch`,
    method: 'post',
    data
  })
}
// 新增单个员工
export function addEmployeesAPI(data) {
  return request({
    url: `/sys/user`,
    method: 'post',
    data
  })
}
