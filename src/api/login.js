import request from '@/utils/request'

export function getToken(data) {
  return request({
    url: `/auth/oauth/token?grant_type=password`,
    method: 'get',
    params:data
  })
}


// export function addRole(data) {
//   return request({
//     url: '/vue-element-admin/role',
//     method: 'post',
//     data
//   })
// }
