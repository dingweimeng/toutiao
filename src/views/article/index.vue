<template>
  <div class="article-container">
    <!-- 头部 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->
    <h1 class="title">{{ article.title }}</h1>
    <van-cell center class="user-info">
      <van-image
        class="avatar"
        slot="icon"
        fit="cover"
        round
        :src="article.aut_photo"
      />
      <div slot="title" class="name">{{ article.aut_name }}</div>
      <div slot="label" class="pubdate">
        {{ article.pubdate | relativeTime }}
      </div>
      <van-button
        :type="article.is_followed ? 'default' : 'info'"
        round
        size="small"
        :icon="article.is_followed ? '' : 'plus'"
        class="follow-btn"
        :loading="isFollowLoading"
        @click="onFollow"
        >{{ article.is_followed ? '已关注' : '关注' }}</van-button
      >
    </van-cell>

    <!-- 文章正文 -->
    <div
      ref="article-content"
      class="markdown-body"
      v-html="article.contend"
    ></div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <!-- 评论 -->
      <van-icon name="comment-o" info="123" color="#777" />
      <!-- 收藏 -->
      <van-icon
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <!-- 点赞 -->
      <van-icon
        :color="article.attitude === 1 ? 'hotpink' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <!-- 转发 -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>
  </div>
</template>

<script>
// 引入文章样式 参照GitHUb
import './github-markdown.css'
// 封装接口
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike,
} from '@/api/article.js'
// 引入 图片预览   van 需要单独引用
import { ImagePreview } from 'vant'
// 封装接口
import { addFollow, daleteFollow } from '@/api/user.js'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    // 传过来的id
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      // 请求回来的文章数据对象
      article: {},
      // 关注用户的loading 状态
      isFollowLoading: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    async loadArticle() {
      const { data } = await getArticleById(this.articleId)
      console.log(data)
      this.article = data.data

      // 数据该把影响视图更新(DOM数据) 不是立即的，需要把代码放到$nextTick 中
      this.$nextTick(() => {
        // 处理图片预览
        this.handlePerviewImage
      })
    },
    // 处理图片预览
    handlePerviewImage() {
      // 获取文章内容DOM 容器 循环img 注册点击事件，在事件中调用ImagePreview
      const articleContent = this.$refs['article-content']
      //  得到所有img
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths, // 预览图片路径
            startPosition: index, //点击图片起始位置
          })
        }
      })
    },
    // 关注按钮
    async onFollow() {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 已关注，取消关注
        await daleteFollow(this.article.aut_id)
        this.article.is_followed = false
      } else {
        // 没有关注 ，添加关注
        await addFollow(this.article.aut_id)
        this.article.is_followed = true
      }
      this.isFollowLoading = false
    },
    // 收藏
    async onCollect() {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true, // 禁止背景点击
      })
      if (this.article.is_collected) {
        // 已收藏，取消收藏
        await deleteCollect(this.articleId)
      } else {
        // 没有收藏，添加收藏
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },

    // 点赞
    async onLike() {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true, // 禁止背景点击
      })
      if (this.article.attitude === 1) {
        // 已收藏，取消点赞
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        // 没有收藏，添加点赞
        await addLike(this.articleId)
        this.article.attitude = 1
      }

      this.$toast.success(
        `${this.article.attitude === 1 ? '' : '取消'}点赞成功`
      )
    },
  },
}
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
  color: 3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}

.user-info {
  // 图片
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  // 作者
  .name {
    font-size: 12px;
    color: #333;
  }
  // 小时前
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  // 按钮
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 50px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 200px;
    height: 30px;
    border: 2px solid #eeeeee;
    font-size: 20px;
    line-height: 30px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 25px;
    .van-info {
      font-size: 14px;
      background-color: #e22829;
    }
  }
}
</style>
