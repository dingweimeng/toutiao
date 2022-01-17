<template>
  <van-cell class="comment-item">
    <!-- 头像 -->
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />

    <div slot="title">
      <div class="title-wrap">
        <!-- 作者名字 -->
        <div class="name">{{ comment.aut_name }}</div>
        <!-- 点赞 默认插槽在右边 -->
        <div class="like-wrap" @click="onCommentLike">
          <van-icon
            class="like-icon"
            :class="{
              liked: comment.is_liking,
            }"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          />
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>

      <!-- 内容 -->
      <div class="content">
        {{ comment.content | datetime }}
      </div>
      <!-- 时间部分 -->
      <div>
        <!-- 时间 -->
        <span class="pubdate">{{ comment.pubdate }}</span>
        <!-- 按钮 -->
        <van-button class="btn" round size="mini"
          >{comment.reply_count{}}回复</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, daleteCommentLike } from '@/api/comment.js'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点赞
    async onCommentLike() {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        // 已点赞，取消点赞
        await daleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        // 没有点赞 ，添加点赞
        await addCommentLike(commentId)
        this.comment.like_count++
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
    },
  },
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 35px;
    height: 35px;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .content {
    font-size: 16px;
    color: #2222;
  }
  .pubdate {
    font-size: 10px;
    margin-right: 10px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
  }
  .like-wrap {
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .liked-icon .liked {
    color: red;
  }
}
</style>
