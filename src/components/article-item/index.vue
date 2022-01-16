<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id,
      },
    }"
  >
    <!-- 顶部插槽 -->
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>

    <!-- 底部插槽 -->
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item" height="73" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 右边插槽 默认插槽-->
    <!-- <div slot="default">123</div> -->
    <van-image
      v-if="article.cover.type === 1"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
// 标题
.title {
  font-size: 16px;
  color: #3a3a3a;
}
// vant 组件
/deep/ .van-cell__value {
  flex: unset;
  width: 116px;
  height: 73px;
  margin-left: 12px;
}
// 一张图片样式
.right-cover {
  width: 116px;
  height: 73px;
}
// 三张图片样式
.cover-wrap {
  padding: 15px 0px;
  display: flex;
  .cover-wrap-item {
    flex: 1;
    height: 73px;
    // &代表父元素 not  排除
    &:not(:last-child) {
      padding-right: 4px;
    }
    .cover-item {
      width: 100%;
      height: 73px;
    }
  }
}
// 底部样式
.label-wrap {
  font-size: 11px;
  color: #b4b4b4;
}
.label-wrap span {
  margin-right: 12px;
}
</style>
