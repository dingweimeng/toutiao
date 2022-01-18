<template>
  <div class="update-photo">
    <img :src="image" ref="image" class="image" />
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user.js'
// 头像裁切
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    file: {
      // type: Object,
      required: true,
    },
  },
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      // 裁切器实例
      cropper: null,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    })
    console.log(cropper)
  },
  methods: {
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },

    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true,
        duration: 0, //持续时间 0表示持续展示
      })
      const file = await this.getCroppedCanvas()
      //接口要求类型   Content-Type	  multipart/form-data
      const fd = new FormData()
      // fd.append('photo', 文件对象)
      fd.append('photo', file)

      await updateUserPhoto(fd)
      // 更新父组件中的用户头像
      this.$emit('update-photo', window.URL.createObjectURL(file))
      // 关闭弹出层
      this.$emit('close')
      this.$toast.success('保存成功')
    },
  },
}
</script>

<style scoped lang="less">
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
.image {
  display: block;
  max-width: 100%;
}
</style>
