import request from '@/utils/request'

// 渲染角色列表信息
export function getRoleListAPI(params) {
  return request({
    url: `/sys/role`,
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
    url: `/sys/role`,
    method: 'post',
    data
  })
}
// 获取角色详情
export function getRoleDetailAPI(id) {
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
