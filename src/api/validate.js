import request from '@/utils/request'
//检验列表
export function validateReport(data) {
  return request({
    url: `/dst/validate/report`,
    method: 'post',
    data:data
  })
}

//异常列表
export function errorTable(data) {
    return request({
      url: `/dst/validate/errorTable`,
      method: 'post',
      data:data
    })
}

//异常详情
export function validateErrors(data) {
    return request({
      url: `/dst/validate/errors`,
      method: 'post',
      data:data
    })
}