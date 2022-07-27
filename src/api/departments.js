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
