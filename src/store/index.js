import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 当前登录用户状态(token 等数据)
        user: getItem('user')
    },
    // 修改state 必须在着这里（同步操作）
    mutations: {
        setUser(state, data) {
            state.user = data
                // 防止刷新数据丢失 持久化 存本地储存 local 需要转换字符串
                // window.localStorage.setItem('user', JSON.stringify(state.user))
            setItem('user', state.user)
        }
    },
    actions: {},
    modules: {}
})