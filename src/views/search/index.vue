<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SeachResult :searchText="searchText" v-if="isResultShow"></SeachResult>
    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></SearchSuggestion>
    <!-- 历史记录 -->
    <SearchHistory
      :searchHistories="searchHistories"
      @search="onSearch"
      v-else
      @update-histories="searchHistories = $event"
    ></SearchHistory>
  </div>
</template>

<script>
// 搜索结果
import SeachResult from './component/seach-result.vue'
// 联想建议组件
import SearchSuggestion from './component/search-suggestion.vue'
// 历史记录
import SearchHistory from './component/search-history.vue'
// 本地存储
import { setItem, getItem } from '@/utils/storage.js'
// 封装接口
import { getSearchHistories } from '@/api/search.js'
import { mapState } from 'vuex'

export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SeachResult,
  },
  props: {},
  data() {
    return {
      // 搜索框 双向绑定
      searchText: '',
      // 控制搜索结果的显示状态
      isResultShow: false,
      //  搜索历史记录数据
      searchHistories: [],
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.loadSearchHistories()
  },
  mounted() {},
  methods: {
    // 搜索框 按回车触发
    onSearch(searchText) {
      // 把输入框设置你要搜索的文本
      this.searchText = searchText
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复的项删除
        this.searchHistories.splice(index, 1)
      }
      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText)
      // 数据持久化
      setItem('search-histories', this.searchHistories)
      this.isResultShow = true
    },

    // 数据持久化
    async loadSearchHistories() {
      let searchHistories = getItem('search-histories') || []
      if (this.user) {
        const { data } = await getSearchHistories()
        console.log(data.data.keywords)
        searchHistories = [
          ...new Set([...searchHistories, ...data.data.keywords]),
        ]
      }
      this.searchHistories = searchHistories
    },
    // 右侧取消触发
    onCancel() {
      this.$router.back()
    },
  },
}
</script>

<style scoped lang="less"></style>
