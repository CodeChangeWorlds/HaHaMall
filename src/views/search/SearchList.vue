<template>
  <div>
    <van-search
      v-model="value"
      show-action
      shape="round"
      @cancel="onCancel"
      @search='onSearch'
      placeholder="请输入搜索关键词"
    />
    <template v-if='showEmpty'>
      <van-empty
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="未搜索到该商品" />
    </template>
    <template v-else>
      <van-sticky>
        <van-dropdown-menu
          duration='.3'
          active-color='#1989fa'
        >
          <van-dropdown-item v-model="price" :options="option1"/>
          <van-dropdown-item v-model="sales" :options="option2"/>
          <van-dropdown-item v-model="value3" title="筛选" ref="item">
            <label class="priceSection">价格区间</label>
            <div class="ipt">
              <input type="number" placeholder="最低价" class="priceIpt" v-model="min">
              <div class="line"></div>
              <input type="number" placeholder="最高价" class="priceIpt" v-model="max">
            </div>
            <div class="btn">
              <van-button plain round @click="onConfirm">
                取消
              </van-button>
              <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="filter" round>
                确认
              </van-button>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-sticky>
      <router-link :to="{ name:'detail', params:{goods_id:item.goods_id}}" v-for="item in goodsList" :key="item.goods_id">
        <van-card
          :price="item.goods_price"
          :desc="item.goods_desc"
          :title="item.goods_title"
          :thumb="item.goods_pic">
          <template #tags>
            <van-tag round plain type="warning">{{item.goods_brand}}</van-tag>
            <van-tag round plain type="warning">已售{{item.goods_sales}}</van-tag>
          </template>
        </van-card>
      </router-link>
    </template>
  </div>
</template>

<script>

export default {
  name: 'searchList',
  data () {
    return {
      min: '',
      max: '',
      value: '',
      search: false,
      price: 0,
      sales: 0,
      value3: 'a',
      option1: [
        { text: '价格排序', value: 0 },
        { text: '价格升序', value: 1 },
        { text: '价格降序', value: 2 }
      ],
      option2: [
        { text: '销量排序', value: 0 },
        { text: '销量升序', value: 1 },
        { text: '销量降序', value: 2 }
      ],
      goodsList: [],
      list: [],
      showEmpty: false
    }
  },
  watch: {
    price (val) {
      switch (val) {
        case 0:
          this.goodsList = this.list
          break
        case 1:
          this.goodsList.sort((a, b) => {
            return a.goods_price - b.goods_price
          })
          break
        case 2:
          this.goodsList.sort((a, b) => {
            return b.goods_price - a.goods_price
          })
          break
      }
    },
    sales (v) {
      switch (v) {
        case 0:
          this.goodsList = this.list
          break
        case 1:
          this.goodsList.sort((a, b) => {
            return a.goods_sales - b.goods_sales
          })
          break
        case 2:
          this.goodsList.sort((a, b) => {
            return b.goods_sales - a.goods_sales
          })
          break
      }
    }
  },
  created () {
    this.value = this.$route.query.searchText
    this.$apis.searchVal({ searchText: this.value }).then(res => {
      if (res.data.data) {
        this.goodsList = res.data.data
        this.list = JSON.parse(JSON.stringify(res.data.data))
        this.showEmpty = false
      } else {
        this.goodsList = []
        this.showEmpty = true
      }
    })
  },
  methods: {
    filter () {
      let arr = []
      this.goodsList = this.list
      if (this.max === '') {
        arr = this.goodsList.filter(item => {
          return item.goods_price >= this.min * 1
        })
      } else {
        arr = this.goodsList.filter(item => {
          return item.goods_price >= this.min * 1 && item.goods_price <= this.max * 1
        })
      }
      this.goodsList = arr
      this.onConfirm()
    },
    onConfirm () {
      this.$refs.item.toggle()
    },
    // 搜索
    onSearch () {
      if (this.$route.query.searchText === this.value) {
        return
      }
      this.$router.replace('/searchList?searchText=' + this.value)
      this.$apis.searchVal({ searchText: this.value }).then(res => {
        if (res.data.data) {
          this.goodsList = res.data.data
        } else {
          this.showEmpty = true
        }
      })
    },
    // 返回到上一页
    onCancel () {
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
   .van-card__price {
    color: #f00;
  }
  .van-card {
    border-bottom: 1px solid #cccccc;
    margin-bottom: 10px;
  }
  .van-tag {
    margin-right: 5px;
    padding: 2px 8px;
  }
  .priceSection {
    font-size: 18px;
    display: block;
    padding: 10px 0 10px 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }
  .priceIpt{
    padding: 10px;
    border: 0;
    width: 35%;
    flex: 1;
    appearance: none;
    text-align: center;
    border-radius: 3px;
    font-size: 14px;
    color: #333;
    background-color: #f7f7f7;
  }
  .btn{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ipt{
    display: flex;
    padding-bottom: 20px;
    margin: 0 20px;
  }
  input::placeholder {
      color: #DFDFDF;
  }
  .line{
    position: relative;
    width: 30px;
    height: 40px;
  }
  .line::after{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -5px;
    width: 10px;
    height: 1px;
    background-color: #e5e5e5;
  }
  .van-button{
    width: 140px;
    margin: 0 10px;
    margin-bottom: 10px;
  }
</style>
