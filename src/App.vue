<template>
  <div id="app">
    <!-- 用于优化缓存 keep -alive 注意 缺点 生命周期create 不会渲染了 -->
    <!-- 可以条件缓存加 属性  -->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages']),
  },
}
</script>

<style lang="less" scoped></style>
