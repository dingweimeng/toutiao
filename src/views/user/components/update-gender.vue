<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 组件 男女触发
    onChange(picker, value, index) {
      // console.log(index)
      this.defaultIndex = index
    },
    // 修改性别
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true, // 禁止背景点击
      })

      // 请求接口 更新用户性别
      await updateUserProfile({
        gender: this.defaultIndex,
      })

      // 修改父组件的name
      this.$emit('input', this.defaultIndex)
      // 关闭弹出框
      this.$emit('close')
      // 更新成功提示
      this.$toast.success('保存成功')
    },
  },
}
</script>

<style scoped lang="less"></style>
