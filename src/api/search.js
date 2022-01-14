// 搜索相关请求模块
import request from '@/utils/request.js'

// 获取联想建议接口
export const getSearchSuggestions = (q) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}


// 获取搜索结果
export const getSearchResult = params => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params
    })
}

// 获取搜索历史
export const getSearchHistories = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search/histories'
    })
}