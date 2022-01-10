<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        size="small"
        round
        type="info"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 文章频道列表 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表小组件 -->
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
  },
  props: [],
  data() {
    return {
      // 控制文章频道激活的标签
      active: 0,
      // 请求回来的文章列表
      channels: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    // 请求获取频道数据
    async loadChannels() {
      const { data } = await getUserChannels()
      // console.log(data)
      this.channels = data.data.channels
    },
  },
}
</script>

<style scoped lang="less">
.home-container {
  // 搜索按钮
  .search-btn {
    width: 280px;
    height: 31px;
    background-color: #5babfb;
    border: none;
  }
  // 去掉搜索按钮父元素有宽度限制
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  // 搜索文字
  .van-button__text {
    font-size: 14px;
  }
  // 搜索 图标
  .van-icon-search {
    font-size: 16px;
  }
  // 文章频道列表
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      width: 20px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
}
</style>
