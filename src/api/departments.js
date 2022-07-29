import request from '@/utils/request'

// 获取企业部门列表
export function getDepartmentListAPI() {
  return request({
    url: `/company/department`
  })
}
// 删除部门
export function delDepartmentAPI(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
// 新增部门
export function addDepartmentAPI(data) {
  return request({
    url: `/company/department`,
    method: 'post',
    data
  })
}
// 根据id获取部门详情
export function getDeptDetailByIdAPI(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 根据id修改部门详情
export function updateDeptAPI(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
