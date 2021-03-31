<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="购物车"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="content">
      <template v-if="!showEmpty">
        <van-swipe-cell
          v-for="(item, index) of cartlist"
          :key="item.cartid"
        >
          <van-card
            :price="item.goods_price"
            :title="item.goods_title">
            <template #num>
              <van-stepper
                v-model="item.num"
                disable-input :name="item.cart_id"
                @change="changeNum(item)"
              />
            </template>
            <template #thumb>
              <van-checkbox v-model="item.checked" @click="selectItem(item)"/>
              <van-image  fit="contain" :src="item.goods_pic"/>
            </template>
          </van-card>
          <template #right>
            <van-button
              square text="删除"
              type="danger"
              class="delete-button"
              @click="deleteCart(item, index)"
            />
          </template>
        </van-swipe-cell>
        <van-submit-bar
         :disabled="!isChecked"
         :price="totalPrice * 100"
         :button-text="'去结算'+'('+totalNum+')'"
         @submit="onSubmit">
          <van-checkbox
            v-model="selectAll"
            @click="selectdItemAll"
          >
            全选
          </van-checkbox>
          <template #tip v-if="!isChecked">
            <span class="changeAddr" @click="onClickEditAddress">修改地址</span>
          </template>
          <template #tip v-else>
            <span v-text="address"></span>：
            <span v-text="name"></span>
            <span class="changeAddr" @click="onClickEditAddress">修改地址</span>
          </template>
        </van-submit-bar>
      </template>
      <template v-else>
        <van-empty
          image="http://img11.360buyimg.com/jdphoto/s180x180_jfs/t18163/292/540553659/74408/adeb7463/5a93c51cN3bb5e37b.png"
          description="购物车空空如也"
        >
          <van-button
            round
            type="danger"
            class="button"
            @click="toHome"
          >
            去逛逛
          </van-button>
        </van-empty>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopCart',
  data () {
    return {
      cartlist: [],
      selectAll: false, // 全选
      showEmpty: false, // 是否显示空状态
      isChecked: false, // 是否勾选商品
      address: '', // 地址
      name: '' // 收货人
    }
  },
  created () {
    this.init()
  },
  computed: {
    // 总数量
    totalNum () {
      return this.cartlist.reduce((sum, item) => {
        return item.checked ? sum + item.num : sum
      }, 0)
    },
    // 总价格
    totalPrice () {
      return this.cartlist.reduce((sum, item) => {
        return item.checked ? sum + item.num * item.goods_price : sum
      }, 0)
    }
  },
  watch: {
    totalPrice () {
      this.totalPrice > 0 ? this.isChecked = true : this.isChecked = false
    }
  },
  // 组件内的守卫
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('loginState') === 'true') {
      next()
    } else {
      next('/login')
    }
  },
  methods: {
    // 获取购物车列表数据
    init () {
      this.$apis.getShopCart({
        user_id: localStorage.getItem('_uuid')
      }).then(res => {
        if (res.data.data.length !== 0) {
          const token = localStorage.getItem('SESSDATA')
          if (!token) return
          this.cartlist = res.data.data
          this.showEmpty = false
        } else {
          this.showEmpty = true
        }
        const flag = this.cartlist.every(item => {
          return item.checked
        })
        this.selectAll = flag
        this.flag = flag
      })
      this.$apis.getAddr({
        user_id: localStorage.getItem('_uuid')
      }).then(res => {
        const flag = res.data.data.find(ele => ele.checked)
        if (flag) {
          const info = res.data.data.find(ele => ele.checked)
          this.address = info.consignee
          this.name = info.region
        } else {
          this.address = '请选择一个收获地址'
        }
      })
    },
    // 修改收货地址
    onClickEditAddress () {
      this.$router.push('/changeAddress')
    },
    // 返回上一页
    onClickLeft () {
      this.$router.back()
    },
    // 进入详情页
    // openDetail (item) {
    //   this.$router.push('/details/' + item)
    // },
    // 单选
    selectItem (item) {
      this.$apis.selectItemChecked({
        cart_id: item.cart_id,
        checked: item.checked
      }).then(() => {
        if (item.checked) {
          const val = !this.cartlist.find(item => {
            return !item.checked
          })
          this.selectAll = val
          this.flag = val
        } else {
          this.selectAll = false
          this.flag = false
        }
      })
    },
    // 全选
    selectdItemAll () {
      this.flag = !this.flag
      this.selectAll = this.flag
      this.$apis.selectItemCheckedAll({
        user_id: localStorage.getItem('_uuid'),
        checked: this.flag
      }).then(() => {
        this.cartlist.map(item => {
          item.checked = this.selectAll
        })
      })
    },
    // 回到首页
    toHome () {
      this.$router.push('/home')
    },
    // 删除商品
    deleteCart (item, index) {
      this.$dialog.confirm({
        message: '确认要删除此商品？'
      }).then(() => {
        this.$apis.deleteShopCart({
          cart_id: item.cart_id
        }).then(() => {
          // 移除商品列表
          this.cartlist.splice(index, 1)
          if (this.cartlist.length === 0) {
            this.showEmpty = true
          }
          this.init()
        })
      }).catch(() => {})
    },
    // 提交订单
    onSubmit () {
      // console.log(this.cartlist)
      const buyList = this.cartlist.filter(item => item.checked)
      this.$dialog.confirm({
        message: '是否要购买这些商品？'
      }).then(() => {
        buyList.forEach((ele, idx) => {
          this.$apis.generateOrder({
            user_id: ele.user_id,
            goods_id: ele.goods_id,
            num: ele.num
          }).then(() => {
            this.$apis.deleteShopCart({
              cart_id: ele.cart_id
            }).then(() => {
              this.$toast('剁手成功')
              // 移除商品列表
              this.cartlist.splice(idx, 1)
              if (this.cartlist.length === 0) {
                this.showEmpty = true
              }
              this.init()
            })
          })
        })
      }).catch(() => {})
    },
    // 改变商品数量
    changeNum (detail) {
      // console.log(detail)
      this.$apis.updateShopCart({
        num: detail.num,
        cart_id: detail.cart_id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    padding-top: 0.1rem;
    margin: 0 0 0.5rem;
    .van-card {
      margin: 0.08rem 0.05rem 0.05rem;
      border-radius: .1rem;
      .van-card__thumb {
        display: flex;
        padding-right: 0.1rem;
        .van-checkbox{
          width: 20px;
          height: 100%;
          padding-right: 10px;
        }
        .van-image {
          width: 0.8rem;
        }
      }
    }
    @supports (bottom: env(safe-area-inset-bottom)){  //适配iPhoneX底部区域
      .van-submit-bar{
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
      }
    }
  }
  .delete-button {
    height: 100%;
  }
  .van-submit-bar__tip{
    overflow: hidden;
    .changeAddr {
      color: #1989fa;
      float: right;
    }
  }
  .van-card__price {
    color: #f00;
  }
  .button {
    font-size: 0.12rem;
    height: .3rem;
  }
</style>>
