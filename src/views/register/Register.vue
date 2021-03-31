<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 注册表单 -->
    <van-form  @submit="onSubmit">
      <van-field
        :right-icon="usernameTip"
        clearable
        v-model="username"
        name="user_name"
        placeholder="用户名"
      />
      <van-field
        :right-icon="telTip"
        clearable
        v-model="tel"
        name="user_tel"
        placeholder="手机号"
      />
      <van-field
        :right-icon="codeTip"
        clearable
        name="code"
        v-model="code"
        center
        placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary" native-type="button" :disabled="btnClick" @click="sendCodeFn">
            {{codeMsg}}
          </van-button>
        </template>
      </van-field>
      <van-field
        :right-icon="passwordTip"
        clearable
        v-model="password"
        type="password"
        name="user_password"
        placeholder="密码"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" :disabled="btnTip">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="switch" @click="switchLogin()">已有账号？立即登陆</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      tel: '',
      code: '',
      password: '',
      codeMsg: '获取验证码',
      time: 60,
      timer: null,
      btnClick: false,
      skip: 3
    }
  },
  computed: {
    usernameTip () {
      if (this.username.length >= 2) {
        return 'success'
      } else {
        return ''
      }
    },
    telTip () {
      if (this.tel.length === 11 && (/^1[3,4,5,6,7,8,9][0-9]{9}$/).test(this.tel)) {
        return 'success'
      } else {
        return ''
      }
    },
    codeTip () {
      if (this.code.length === 6) {
        return 'success'
      } else {
        return ''
      }
    },
    passwordTip () {
      if (this.password.length >= 6 && this.password.length < 18) {
        return 'success'
      } else {
        return ''
      }
    },
    btnTip () {
      if (this.usernameTip === 'success' && this.telTip === 'success' && this.codeTip === 'success' && this.passwordTip === 'success') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    // 返回上一页
    onClickLeft () {
      this.$router.back()
    },
    // 调用发送短信验证码接口
    clickSendCode () {
      return this.$apis.sendCode({
        user_tel: this.tel
      }).then(res => {
        if (res.data.code === '10002') {
          return false
        } else {
          return true
        }
      })
    },
    // 发送短信验证码倒计时
    async sendCodeFn () {
      if (this.telTip !== 'success') {
        this.$toast('请输入正确的手机号')
        return
      }
      // 获取promise的值，并将其返回
      const flag = await this.clickSendCode().then(res => {
        return res
      })
      if (!flag) {
        this.$toast('手机号已被注册')
        return
      } else {
        this.$toast('验证码发送成功')
      }
      this.btnClick = true
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.codeMsg = this.time + 's后重新获取'
        } else {
          this.time = 61
          this.btnClick = false
          this.codeMsg = '重新获取验证码'
          clearInterval(this.timer)
        }
        this.time--
      }, 1000)
    },
    // 提交表单
    onSubmit (value) {
      this.$apis.register(value).then(res => {
        if (res.data.code === '10002') {
          this.$toast('手机号已被注册')
        } else if (res.data.code === '10003') {
          this.$toast('该用户名已被注册')
        } else if (res.data.code === '10004') {
          this.$toast('请先获取验证码')
        } else if (res.data.code === '10005') {
          this.$toast('验证码错误')
        } else {
          // 注册成功
          this.timer = setInterval(() => {
            if (this.skip !== 0) {
              this.$toast('注册成功,' + this.skip + 's后跳转到登陆页面')
            } else {
              this.$router.replace('/login')
              clearInterval(this.timer)
            }
            this.skip--
          }, 1000)
        }
      })
    },
    // 跳转到登陆页
    switchLogin () {
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
  .switch {
    width: 100%;
    text-align: center;
    color: #e0e0e0;
  }
</style>
