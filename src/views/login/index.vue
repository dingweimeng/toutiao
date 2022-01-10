<template>
  <div class="login-container">
    <!-- 头部 -->
    <van-nav-bar
      class="app-nav-bar"
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        center
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        center
        :rules="formRules.code"
      >
        <!-- 发送验证码按钮组件 -->
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isCountDowShow"
            :time="1000 * 60"
            format=" ss s"
            @finish="isCountDowShow = false"
          />
          <!-- 发送验证码按钮 -->
          <van-button
            v-else
            class="send-btn"
            size="small"
            round
            @click.prevent="onSenSms"
            :loading="isSendSmsLoading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录/注册按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: [],
  data() {
    return {
      user: {
        mobile: '13911111111', //手机号
        code: '246810', //验证码
      },
      // 正则验证
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          // pattern 是正则
          { pattern: /^1[3|5|6|7|8|9]\d{9}$/, message: '手机号格式错误' },
        ],
        code: [
          { required: true, message: '请输入验证码' },
          // pattern 是正则
          { pattern: /^\d{6}$/, message: '验证码格式错误' },
        ],
      },
      // 控制倒计时 和验证码显示隐藏
      isCountDowShow: false,
      // 发送验证码按钮loading 状态
      isSendSmsLoading: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 登录按钮
    async onLogin() {
      // 点击登录 有对应提示
      this.$toast.loading({
        message: '登录中...', // 提示文本
        forbidClick: true, //禁止背景点击
        duration: 0, //展示时长(ms)，值为0时，toast不会消失
      })
      // 1 找登录数据接口
      // 2封装请求方法
      // 3请求调用登录
      try {
        const { data } = await login(this.user)
        // 4处理相应异常

        this.$toast.success('登录成功')
        // 登录成功存token 存vuex中管理
        this.$store.commit('setUser', data.data)
        // 跳转页面
        this.$router.back()
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    //提交表单且验证不通过后触发
    onFailed(error) {
      // console.log(error)
      if (error.errors[0]) {
        this.$toast({
          position: 'top', //防止手机键盘太高 看不见
          message: error.errors[0].message,
        })
      }
    },
    // 点击 发送验证码 按钮
    async onSenSms() {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过老 请求发送验证码
        await sendSms(this.user.mobile)
        // loading状态 ，防止网速慢 多次点击
        this.isSendSmsLoading = true

        // 短信发出去 隐藏发送按钮 显示倒计时
        this.isCountDowShow = true
        // 倒计时结束 隐藏倒计时 显示发送按钮 用组件 finish事件处理

        // 错误走这里
      } catch (err) {
        let message = ''
        // 发送短信验证失败消息提醒
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 这是表单验证失败提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        // 提示用户
        this.$toast({
          // 这是空
          message: message,
          position: 'top',
        })
      }
      // 无论成功还是失败都关闭loading 状态
      this.isSendSmsLoading = false
    },
  },
}
</script>

<style scoped lang="less">
.login-container {
  // 登录按钮 上下间距
  .login-btn-wrap {
    padding: 25px 13px;
    // 登录字体大小
    .van-button {
      font-size: 15px;
    }
  }
  .send-btn {
    width: 78px;
    height: 24px;
    background-color: #ededed;
  }
  .van-button__text {
    font-size: 11px;
    color: #6666;
  }
}
</style>
