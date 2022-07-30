import request from '@/utils/request'

// 批量新增员工
export function addEmployeesBatchAPI(data) {
  return request({
    url: `/sys/user/batch`,
    method: 'post',
    data
  })
}
