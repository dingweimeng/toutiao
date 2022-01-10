import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 字体图标库
import './styles/icon.css'
// vant 
import Vant from 'vant';
import 'vant/lib/index.css';

// 动态加载rem 基准值
import 'amfe-flexible'
// 全局样式要覆盖vant样式  所有放到vant 下面
import './styles/index.css'
// 全局注册vant
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')