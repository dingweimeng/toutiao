<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <!-- 编辑按钮 -->
      <van-button
        type="danger"
        size="mini"
        @click="isEdit = !isEdit"
        plain
        round
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 频道下面文字 -->
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <!-- 频道推荐文字 -->
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
// 封装接口
import {
  getAllchannel,
  addUserChannel,
  deleteUserChannel,
} from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    // 父组件穿来的频道信息
    userChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // 请求回来的所有频道信息
      allChannels: [],
      // 控制编辑的显示状态
      isEdit: false,
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐的频道列表
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.userChannels.find((userChannel) => {
          return userChannel.id === channel.id
        })
      })
    },
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    // 获取所有频道
    async loadAllChannels() {
      const { data } = await getAllchannel()
      // console.log(data)
      this.allChannels = data.data.channels
    },
    // 点击频道推荐  添加进去 我的频道
    async onAdd(channel) {
      // console.log(channel)
      this.userChannels.push(channel)

      // 数据持久化
      if (this.user) {
        // 登录了，数据存线上
        await addUserChannel({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length,
            },
          ],
        })
      } else {
        // 未登录,数据存本地
        setItem('user-channels', this.userChannels)
      }
    },
    // 判断是切换 和删除频道
    onUserChannelClick(channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态 删除频道 走这个方法
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态，切换频道  走这个方法
        this.switchChannel(index)
      }
    },
    // 删除频道业务
    async deleteChannel(channel, index) {
      // 如果删除当前索引之前频道
      if (index <= this.active) {
        // 更新索引
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        //  登录了持久化到线上
        await deleteUserChannel(channel.id)
      } else {
        // 没有登录，持久化到本地
        setItem('user-channels', this.userChannels)
      }
    },
    //  切换频道业务
    switchChannel(index) {
      console.log('切换频道')

      // 1 先关闭弹出层 弹出层在父组件控制 这边传值过去
      this.$emit('close')
      // 2 更新索引
      this.$emit('update-active', index)
    },
  },
}
</script>

<style scoped lang="less">
// 外面大盒子
.channel-edit {
  padding-top: 54px;
}
// 编辑按钮
.van-button {
  width: 60px;
}
//频道
.channel-title {
  font-size: 16px;
  color: #333;
}
.grid-item {
  width: 80px;
  height: 43px;
  /deep/ .van-grid-item__content {
    background-color: #f4f5f6;
    .van-grid-item__text {
      font-size: 14px;
      color: #222;
      margin-top: 0;
    }
  }
}
// x 图标
/deep/.van-grid-item__icon {
  position: absolute;
  right: -5px;
  top: -5px;
  font-size: 20px;
  color: #ccc;
}
.active {
  /deep/ .van-grid-item__text {
    color: red !important;
  }
}
</style>
