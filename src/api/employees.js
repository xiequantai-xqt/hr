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
// 删除员工
export function delEmployeesAPI(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
// 读取用户详情的基础信息
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

// 更新用户详情的基础信息
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

// 获取用户的岗位信息
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

// 保存岗位信息
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
