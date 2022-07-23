import request from '@/utils/request'

// 获取token
export function getTokenAPI(data) {
  return request({
    url: `/sys/login`,
    method: 'post',
    data
  })
}
