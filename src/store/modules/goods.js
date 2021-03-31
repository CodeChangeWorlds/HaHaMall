import { getCateList } from '../../api'

export default {
  namespaced: true,
  state: {
    caches: {}
  },
  mutations: {
    // 更新缓存
    updateCache (state, payload) {
      state.caches[payload.i] = payload.list
      // 解决引用数据类型变化了、但页面不更新的问题
      state.caches = JSON.parse(JSON.stringify(state.caches))
    },
    // 清除缓存
    clearCache (state) {
      state.caches = {}
    }
  },
  actions: {
    getGoodsOfCate (store, payload) {
      const params = {
        cate: payload.cate
      }
      getCateList(params).then(res => {
        // console.log(res.data.data)
        // 接收到数据后发送给mutations
        store.commit('updateCache', { i: payload.i, list: res.data.data })
      })
    }
  }
}
