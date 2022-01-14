<template>
  <div class="search-history">
    <van-cell title="历史搜索">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories', [])">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon @click="isDeleteShow = true" v-else name="delete-o" />
    </van-cell>

    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onDelete(history, index)"
    >
      <van-icon v-show="isDeleteShow" name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
// 封装调用接口
// import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // 删除的显示状态
      isDeleteShow: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 删除历史记录
    onDelete(history, index) {
      // 如果是删除状态则删除
      if (this.isDeleteShow) {
        return this.searchHistories.splice(index, 1)
        // 持久化
      }
      // 非删除状态 展示搜索结果
      this.$emit('search', history)
    },
  },
}
</script>

<style scoped lang="less"></style>
