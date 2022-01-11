import Vue from 'vue'
// dayjs时间处理
import dayjs from 'dayjs'
// 加载配置中文语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

// 相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

Vue.filter('relativeTime', value => {
    return dayjs(value).from(dayjs())
})





// console.log(dayjs('2022-01-10').from(dayjs()));

// 日期格式化
// console.log(dayjs().format('YYYY-MM-DD'));