import request from '@/utils/request'

// 获取企业部门列表
export function getDepartmentListAPI() {
  return request({
    url: `/company/department`
  })
}
