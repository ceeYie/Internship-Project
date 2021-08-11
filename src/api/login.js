import request from '@/utils/request'
//登录获取token
export function getToken(data) {
  return request({
    url: `/auth/oauth/token?grant_type=password`,
    method: 'get',
    params:data
  })
}