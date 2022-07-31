import request from '@/utils/request'

// 获取token
export function getTokenAPI(data) {
  return request({
    url: `/sys/login`,
    method: 'post',
    data
  })
}
// 获取员工的基本信息
export function getUserProfileAPI(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
// 保存员工基本信息
export function saveUserProfileAPI(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
// 获取员工基本资料（userId）
export function getUserBaseInfoAPI() {
  return request({
    url: `/sys/profile`,
    method: 'post'
  })
}
// 获取员工列表
export function getEmployeeListAPI(params) {
  return request({
    url: `/sys/user`,
    params
  })
}
