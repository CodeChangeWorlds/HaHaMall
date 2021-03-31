<template>
  <div class="mask" v-show="show" @click.self="close">
    <div class="noticeList">
      <div class="item" @click="toHome">
        <i class="iconfont icon-home"></i>
        <span>首页</span>
      </div>
      <div class="item" @click="toSearch">
        <i class="iconfont icon-fenleisousuo"></i>
        <span>分类搜索</span>
      </div>
      <div class="item" @click="toShopcart">
        <i class="iconfont icon-gouwuche"></i>
        <span>购物车</span>
      </div>
      <div class="item" @click="close">
        <i class="iconfont icon-wode"></i>
        <span>我的京东</span>
      </div>
      <div class="item">
        <i class="iconfont icon-liulanjilu"></i>
        <span>浏览记录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noticeList',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toHome () {
      this.$router.push('/home')
    },
    toSearch () {
      this.$router.push('/kind')
    },
    toShopcart () {
      this.$router.push('/shopcart')
    },
    close () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mask
    width 100vw
    height 100vh
    position fixed
    left 0
    top 0
    background rgba(0,0,0,0)
    z-index 666
    .noticeList
      background rgba(3,3,3,.9)
      width 1.40rem
      z-index 666
      position relative
      top .42rem
      left 2.31rem
      border-radius .1rem
      &::after
        content  ''
        position absolute
        right .13rem
        top -0.072rem
        background rgba(3,3,3,.9)
        display block
        width 15px
        height 15px
        clip-path: polygon(50% 0%, 100% 50%, 0% 50%, 0% 50%)
      .item
        overflow hidden
        width 1.40rem
        height .43rem
        user-select none
        color #fff
        display flex
        transition background .2s
        &:active
          background rgba(255,255,255,.3)
        i
          padding .11rem
          line-height .2rem
        span
          font-size 14px
          width 100%
          line-height .43rem
          border-bottom 1px solid hsla(0,0%,100%,.2)
</style>
