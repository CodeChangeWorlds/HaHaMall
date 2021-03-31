<template>
  <div class="box">
    <header class="header">
      <van-nav-bar @click-left="openClass" @click-right="openProfile">
        <template #left>
          <van-icon name="wap-nav"/>
        </template>
        <template #title>
          <div class="searchBox" @click="openSearch">
            <van-icon name="search" />
            寻找宝贝店铺
          </div>
        </template>
        <template #right>
          <div v-if="!isLogin">登陆</div>
          <div v-else>
            <van-icon name="user-o"/>
          </div>
        </template>
      </van-nav-bar>
    </header>
    <div class="content" ref="scrollBackTop">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-swipe class="mySwipe" :autoplay="3000" indicator-color="red">
          <van-swipe-item v-for="item in bannerList" :key="item.bannerId">
            <van-image class="banner" :src="item.img" lazy-load/>
          </van-swipe-item>
        </van-swipe>
        <!-- 宫格列表 -->
        <van-grid :column-num="5" :border='false' :icon-size="24">
          <van-grid-item icon="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp" text="哈哈超市" />
          <van-grid-item icon="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png.webp" text="数码电器" />
          <van-grid-item icon="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png.webp" text="哈哈服饰" />
          <van-grid-item icon="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf344Ebec23ae8/59712d986b10bb0a.png.webp" text="哈哈生鲜" />
          <van-grid-item icon="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/116602/7/11200/3796/5efbf375Ebba41029/f07cc166f368fa05.png.webp" text="哈哈到家" />
          <van-grid-item icon="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/146390/3/1846/4909/5efbf39aEe5f5f797/300071558a9ab078.png.webp" text="充值缴费" />
          <van-grid-item icon="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/143365/25/1824/3716/5efbf3c0E5175e1fb/88f6227257a29f1d.png.webp" text="9.9元拼" />
          <van-grid-item icon="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/113589/24/11332/4897/5efbf3feE705d87db/e5c12d5e943266b9.png.webp" text="领券" />
          <van-grid-item icon="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/131663/33/3380/3674/5efbf50fEf79cf314/af4b57d2383e605d.png.webp" text="领金贴" />
          <van-grid-item icon="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/123730/37/5924/4189/5efbf567E0a226121/d04df7c74c87cf68.png.webp" text="Plus会员" />
        </van-grid>
        <div>
          <van-image src="https://img12.360buyimg.com/img/s750x70_jfs/t1/124583/37/16524/12470/5f9bc181E48c91215/cac00c52cb0b2fa4.png"/>
        </div>
        <!-- 商品列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了哦"
          :error.sync="error"
          :immediate-check="false"
          error-text="当前网络不给力，点击重新加载"
          @load="onLoad"
          :offset="-200"
        >
          <!-- 声明式路由跳转 -->
          <router-link
            class="goodsList"
            :to="{ name:'detail', params:{goods_id:item.goods_id}}"
            v-for="item in goodsList"
            :key="item.goods_id"
          >
            <goods-item
              lazy-load
              :goodsImg="item.goods_pic"
              :goodsTag="item.goods_tag"
              :goodsPrice="item.goods_price"
              :goodsTitle="item.goods_title"
            />
          </router-link>
        </van-list>
      </van-pull-refresh>
      <!-- 返回顶部 -->
      <div class="backtop" @click="toTop" v-show="showTop">
        <span class="iconfont icon-icon-test"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { GoodsItem } from '../../components'
