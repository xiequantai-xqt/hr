import request from '@/utils/request'

// 获取组织架构部门
export function getDepartmentList() {
  return request({
    url: '/company/department'
  })
}
// 删除部门
export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
// 新增部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 查看部门详情
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 修改部门
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
