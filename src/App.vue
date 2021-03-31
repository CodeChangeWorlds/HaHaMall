<template>
  <div class="container">
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>
<style lang='scss'>
  *{
    padding: 0;
    margin: 0;
    list-style: none;
    text-decoration: none;
  }
  @supports (bottom: env(safe-area-inset-bottom)){  //适配iPhoneX底部区域
    .footer{
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
  html,body,.container {
    height: 100%;
  }
  html {
    font-size: 26.666666667vw;
  }
  body {
    font-size: 14px;
  }
  @media all and (orientation: landscape){
    html {
      font-size: 100px;
    }
    .container {
      max-width: 640px;
      font-size: 16px;
      margin: 0 auto;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .box {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
      font-size: 0.12rem;
      background-color: #efefef;
      .header {
        height: 0.40rem;
      }
      .content {
        flex: 1;
        height: calc(100% - 0.5rem);
        overflow: auto;
      }
    }
  }
</style>
