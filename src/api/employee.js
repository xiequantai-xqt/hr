import request from '@/utils/request'

// 获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
// 获取员工列表
export function getEmployeeListAPI(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 导入员工
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
// 删除员工
export function deleteEmployeeAPI(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'delete'
  })
}
// 新增员工
export function addEmployeeAPI(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
// 保存员工的基本信息
export function saveEmployeeByIdAPI(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
// 读取员工的基本信息
export function getEmployeeInfoAPI(id) {
  return request({
    url: `/sys/user/${id}`
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
// 获取角色列表
export function getRoleListAPI() {
  return request({
    url: '/sys/role'
  })
}
// 给员工分配角色
export function assignRolesAPI(data) {
  return request({
    url: `/sys/user/assignRoles`,
    method: 'put',
    data
  })
}
