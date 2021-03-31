<template>
  <div class="box">
    <!-- 头部 -->
    <header class="header">
      <van-nav-bar
        title="我的"
        left-arrow
        @click-left="onClickLeft"
        @click-right="showPop"
      >
        <template #right>
          <van-icon name="weapp-nav"/>
        </template>
      </van-nav-bar>
      <div class="pop">
        <notice-list :show.sync="pop"/>
      </div>
    </header>
    <div class="content">
      <!-- 用户信息 -->
      <div class="user">
        <div class="layout f">
           <div class="user-left f">
            <div class="user-img">
              <img src="http://gw.alicdn.com/sns_logo/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_100x100q90_.webp" alt="">
            </div>
            <div class="user-name">
              <span v-text="userName"></span>
            </div>
          </div>
          <div class="user-right">
            <div @click="toSet" class="user-set iconfont icon-icon_setting"></div>
          </div>
        </div>
        <section class="DFrameLayout f">
          <div class="DFrameLayout-list">
            <p>0</p>
            <div>收藏夹</div>
          </div>
          <div class="DFrameLayout-list">
            <p>0</p>
            <div>关注店铺</div>
          </div>
          <div class="DFrameLayout-list">
            <p>0</p>
            <div>足迹</div>
          </div>
          <div class="DFrameLayout-list">
            <p>0</p>
            <div>红包卡券</div>
          </div>
        </section>
      </div>
      <!-- 订单 -->
      <div class="my_cell">
        <div class="rel_container">
          <div class="my_order_entrance">
            <p class="iconfont icon-xinyongqia"></p>
            <span class="entrance_text">待付款</span>
          </div>
          <div class="my_order_entrance">
            <p class="iconfont icon-baoguo"></p>
            <span class="entrance_text">待收货</span>
          </div>
          <div class="my_order_entrance">
            <p class="iconfont icon-shenqingshouhou"></p>
            <span class="entrance_text">退换/售后</span>
          </div>
          <div class="my_order_entrance">
            <p class="iconfont icon-dingdan"></p>
            <span class="entrance_text">全部订单</span>
          </div>
        </div>
      </div>
      <!-- 资产 -->
      <div class="my_cell money">
        <div class="rel_container">
          <div class="my_order_entrance">
            <p class="my_order_text">0</p>
            <span>优惠券</span>
          </div>
          <div class="my_order_entrance">
            <p class="my_order_text">1万+</p>
            <span>信用额度</span>
          </div>
          <div class="my_order_entrance">
            <p class="my_order_text">319</p>
            <span>哈豆</span>
          </div>
          <div class="my_order_entrance">
            <p class="my_order_text">0</p>
            <span>红包</span>
          </div>
          <div class="my_order_entrance">
            <p class="iconfont icon-qianbao"></p>
            <span>我的资产</span>
          </div>
        </div>
      </div>
      <!-- 工具与服务 -->
      <div class="activity-wrap">
        <div class="activity-title">工具与服务</div>
        <div class="tools_container">
          <div class="tool_item">
            <div class="tools_icon1 tools_iocn"></div>
            <span>客户服务</span>
          </div>
          <div class="tool_item">
             <div class="tools_icon2 tools_iocn"></div>
            <span>我的预约</span>
          </div>
          <div class="tool_item">
             <div class="tools_icon3 tools_iocn"></div>
            <span>我的问答</span>
          </div>
          <div class="tool_item">
             <div class="tools_icon4 tools_iocn"></div>
            <span>闲置换钱</span>
          </div>
          <div class="tool_item">
             <div class="tools_icon5 tools_iocn"></div>
            <span>高价回收</span>
          </div>
          <div class="tool_item">
             <div class="tools_icon6 tools_iocn"></div>
            <span>定期购</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoticeList from '../../components/noticeList'
export default {
  name: 'Profile',
  data () {
    return {
      pop: false,
      userName: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    showPop () {
      this.pop = !this.pop
    },
    // 跳转到设置页
    toSet () {
      this.$router.push('/profile/set')
    }
  },
  mounted () {
    const _uuid = localStorage.getItem('_uuid')
    this.$apis.getUserInfo({
      user_id: _uuid
    }).then(res => {
      this.userName = res.data.data.user_name
    })
  },
  components: {
    NoticeList
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('loginState') === 'true') {
      next()
    } else {
      next('/login')
    }
  }
}
</script>

