<template>
  <div>
     <!-- 顶部导航栏 -->
    <van-nav-bar
      title="登陆"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 注册表单 -->
    <van-form  @submit="onSubmit">
      <van-field
        :right-icon="loginTip"
        clearable
        v-model="loginname"
        name="login_name"
        placeholder="用户名/手机号"
      />
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
          登陆
        </van-button>
      </div>
    </van-form>
    <div class="switch" @click="switchReg()">没有账号？立即注册</div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      loginname: '',
      password: '',
      btnClick: false
    }
  },
  computed: {
    loginTip () {
      if (this.loginname.length >= 2) {
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
      if (this.loginTip === 'success' && this.passwordTip === 'success') {
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
    // 提交表单
    onSubmit (value) {
      // 登陆并返回token信息及登陆状态
      this.$apis.login(value).then(res => {
        if (res.data.code === '10006') {
          this.$toast('用户未注册')
        } else if (res.data.code === '10007') {
          this.$toast('密码错误')
        } else {
          this.$toast('登陆成功')
          localStorage.setItem('_uuid', res.data.data.user_id)
          localStorage.setItem('SESSDATA', res.data.data.token)
          localStorage.setItem('loginState', true)
          this.$router.back()
        }
      })
    },
    // 切换到登陆页面
    switchReg () {
      this.$router.replace('/register')
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
