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
        to="/search"
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
      <!-- 防止汉堡按钮定位后把列表最后位置挡住，添加一个占位元素 -->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <!-- 汉堡框 -->
      <div
        slot="nav-right"
        @click="isChanelEditShow = true"
        class="wap-nav-wrap"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 汉堡 弹出层 -->
    <van-popup
      v-model="isChanelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      get-container="body"
    >
      <!-- 汉堡信息封装组件  父向子传 子向父传-->
      <ChannelEdit
        :user-channels="channels"
        :active="active"
        @close="isChanelEditShow = false"
        @update-active="onUpdateActive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
// 文章列表封装组件
import ArticleList from './components/article-list.vue'
// 汉堡信息封装组件
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit,
  },
  props: [],
  data() {
    return {
      // 控制文章频道激活的标签
      active: 0,
      // 请求回来的文章列表
      channels: [],
      // 弹出层默认关闭
      isChanelEditShow: false,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    // 请求获取频道数据
    async loadChannels() {
      let channels = []
      if (this.user) {
        // 已登录，获取接口
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 没有登录，判断是否有本地存储
        const localChannels = getItem('user-channels')
        // 如果有本地存储的频道列表就使用
        if (localChannels) {
          channels = localChannels
        } else {
          // 没有登录 ，也没有本地存储，求请求默认推荐频道
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
    },

    // 子向父传值  更新索引
    onUpdateActive(index) {
      // console.log(index)
      this.active = index
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
  // 汉堡样式
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    // 图标
    .van-icon {
      font-size: 25px;
    }
  }
  // 汉堡占位符
  .wap-nav-placeholder {
    width: 33px;
    // flex 布局 这个不参与平分空间
    flex-shrink: 0;
  }
}
</style>
