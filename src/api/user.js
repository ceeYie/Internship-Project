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

//修改密码
export function updatePwd(data) {
    return request({
      url: `/dst/user/updatePwd`,
      method: 'post',
      data:data
    })
}

//删除用户
export function userDelete(data) {
    return request({
      url: `/dst/user/delete`,
      method: 'post',
      data:data
    })
}

//启用禁用
export function updateStatus(data) {
    return request({
      url: `/dst/user/updateStatus`,
      method: 'post',
      data:data
    })
}