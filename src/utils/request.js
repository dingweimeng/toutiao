// 请求模块
import axios from "axios";
import store from "@/store/index.js";
// 相应拦截器需要提示 加载vant
import { Toast } from "vant";

// 路由
import router from '@/router/index.js'


// 单独封装 获取 refresh_token 
const refreshTokenReq = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net'
})



// 正常封装
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net'
})

// 请求拦截器 添加token
request.interceptors.request.use(function(config) {
    // console.log(config);
    const { user } = store.state
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, function(error) {
    return Promise.reject(error)
})

//   相应拦截器
request.interceptors.response.use(function(response) {
    // 相应成功走这里
    return response
}, async function(error) {
    // 请求相应失败进入这里
    // 超过200 的状态走这里
    const status = error.response.status

    if (status === 400) {
        // 客户端请求错误
        Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
        // token 无效 或者假tuken
        const { user } = store.state
        if (!user || !user.token) {
            // 直接跳转到登录页面
            return redirectLogin()
        }
        // 使用 refresh_token 请求获取新的token
        try {
            const { data } = await refreshTokenReq({
                method: 'PUT',
                url: '/app/v1_0/authorizations',
                headers: {
                    Authorization: `Bearer ${user.refresh_token}`
                }

            })

            //  拿到新的token  更新容器
            user.token = data.data.token
            store.commit('setUser', user)
            return request(error.config)
        } catch (error) {
            // 刷新token 失败 直接跳转login
            redirectLogin()
        }


    } else if (status === 403) {
        // 没有权限操作
    } else if (status === 500) {
        //   服务端错误
        Toast.fail('服务器异常,请稍后重试')

    }

    // 抛出异常
    return Promise.reject(error)
})



// 封装跳转登录页面
function redirectLogin() {
    router.replace({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}


// 导出
export default request