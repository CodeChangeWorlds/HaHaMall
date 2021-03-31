<template>
  <div class="container">
    <header class="header">
      <van-search
        id="focus"
        v-model="value"
        @search="search"
        @cancel="onCancel"
        shape="round"
        show-action
        placeholder="请输入搜索关键词"
      />
    </header>
    <div class="content">
      <div class="hotSearch">
        <div class="title">热门搜索</div>
        <div
          class="iconfont"
          :class="tShow ? 'icon-yanjing' : 'icon-yanjing_bi'"
          @click="showTag"
        ></div>
      </div>
      <transition name="van-fade">
        <div class="tag" v-show="tShow">
          <van-tag plain @click="search('手机')">手机</van-tag>
          <van-tag plain @click="search('电脑')">电脑</van-tag>
          <van-tag plain @click="search('化妆品')">化妆品</van-tag>
          <van-tag plain @click="search('背包')">背包</van-tag>
          <van-tag plain @click="search('零食')">零食</van-tag>
        </div>
      </transition>
      <div class="hotSearch" v-show="hisTaggle">
        <div class="title">历史记录</div>
        <div class="iconfont icon-lajitong" @click="delHistroy"></div>
      </div>
      <div class="tag" v-show="hisTaggle">
        <van-tag plain
         v-for="(item,i) in historyList"
         :key='i'
         @click="search(item)"
        >
          {{item}}
        </van-tag>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      tShow: true,
      hisTaggle: true,
      historyList: []
    }
  },
  methods: {
    // 返回上一页
    onCancel () {
      this.$router.back(1)
    },
    // 显示隐藏标签
    showTag () {
      let taggle = this.tShow
      if (taggle) {
        taggle = 0
      } else {
        taggle = 1
      }
      this.tShow = !this.tShow
      localStorage.setItem('sbx_hot', taggle)
    },
    // 删除历史记录
    delHistroy () {
      this.$dialog.confirm({
        message: '确认要删除历史记录吗'
      })
        .then(() => {
          // on confirm
          localStorage.removeItem('hisList')
          this.hisTaggle = false
        })
        .catch(() => {
          // on cancel
        })
    },
    // 搜索
    search (val) {
      this.value = val
      const hisListStr = localStorage.getItem('hisList') || '[]'
      const searchStr = JSON.parse(hisListStr)
      const index = searchStr.indexOf(this.value)
      if (index === -1) {
        searchStr.unshift(val)
      } else {
        searchStr.splice(index, 1)
        searchStr.unshift(val)
      }
      this.historyList = searchStr
      localStorage.setItem('hisList', JSON.stringify(searchStr))
      this.$router.replace('/searchList?searchText=' + this.value)
    }
  },
  mounted () {
    document.querySelector('#focus').focus()
    const flag = localStorage.getItem('sbx_hot') || ''
    switch (flag) {
      case '0':
        this.tShow = false
        break
      case '1':
        this.tShow = true
        break
    }
    const hisListStr = localStorage.getItem('hisList') || '[]'
    const searchStr = JSON.parse(hisListStr)
    this.historyList = searchStr
    if (searchStr.length === 0) {
      this.hisTaggle = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 0.4rem;
  display: flex;
  align-items: center;
  margin: 10px 0;
  box-sizing: border-box;
  .van-search {
    flex: 1;
  }
  .cancel {
    width: 0.4rem;
    color: #747171;
  }
}
.hotSearch {
  display: flex;
  justify-content: space-between;
  margin: 0.05rem 0.2rem 0.2rem;
  align-items: center;
  .title {
    font-size: 0.15rem;
    font-weight: bold;
  }
  .icon-yanjing_bi {
    width: 0.26rem;
  }
}
.tag {
  margin: 0 0.2rem 0;
  .van-tag {
    border-radius: 0.2rem;
    padding: 0.04rem 0.12rem;
    margin: 0 0.1rem 0.1rem 0;
  }
}
</style>>
