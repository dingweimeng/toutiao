// 文章列表这个文件
<template>
  <div class="article-list">
    <!-- 下拉刷新组件包裹 -->
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <!-- 数据列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 接口封装
import { getArticles } from '@/api/article.js'
// 列表公告组件
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      // 数据列表
      articles: [],
      // loading 加载状态
      loading: false,
      // 控制加载结束状态
      finished: false,
      // 获取下一页数据的时间戳
      timestamp: null,
      // 下拉刷新的loading 状态
      isRefreshLoading: false,
      // 下拉刷新成功提示文本
      refreshSuccessText: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 获取文章列表数据
    async onLoad() {
      // console.log(111)
      const { data } = await getArticles({
        channel_id: this.channel.id, //频道id
        timestamp: this.timestamp || 1556789000001, //时间戳
        with_top: 1,
      })
      // console.log(data)
      const { results } = data.data
      // 请求回来数据 赋值 push 添加 否则会覆盖
      this.articles.push(...results)
      // 本次加载加载状态结束
      this.loading = false
      // 判断数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据列表
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了 把加载状态设置结束，不再触发更多
        this.finished = true
      }
    },

    // 下拉刷新触发 同样接口
    async onRefresh() {
      // console.log(123)
      // console.log(Date.now())
      const { data } = await getArticles({
        channel_id: this.channel.id, //频道id
        timestamp: 1556789000004, //时间戳
        with_top: 1,
      })
      // 请求获取数据，下拉刷新是往追加顶部
      const { results } = data.data
      this.articles.unshift(...results)

      // 关闭刷新的状态
      this.isRefreshLoading = false
      // 刷新提示
      this.refreshSuccessText = `更新了${results.length}条数据`
    },
  },
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
