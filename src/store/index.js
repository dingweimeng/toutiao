import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 当前登录用户状态(token 等数据)
        user: getItem('user'),
        // 缓存
        cachePages: ['LayoutIndex']
    },
    // 修改state 必须在着这里（同步操作）
    mutations: {
        setUser(state, data) {
            state.user = data
                // 防止刷新数据丢失 持久化 存本地储存 local 需要转换字符串
                // window.localStorage.setItem('user', JSON.stringify(state.user))
            setItem('user', state.user)
        },
        // 添加缓存页码
        addCachePage(state, pageName) {
            if (!state.cachePages.includes(pageName)) {
                state.cachePages.push(pageName)
            }
        },
        // 移除页面
        removeCachePage(state, pageName) {
            const index = state.cachePages.indexOf(pageName)
            if (index !== -1) {
                state.cachePages.splice(index, 1)
            }
        }
    },
    actions: {},
    modules: {}
})