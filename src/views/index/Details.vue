<template>
  <div class="box">
    <header>
      <transition name="van-fade">
        <div class="detailHeader" v-show="showTag">
          <div class="back" @click="back">
            <van-icon name="arrow-left" />
          </div>
          <div class="moreNav" @click="showShare = true">
            <van-icon name="weapp-nav"/>
          </div>
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
          />
        </div>
      </transition>
      <transition name="van-fade">
        <div class="detailHeader ok" v-show="!showTag">
          <div class="back ok" @click="back">
            <van-icon name="arrow-left" />
          </div>
          <ul class="detailTag">
            <li class="active">商品</li>
            <li>评价</li>
            <li>详情</li>
            <li>推荐</li>
          </ul>
          <div class="moreNav">
            <van-icon name="weapp-nav"/>
          </div>
        </div>
      </transition>
    </header>
    <div class="content" ref="scrollShow">
      <!-- 图片预览 -->
      <div class="previewImage" @click="proviewImg">
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" @change="onChange">
          <van-swipe-item v-for="(item, index) in imagesList" :key="index">
            <van-image height="375px" width="100%" :src="item" fit="fill"/>
          </van-swipe-item>
          <!-- 轮播图指示器 -->
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/{{ imagesList.length }}
            </div>
          </template>
        </van-swipe>
      </div>
      <!-- 价格 -->
      <section class="buy_area">
        <div class="priceWarp">
          <div class="left">
            {{price}}
          </div>
          <div class="right">
            <!-- 降价提醒
            <div class="reminder">
              <span class="iconfont icon-jiageguanxiguanli"></span>
              <p>降价提醒</p>
            </div> -->
            <!-- 收藏 -->
            <div class="collection" @click="collect">
              <van-goods-action-icon :icon="icon" :text="text" />
            </div>
          </div>
        </div>
        <!-- 标题 -->
        <div class="goods_name">
          <van-tag mark type="danger">{{brand}}</van-tag>{{title}}
        </div>
        <!-- 描述 -->
        <div class="goods_desc van-multi-ellipsis--l3">{{desc}}</div>
      </section>
    </div>
    <!-- 详情页底部 -->
    <van-goods-action safe-area-inset-bottom>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="toShopcart()"/>
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCartFn()"/>
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import vue from 'vue'
import { ImagePreview } from 'vant'

