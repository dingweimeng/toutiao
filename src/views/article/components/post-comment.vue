<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button size="mini" @click="onPost" :disabled="!message"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  name: 'PostComment',
  components: {},
  props: {
    // 如果是发布文章评论 传文章id
    // 如果是发布评论回复 传评论id
    target: {
      type: [Number, String, Object],
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      // 输入框内容
      message: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 发布
    async onPost() {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true, //禁止背景点击
      })
      const { data } = await addComment({
        target: this.target.toString(), //文章的id
        content: this.message, // 评论的内容
        art_id: this.articleId ? this.articleId.toString() : null,
      })
      // console.log(data)
      this.$emit('post-success', data.data.new_obj)
      this.$$toast.success('发布成功')
      // 发布成功，清空文本框内容
      this.message = ''
    },
  },
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 14px;
}
</style>
