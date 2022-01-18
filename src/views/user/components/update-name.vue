<template>
  <div class="update-name">
    <!-- 头部 -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 输入框 -->
    <div class="box">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.name,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 完成按钮 修改昵称
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true, // 禁止背景点击
      })

      try {
        // 请求接口 更新用户名称
        await updateUserProfile({
          name: this.localName,
        })
        // 更新成功提示
        this.$toast.success('保存成功')
        // 修改父组件的name
        this.$emit('update-name', this.localName)
        // 关闭弹出框
        this.$emit('close')
      } catch (error) {
        if (error && error.response && error.response.status === 409) {
          this.$toast.fail('昵称已处存在')
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
.box {
  padding: 10px;
}
</style>
