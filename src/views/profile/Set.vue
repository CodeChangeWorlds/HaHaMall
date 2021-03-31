<template>
  <div class="set">
    <header class="header">
      <van-nav-bar
        title="账户设置"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="content">
      <!-- 管理我的账户 -->
      <section class="accountArea">
        <div class="account_title">
          <span>管理我的账户</span>
        </div>
        <div class="current_account f" @click="openUserInfo">
          <div class="current_account_avatar">
            <img src="https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png" alt="">
          </div>
          <div class="user_detail">
            <div class="gotoUserInfo">当前登陆</div>
            <div class="main_detail">
              <span class="user_name" v-text="phone"></span>
            </div>
            <div class="append_detail">
              用户名:<span class="user_pin" v-text="userName">11</span>
            </div>
          </div>
          <div class="iconfont icon-jiantou arraw"></div>
        </div>
      </section>
      <!-- 收货地址管理 -->
      <section class="account_manage">
        <div class="account_manage_item f" @click="openAddress">
          <div class="account_manage_text">收货地址管理</div>
          <div class="account_manage_local">
            <span>管理我的地址</span>
            <span class="iconfont icon-jiantou"></span>
          </div>
        </div>
      </section>
      <!-- 账户 -->
      <section class="account_manage">
        <div class="account_manage_item f">
          <div class="account_manage_text">账户与安全</div>
          <div class="account_manage_local">
            <span>密码/实名认证等管理</span>
            <span class="iconfont icon-jiantou"></span>
          </div>
        </div>
        <div class="account_manage_item f">
          <div class="account_manage_text">支付密码</div>
          <div class="account_manage_local">
            <span>已设置</span>
            <span class="iconfont icon-jiantou"></span>
          </div>
        </div>
      </section>
      <!-- 客服 -->
      <section class="account_manage">
        <div class="account_manage_item f">
          <div class="account_manage_text">联系客服</div>
          <div class="account_manage_local">
            <span>即时解答用户难题</span>
            <span class="iconfont icon-jiantou"></span>
          </div>
        </div>
        <div class="account_manage_item f">
          <div class="account_manage_text">切换站点</div>
          <div class="account_manage_local">
            <span class="iconfont icon-jiantou"></span>
          </div>
        </div>
      </section>
      <!-- 退出登陆 -->
      <div class="userChange">
        <div class="switchUser" @click="changeUser">切换账号</div>
        <div class="loginOut" @click="loginOut">退出登陆</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Set',
  data () {
    return {
      userName: '',
      phone: ''
    }
  },
  mounted () {
    const _uuid = localStorage.getItem('_uuid')
    this.$apis.getUserInfo({
      user_id: _uuid
    }).then(res => {
      // 获取用户名
      this.userName = res.data.data.user_name
      this.phone = res.data.data.user_tel
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 切换账号
    changeUser () {
      this.$router.replace('/login')
      localStorage.clear()
    },
    // 切换账号
    loginOut () {
      this.$router.replace('/home')
      localStorage.clear()
    },
    // 打开用户详细信息页
    openUserInfo () {
      this.$router.push('/profile/set/userInfo')
    },
    // 打开收货地址列表
    openAddress () {
      this.$router.push('/changeAddress')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .f
    display flex
  .content
    background #F7F7F7
    height 93vh
    .accountArea
      background #fff
      padding .12rem .1rem .12rem
      .account_title
        font-size .16rem
        color #333
      .current_account
        margin-top .1rem
        padding .2rem .2rem .15rem
        border 1px solid #FF9DA3
        background #FFF9F9
        border-radius .15rem
        overflow hidden
        .current_account_avatar
          width .45rem
          height .45rem
          margin-right .1rem
          flex-shrink 0
          img
            width 100%
            height 100%
        .user_detail
          font-size .12rem
          position relative
          margin-top .04rem
          width 100%
          color #333
          .gotoUserInfo
            position absolute
            right -.38rem
            top -.24rem
            background #FFE4E4
            color #E7235B
            font-size .12rem
            padding 0 .1rem .04rem
            border-radius 0 0 0 .1rem
          .main_detail
            margin-bottom .05rem
        .arraw
          align-self center
          color #fcc
          font-size .18rem
    .account_manage
      background #fff
      margin .15rem 0
      justify-content space-between
      border-radius .1rem
      line-height .44rem
      .account_manage_text
        margin-left .1rem
      .account_manage_local
        font-size .12rem
        color #999
        .icon-jiantou
          font-size .12rem
          margin 0 .1rem
      .account_manage_item
        border-bottom 1px solid #F2F2F2
        justify-content space-between
        transition background .3s
        &:active
          background #eee
    .userChange
      font-size .12rem
      width 100%
      text-align center
      user-select none
      .switchUser
        width 100%
        line-height .44rem
        background #fefefe
        color #343434
        &:active
          background #eee
          color #999
      .loginOut
        margin-top .2rem
        line-height .44rem
        background #E61F1C
        color #efefef
        transition all .2s
        &:active
          background #fff
          color #999
</style>