vue.use(ImagePreview)
export default {
  props: ['goods_id'],
  name: 'detail',
  data () {
    return {
      current: 0, // 轮播图索引
      brand: '',
      desc: '',
      disc: '',
      pic: '',
      price: 0,
      title: '',
      rating: '',
      sales: 0,
      stock: 0,
      text: '收藏',
      icon: 'star-o',
      imagesList: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      showTag: true,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  mounted () {
    const collectStr = localStorage.getItem('collection') || '[]'
    const collectArr = JSON.parse(collectStr)
    const i = collectArr.indexOf(this.goods_id)
    if (i === -1) {
      collectArr.splice(i, 1)
      this.icon = 'star-o'
      this.text = '收藏'
    } else {
      collectArr.unshift(this.goods_id)
      this.icon = 'star'
      this.text = '已收藏'
    }
    this.$apis.getGoodsDetailsData({
      goods_id: this.goods_id
    }).then(res => {
      this.brand = res.data.data[0].goods_brand
      this.desc = res.data.data[0].goods_desc
      this.disc = res.data.data[0].goods_disc
      this.pic = res.data.data[0].goods_pic
      this.price = res.data.data[0].goods_price
      this.rating = res.data.data[0].goods_rating
      this.sales = res.data.data[0].goods_sales
      this.stock = res.data.data[0].goods_stock
      this.title = res.data.data[0].goods_title
      this.imagesList.unshift(this.pic)
    })
    this.$refs.scrollShow.addEventListener('scroll', () => {
      // console.log(this.$refs.scrollShow.scrollTop)
      if (this.$refs.scrollShow.scrollTop > 40) {
        this.showTag = false
      } else {
        this.showTag = true
      }
    })
  },
  methods: {
    // 改变指示器索引
    onChange (index) {
      this.current = index
    },
    // 点击预览图片
    proviewImg () {
      ImagePreview({
        images: this.imagesList,
        startPosition: this.current
      })
    },
    onSelect () {
      this.showShare = false
    },
    // 加入购物车
    addCartFn () {
      // 判断登陆状态
      if (localStorage.getItem('loginState') === 'true' && localStorage.getItem('SESSDATA')) {
        this.$apis.addCart({
          user_id: localStorage.getItem('_uuid'),
          goods_id: this.goods_id,
          num: 1
        }).then(res => {
          switch (res.data.code) {
            case '10009':
              this.$toast('该商品不存在')
              break
            case '10011':
              this.$toast('库存不足')
              break
            default:
              this.$toast('加入购物车成功')
          }
        })
      } else {
        this.$toast('请先登录')
        this.$router.push('/login')
      }
    },
    // 进入购物车
    toShopcart () {
      this.$router.push('/shopcart')
    },
    // 返回上一页
    back () {
      this.$router.back()
    },
    // 收藏
    collect () {
      if (localStorage.getItem('loginState')) {
        const collectStr = localStorage.getItem('collection') || '[]'
        const collectArr = JSON.parse(collectStr)
        const i = collectArr.indexOf(this.goods_id)
        if (i === -1) {
          collectArr.unshift(this.goods_id)
          this.icon = 'star'
          this.text = '已收藏'
        } else {
          collectArr.splice(i, 1)
          this.icon = 'star-o'
          this.text = '收藏'
        }
        localStorage.setItem('collection', JSON.stringify(collectArr))
      } else {
        this.$toast('请先登陆')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .detailHeader {
    width: 100%;
    position: absolute;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    font-size: 0.16rem;
    color: #ffffff;
    .detailTag {
      display: flex;
      flex: 1;
      color: rgb(44, 41, 41);
      align-items: center;
      justify-content: center;
      font-size: 0.14rem;
      .active {
        font-weight: bold;
        border-bottom: 1px solid #f00;
      }
    }
    .back {
      width: 0.2rem;
      height: 0.2rem;
      margin: 0.05rem;
      padding: 0.05rem;
      background-color: rgba(0,0,0,.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
     .moreNav {
      width: 0.2rem;
      height: 0.2rem;
      margin: 0.05rem;
      padding: 0.05rem;
      background-color: rgba(0,0,0,.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .ok {
    background-color:#fff;
    border-bottom: #efefef 1px;
    li {
      margin: 0 10px;
    }
    .back,.moreNav {
      background-color: #fff;
      color: #252525;
    }
  }
  .proviewImage {
    height: 3.75rem;
    .my-swipe {
      height: 3.75rem;
      width: 100%;
      overflow: hidden;
    }
  }
  .van-coupon-cell {
    margin: .1rem 0;
  }
  .van-share-sheet__cancel {
    color: #3330
  }
  .content {
    height: calc(100% - 50px);
  }
  /deep/.van-share-sheet__cancel{
    color: #333;
  }
  /deep/ .van-icon-star.van-goods-action-icon__icon {
    color: #f00;
  }
  .van-goods-action {
    height: 0.5rem;
    position: relative;
  }
  .custom-indicator {
    position: absolute;
    color: #fff;
    right: 0;
    bottom: 10px;
    padding: 4px 10px;
    font-size: 12px;
    border-radius: 10px 0 0 10px;
    background: rgba(0, 0, 0, 0.3);
  }
  .buy_area {
    background-color: #fff;
    border-radius: 0 0 15px 15px;
    padding: 0.1rem;
    height: 1000px;
    .priceWarp {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .left {
        font-size: 0.26rem;
        color: #f00;
        position: relative;
        margin-left: 0.1rem;
        font-weight: bold;
      }
      .left::before {
        content: '￥';
        position: absolute;
        left: -0.14rem;
        bottom: 0.06rem;
        font-size: 0.16rem;
        font-weight: normal;
      }
      .right {
        display: flex;
        justify-content: center;
        .reminder {
          text-align: center;
          margin-right: .05rem;
        }
        .collection {
          text-align: center;
        }
      }
    }
    .goods_name {
      padding: .1rem 0;
      font-size: .16rem;
      font-weight: bold;
    }
  }
</style>
