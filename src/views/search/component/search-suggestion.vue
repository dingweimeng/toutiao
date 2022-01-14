<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
// 加载接口模块
import { getSearchSuggestions } from '@/api/search.js'
//  按需引入 截流防抖 第三方包 (debounce)
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: 'true',
    },
  },
  data() {
    return {
      // 联想建议数据列表
      suggestions: [],
    }
  },
  computed: {},
  watch: {
    // 监听完整写法
    searchText: {
      // 当数据发生变化会执行 handler 函数
      //  使用节流防抖技术
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 300),
      // 该回调将会在侦听开始之后被立即调用
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 搜索高亮文本
    highlight(str) {
      return str.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style='color:red'> ${this.searchText}</span>`
      )
    },
  },
}
</script>

<style scoped lang="less"></style>
