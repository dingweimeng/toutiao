<template>
  <div class="user-index">
    <!-- 头部 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 单元格 -->
    <input
      type="file"
      ref="file"
      hidden
      accept="image/*"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image
        width="30px"
        height="30px"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditNameShow = true"
    >
    </van-cell>
    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isEditGenderShow = true"
    ></van-cell>
    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayShow = true"
    ></van-cell>
    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateName
        v-if="isEditNameShow"
        :name="user.name"
        @update-name="user.name = $event"
        @close="isEditNameShow = false"
      ></UpdateName>
    </van-popup>

    <!-- 修改性别弹出层 -->
    <van-popup v-model="isEditGenderShow" position="bottom">
      <UpdateGender
        v-model="user.gender"
        @close="isEditGenderShow = false"
      ></UpdateGender>
    </van-popup>

    <!-- 修改生日弹出框 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <UpdateBirthday
        v-if="isEditBirthdayShow"
        v-model="user.birthday"
        @close="isEditBirthdayShow = false"
      ></UpdateBirthday>
    </van-popup>

    <!-- 修改头像 -->
    <van-popup
      class="update-photo-popup"
      v-model="isEditPhotoShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdatePhoto
        v-if="isEditPhotoShow"
        :file="previewImage"
        @close="isEditPhotoShow = false"
        @update-photo="user.photo = $event"
      ></UpdatePhoto>
    </van-popup>
  </div>
</template>

<script>
// 封装接口
import { getUserProfile } from '@/api/user.js'
// 修改昵称组件
import UpdateName from './components/update-name.vue'
// 修改性别组件
import UpdateGender from './components/update-gender.vue'
// 修改生日组件
import UpdateBirthday from './components/update-birthday.vue'
// 更新头像组件
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserIndex',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  props: {},
  data() {
    return {
      // 用户数据
      user: {},
      // 控制修改昵称弹出层
      isEditNameShow: false,
      // 控制修改性别弹出框
      isEditGenderShow: false,
      // 控制修改生日弹出框
      isEditBirthdayShow: false,
      // 编辑头像显示状态
      isEditPhotoShow: false,
      // 上传预览图片
      previewImage: null,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
  mounted() {},
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile()
      console.log(data)
      this.user = data.data
    },
    // input 选择图片触发
    onFileChange() {
      console.log(111)

      // 预览图片
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      const file = this.$refs.file.files[0]
      this.previewImage = file
      // 展示弹出层
      this.isEditPhotoShow = true
      // 防止选择同一种图片不触发
      this.$refs.file.value = ''
    },
  },
}
</script>

<style scoped lang="less">
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
}
</style>