<style lang='stylus' scoped>
  .f
    display flex
  .header
    position relative
    .pop
      position absolute
      right  .07rem
      top 0.4rem
  .content
    .user
      box-sizing border-box
      padding: .2rem .18rem 0
      height 1.6rem
      width 100%
      background-color #FF5000
      background-image linear-gradient(to right, #FD9126, #FF5000);
      .layout
        width 100%
        justify-content space-between
        .user-img
          width .49rem
          height .49rem
          img
            width 100%
            height 100%
            border-radius 50%
        .user-name
          font-size .2rem
          color #eee
          margin-left .1rem
          font-weight 600
        .user-right
          color #eee
          .user-set
              font-size .2rem
      .DFrameLayout
        justify-content center
        align-items center
        width 100%
        height .8rem
        margin 0 auto
        .DFrameLayout-list
          flex 1
          color #fff
          text-align center
          p
            font-size .16rem
          div
            margin-top .05rem
            font-size .12rem
    .my_cell
      position relative
      top -.12rem
      background #fff
      border-radius .15rem .15rem .1rem .1rem
      height .88rem
      .rel_container
        height 100%
        display flex
        align-items center
        text-align center
        justify-content center
        .my_order_entrance
          flex .9
          font-size .12rem
          color #262626
          p
            font-size .3rem
        .my_order_entrance:last-child
          color #E84E5F
          flex 1
          position relative
          span
            color #262626
            bottom -.05rem
            position relative
          &::before
            content ''
            width .03rem
            height .5rem
            background linear-gradient(to right, #fff, #f1f1f1)
            position absolute
            left 0
            top 0
          &::after
            content ''
            width .12rem
            height .12rem
            clip-path polygon(50% 0%, 50% 100%, 100% 50%, 50% 0%)
            background linear-gradient(to right, #efeff1 20%, #fff)
            position absolute
            left -.03rem
            top calc(50% - .06rem)
    .money
      margin-top .1rem
      .my_order_entrance
        p.my_order_text
          font-size .19rem
          font-weight 600
    .activity-wrap
      background #fff
      border-radius 15px
      padding-bottom .1rem
      .activity-title
        height .38rem
        font-weight 600
        font-size .14rem
        border-bottom 1px solid #F8F8F8
        line-height .38rem
        padding-left .18rem
      .tools_container
        display flex
        flex-wrap wrap
        .tool_item
          text-align center
          padding-top .12rem
          width 25%
          flex-shrink 0
          .tools_iocn
            display block
            margin 0 auto 6px
            width 35px
            height 35px
          .tools_icon1
            background url('https://img12.360buyimg.com/img/s70x70_jfs/t1/135809/4/7014/5528/5f35369dE8aff3fab/f4b952a87ea33ae4.png.webp') 0px 0px / 100% 100% no-repeat
          .tools_icon2
            background url('https://img12.360buyimg.com/img/s70x70_jfs/t1/143427/38/5400/4413/5f350384Edba4458b/bfcb210d2110a7d8.png.webp') 0px 0px / 100% 100% no-repeat
          .tools_icon3
            background url('https://img12.360buyimg.com/img/s70x70_jfs/t1/138657/15/5351/5178/5f3504ceE3707cfd0/bc8ff48c8edcc5b1.png.webp') 0px 0px / 100% 100% no-repeat
          .tools_icon4
            background url('https://img12.360buyimg.com/img/s70x70_jfs/t1/112188/32/14787/4956/5f3509edE376c2ddb/d716c6822cafa2b6.png.webp') 0px 0px / 100% 100% no-repeat
          .tools_icon5
            background url('https://img12.360buyimg.com/img/s70x70_jfs/t1/126073/34/9502/6741/5f350800Ee00c0d35/43485badf62439e9.png.webp') 0px 0px / 100% 100% no-repeat
          .tools_icon6
            background url('https://img12.360buyimg.com/img/s72x72_jfs/t1/116298/31/20078/7059/5f84162fE19dfc541/2a00f0157c5128a2.png.webp') 0px 0px / 100% 100% no-repeat
</style>
