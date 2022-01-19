<template>
  <div class="my-container">
    <!-- 上部分 -->
    <van-cell-group v-if="user" class="my-info">
      <!-- 用户基本信息 -->
      <van-cell class="base-info" center :border="false">
        <!-- 头像 -->
        <van-image
          class="avatar"
          slot="icon"
          round
          fit=" cover"
          :src="currentUser.photo"
        />
        <!-- 昵称 -->
        <div class="name" slot="title">{{ currentUser.name }}</div>
        <!-- 编辑资料 -->
        <van-button class="update-btn" size="small" round to="/user"
          >编辑资料</van-button
        >
      </van-cell>
      <!-- 基本数据 -->
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 上部分 未登录渲染这个 -->
    <div v-else class="not-login">
      <div
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my',
            },
          })
        "
      >
        <img class="mobile" src="./手机.png" alt="" />
      </div>
      <div class="text">登录/注册</div>
    </div>
    <!-- 中间部分  收藏 历史 -->
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <!-- 中间下部分 -->
    <van-cell title="消息通知" is-link url="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell v-if="user" class="logout" title="退出登录" @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user.js'

export default {
  name: 'MyIndex',
  components: {},
  props: [],
  data() {
    return {
      // 请求回来的数据
      currentUser: {},
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.loadCurrentUser()
  },
  mounted() {},
  methods: {
    // 退出按钮
    onLogout() {
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确认退出吗？',
        })
        .then(() => {
          // 确认执行这里代码 移动端清除token就行 不跳转页面
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取用户信息
    async loadCurrentUser() {
      const { data } = await getCurrentUser()
      // console.log(data)
      this.currentUser = data.data
    },
  },
}
</script>

<style scoped lang="less">
.my-container {
  // 上部分
  .my-info {
    background: url(./banner.png) no-repeat;
    background-size: cover;
    // 组件默认背景颜色 加 /deep/ 否则不生效
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
    //  用户基本信息
    .base-info {
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;

      // 有组件样式挡住了 背景图片不生效 干掉背景颜色
      background-color: unset;
      // 图片
      .avatar {
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        box-sizing: border-box;
      }
      // 昵称
      .name {
        margin-left: 11px;
        color: #fff;
        font-size: 15px;
      }
      // 编辑按钮
      .update-btn {
        height: 18px;
        font-size: 10px;
        color: #666666;
      }
    }
    // 数据部分
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
  }
  // 上部分 未渲染部分
  .not-login {
    height: 180px;
    background: url(./banner.png) no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
  }
  // 收藏 历史部分   不生效加 deep
  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      // 文字
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  // 退出登录
  .logout {
    text-align: center;
    font-size: 20px;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
