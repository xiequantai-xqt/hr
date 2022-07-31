import request from '@/utils/request'

// 获取权限点
export function getPermissionListAPI() {
  return request({
    url: '/sys/permission'
  })
}
// 根据id获取权限详情
export function getPermissionByIdAPI(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}

// 编辑权限
export function updatePermissionAPI(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}
// 新增权限点
export function addPermissionAPI(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
// 删除权限点
export function delPermissionAPI(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}
