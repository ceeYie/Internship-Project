import request from '@/utils/request'
//用户列表
export function userList(data) {
  return request({
    url: `/dst/user/list`,
    method: 'post',
    data:data
  })
}

//新增用户
export function userSave(data) {
    return request({
      url: `/dst/user/save`,
      method: 'post',
      data:data
    })
}

//新增用户
export function statistic(data) {
    return request({
      url: `/dst/validate/statistic`,
      method: 'post',
      data:data
    })
}