<template>
  <div class="box">
    <header class="header">
      <van-search
        shape="round"
        placeholder="请输入搜索关键词"
        @click="toSearch"
      />
      <div class="menu" @click="toHome">
        取消
      </div>
    </header>
    <div class="content">
      <van-sidebar v-model="activeKey">
        <div v-for="(item,i) in categories" :key="i">
          <van-sidebar-item :title=item />
        </div>
      </van-sidebar>
      <div class="classList">
        <van-grid :border="false" :gutter="12" :column-num="3">
          <van-grid-item
            :icon="item.goods_pic"
            :text="item.goods_title"
            v-for="item in caches[activeKey]"
            :key="item.goods_id"
          />
        </van-grid>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search, Sidebar, SidebarItem, Icon, ShareSheet, Grid, GridItem } from 'vant'
import { getCategories } from '../../api'
import { mapState, mapActions, mapMutations } from 'vuex'

Vue.use(Search)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Icon)
Vue.use(ShareSheet)
Vue.use(Grid)
Vue.use(GridItem)
export default {
  name: 'Kind',
  data () {
    return {
      activeKey: 0,
      categories: []
    }
  },
  computed: {
    ...mapState('goods', ['caches']),
    params () {
      return {
        i: this.activeKey,
        cate: this.categories[this.activeKey]
      }
    }
  },
  watch: {
    activeKey () {
      // 判断数据是否被渲染过
      if (!this.caches[this.activeKey]) {
        this.getGoodsOfCate(this.params)
      }

      // 直接渲染
      // getCateList({
      //   cate: this.categories[this.activeKey]
      // }).then(item => {
      //   this.kindList = item.data.data
      // })
    }
  },
  methods: {
    ...mapMutations('goods', ['clearCache']),
    ...mapActions('goods', ['getGoodsOfCate']),
    toHome () {
      this.$router.push('/home')
    },
    toSearch () {
      this.$router.push('/search')
    }
  },
  beforeDestroy () {
    this.clearCache()
  },
  async mounted () {
    // 请求左侧分类列表
    const list = await getCategories()
    this.categories = list.data.data

    // 通过vuex内的actions请求右侧数据栏
    this.getGoodsOfCate(this.params)

    // 普通方式请求右侧数据栏
    // getCateList({
    //   cate: this.categories[this.activeKey]
    // }).then(res => {
    //   // console.log(res.data.data)
    //   this.kindList = res.data.data
    // })
  }
}
</script>
<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 0.4rem;
    display: flex;
    align-items: center;
    padding: 0.1rem 0 0.1rem;
    background-color: #fff;
    border-bottom: 1px solid #efefef;
    .van-search {
      flex: 1;
    }
    .menu {
      width: 0.3rem;
      font-size: 0.1rem;
      color: #333333;
    }
  }
  /deep/ .van-grid-item__icon {
    width: .36rem;
    height: .36rem;
    border-radius: .05rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  /deep/ .van-grid-item__text {
    height: .2rem;
    width: .6rem;
    font-size: .12rem;
    line-height: .2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }
  .content {
    display: flex;
  }
  .classList {
    overflow-y: auto;
    flex: 1;
    text-align: center;
    margin-top: .2rem;
  }
   .van-sidebar {
      min-width: 80px
    }
</style>>
