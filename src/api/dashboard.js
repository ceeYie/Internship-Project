import request from '@/utils/request'

export function getData(data) {
    return request({
        url:'/dst/validate/statistic',
        method: 'post',
        data: data
    })
}