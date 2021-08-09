import request from '@/utils/request'

export function getToken(data) {
  return request({
    url: `/auth/oauth/token?username=${data.username}&password=${data.password}`,
    method: 'get'
  })
}


// export function addRole(data) {
//   return request({
//     url: '/vue-element-admin/role',
//     method: 'post',
//     data
//   })
// }
