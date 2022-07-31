import request from '@/utils/request'

// 获取公司的信息
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}
// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 删除角色
export function delRoleAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 新增角色
export function addRoleAPI(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 获取角色详情
export function getRoleDetailByIdAPI(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 编辑角色
export function updateRoleAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
// 给角色分配权限
export function updateAssignPermAPI(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
