<template>
  <footer class="footer">
    <ul>
      <router-link to="/home" tag="li">
        <span class="iconfont icon-home"></span>
        <p>首页</p>
      </router-link>
      <router-link to="/kind" tag="li">
        <span class="iconfont icon-leimupinleifenleileibie"></span>
        <p>分类</p>
      </router-link>
      <router-link to="/shopcart" tag="li">
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </router-link>
      <router-link to="/profile" tag="li">
        <span class="iconfont icon-wode"></span>
        <p>{{flag}}</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'tabBar',
  data () {
    return {
      flag: localStorage.getItem('loginState') === 'true' ? '我的' : '未登录'
    }
  }
}
</script>
<style lang="scss" scoped>
  .footer {
    background-color: #e1e1e1;
    height: 0.5rem;
    ul {
      display: flex;
      height: 100%;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);  // 将手机端点击产生的背景去除
        &.router-link-exact-active,.router-link-active {
          color: firebrick;
        }
        span {
          font-size: 0.2rem;
        }
        p {
          font-size: 0.12rem;
        }
      }
    }
  }
</style>
