<template>
  <div class="goodsItem">
    <div class="goodsImg">
      <img :src="goodsImg" alt="">
    </div>
    <span class="title">
      <div class="tag" v-text="goodsTag"></div>
      <span v-text="goodsTitle"></span>
    </span>
    <div class="goodsBottom">
      <div class="goodsBottom-l">
        <span class="symbol">¥</span>
        <span class="goodsPrice" v-text="goodsPrice"></span>
      </div>
      <div class="goodsBottom-r">
        <div class="similar">看相似</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsItem',
  props: {
    goodsImg: String,
    goodsTag: String,
    goodsTitle: String,
    goodsPrice: Number
  }
}
</script>

<style lang="stylus" scoped>
  .goodsItem
    width 1.73rem
    border-radius .07rem
    background #fff
    overflow hidden
    margin 0 .05rem .1rem 0
    .goodsImg
      width 1.73rem
      height 1.73rem
      img
        width 100%
        height 100%
    .title
      font-size .13rem
      color #1a1a1a
      font-size .12rem
      margin-left .05rem
      height .31rem
      overflow: hidden
      text-overflow: ellipsis
      display: -webkit-box
      display: -moz-box
      display: -o-box
      display: -ms-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 2
      line-height: .15rem
      margin .05rem 0 .03rem
      padding 0 .04rem
      .tag
        background #e43130
        display inline-block
        font-size .12rem
        padding .01rem .03rem
        color #fff
        border-radius .05rem
        margin-right .05rem
    .goodsBottom
      display flex
      height: .5rem
      align-items center
      justify-content space-between
      .goodsBottom-l
        padding-left .05rem
        line-height .25rem
        height 100%
        color #e43130
        .symbol
          font-size .12rem
        .goodsPrice
          font-size .16rem
          margin-left .05rem
      .goodsBottom-r
        height .5rem
        line-height .25rem
        .similar
          color gray
          padding 0 .05rem
          border-top-left-radius .1rem
          border-bottom-left-radius .1rem
          background #f0f2f5
          font-size .12rem
          z-index 11
</style>
