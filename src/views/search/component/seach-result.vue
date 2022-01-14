<template>
  <div class="seach-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
// 封装调用接口
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SeachResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, //页码
      perPage: 10, //每页多少
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText,
      })
      // console.log(data)
      // 请求回来的数据 放到数据列表中
      const { results } = data.data
      this.list.push(...results)
      // 关闭本次的loading
      this.loading = false
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    },
  },
}
</script>

<style scoped lang="less">
.seach-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
