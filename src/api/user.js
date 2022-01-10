// 用户相关请求模块
import request from '@/utils/request.js'
// vuex非组件模块中获取store 必须通过这个方式   
// import store from '@/store/index.js'
// 登录/注册
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data

    })
}

// 发送验证码
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}


// 获取登录用户信息
export const getCurrentUser = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user',

        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }

    })
}

//获取用户频道列表
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels'
    })
}


// // 获取文章列表
// export const getArticles = params => {
//     return request({
//         method: 'GET',
//         url: '/app/v1_1/articles',
//         params
//     })
// }