import request from '@/utils/request'

// 数据质量统计
export function getData(data) {
    return request({
        url:'/dst/validate/statistic',
        method: 'post',
        data: data
    })
}