export default {
  name: 'Home',
  components: {
    GoodsItem
  },
  data () {
    return {
      bannerList: [],
      goodsList: [],
      loading: false,
      error: false,
      finished: false,
      page: 1,
      refreshing: false,
      showTop: false,
      scroll: 0 // 保存页面滚动位置
    }
  },
  computed: {
    isLogin () { // 是否登陆
      if (localStorage.getItem('loginState') === 'true') {
        return true
      } else {
        return false
      }
    }
  },
  activated () {
    this.$refs.scrollBackTop.scrollTop = this.scroll
    // console.log(this.$refs.scrollBackTop.scrollTop)
  },
  methods: {
    onLoad () { // 上拉加载
      this.loading = true // 允许加载
      this.$apis.getGoodsData({
        page: this.page,
        cate: ''
      }).then(res => {
        this.loading = false // 结束加载
        this.page++
        if (res.data.data.length === 0) { // 到达数据底部,停止加载数据
          this.finished = true // 到达底部停止加载数据
        } else {
          const newArr = this.shuffle(res.data.data)
          this.goodsList = [...this.goodsList, ...newArr]
        }
      }).catch(() => {
        this.loading = false
        this.error = true
      })
    },
    // 打乱数组(洗牌算法)
    shuffle (arr) {
      arr = arr.slice(0)
      const newArr = new Array(arr.length)
      while (arr.length) {
        const rdm = Math.random() * arr.length >> 0
        newArr[arr.length - 1] = arr.splice(rdm, 1)[0]
      }
      return newArr
    },
    onRefresh () { // 下拉刷新
      this.refreshing = true
      this.init()
    },
    toTop () { // 回到顶部
      this.$refs.scrollBackTop.scrollTop = 0
      this.onRefresh()
    },
    openClass () { // 跳转到分类页面
      this.$router.push('/kind')
    },
    openProfile () { // 跳转到我的
      if (localStorage.getItem('loginState') === 'true') {
        this.$router.push('/profile')
      } else {
        this.$router.push('/login')
      }
    },
    openSearch () { // 跳转到搜索页
      this.$router.push('/search')
    },
    // 获取商品列表数据
    init () {
      this.$apis.getGoodsData({
        cate: '',
        pape: this.page
      }).then(res => {
        const newArr = this.shuffle(res.data.data)
        this.page = 1
        this.refreshing = false
        this.finished = false
        this.goodsList = newArr
      })
    }
  },
  mounted () {
    // 获取轮播图数据
    this.$apis.getBannerData().then(res => {
      this.bannerList = res.data.data
    })
    this.init()
    this.$refs.scrollBackTop.addEventListener('scroll', () => {
      this.scroll = this.$refs.scrollBackTop.scrollTop
      if (this.$refs.scrollBackTop.scrollTop > 350) {
        this.showTop = true
      } else {
        this.showTop = false
      }
    })
  }
}
</script>
<style lang="scss">
  .van-nav-bar__title {
    max-width: 80%;
  }
  .banner {
    width: 3.75rem;
    height: 1.5rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .van-nav-bar__left {
    color: #1989fa;
  }
  .van-nav-bar__right {
    color: #1989fa;
    font-size: 0.12rem;
    padding: 0 0.1rem;

    .van-icon,.van-icon-user-o {
      font-size: 0.14rem;
      padding: 0 0.05rem;
    }
  }
  .van-list {
    padding: 0 .1rem;
    display:  flex;
    flex-wrap: wrap;
    .goodsList {
      width: 1.73rem;
    }
    .goodsList:nth-child(2n-1) {
      margin-right: .09rem;
    }
  }
  .searchBox {
    background-color: #efefef;
    padding: 0.07rem 1rem;
    border-radius: 0.1rem;
    font-size: 0.12rem;
    color: #bdb6b6;
    display: flex;
    align-items: center;
    .van-icon {
      font-size: 0.18rem;
      color: #bebbbb;
    }
  }
 .mySwipe {
    height: 1.5rem;
    background-color: #efefef;
  }
  .van-grid {
    padding: 0.05rem;
  }
  .van-card__price {
    color: #f00;
  }
  .van-list__finished-text {
    width: 100%;
  }
  .backtop {
    position: fixed;
    right: 0.2rem;
    bottom: 0.8rem;
    width: 0.3rem;
    height: 0.3rem;
    background-color: rgba(0, 0, 0, .5);
    color: #f1f1f1;
    padding: .1rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .backtop span {
    font-size: 0.3rem;
  }
</style>
