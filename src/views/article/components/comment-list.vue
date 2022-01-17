<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
      ></CommentItem>
      <!-- <van-cell
       
        :title="comment.content"
      /> -->
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem,
  },
  props: {
    // 传过来的id
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      // 数组或对象的默认值必须通过函数返回
      default: () => [],
    },
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //获取下一页数据的页码
      limit: 10, // 每页大小
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 评论文章
    async onLoad() {
      // 1 请求获取数据
      const { data } = await getComments({
        type: 'a',
        source: this.source,
        offset: this.offset,
        limit: this.limit,
      })
      // console.log(data)
      this.$emit('update-total-count', data.data.total_count)
      // 2把数据放到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3将本次的loading 关闭
      this.loading = false
      // 4 判断是否还有数据
      if (results.length) {
        // 如果有
        this.offset = data.data.last_id
      } else {
        // 没有数据 将finished 设置成 true 不再触发加载更多
        this.finished = true
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
