import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    // 登录页面
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login/index.vue')

    },
    // layout 页面
    {
        path: '/',
        component: () =>
            import ('@/views/layout/index.vue'),
        children: [
            // 子路由
            {
                path: '',
                name: 'home',
                component: () =>
                    import ('@/views/home/')
            },
            {
                path: '/qa',
                name: 'qa',
                component: () =>
                    import ('@/views/qa/')
            },
            {
                path: '/video',
                name: 'video',
                component: () =>
                    import ('@/views/video/')
            },
            {
                path: '/my',
                name: 'my',
                component: () =>
                    import ('@/views/my/')
            }

        ],
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/views/search/index.vue')
    },

    {
        path: '/article/:articleId',
        name: 'article',
        component: () =>
            import ('@/views/article/index.vue'),
        // 开启路由传参
        props: true
    },
    {
        path: '/user',
        name: 'user-index',
        component: () =>
            import ('@/views/user/index.vue')
    }

]

const router = new VueRouter({
    routes
})

export default router