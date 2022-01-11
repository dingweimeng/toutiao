// 频道相关请求模块
import request from '@/utils/request.js'

// 获取所有频道列表
export const getAllchannel = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    })
}