// 请求模块
import axios from "axios";
import store from "@/store/index.js";

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



// 导出
export default request