import request from '@/utils/request'
//检验列表
export function extracts(data) {
  return request({
    url: `/dst/log/extracts`,
    method: 'post',
    data:data
  })
}