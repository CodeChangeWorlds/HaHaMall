import Vue from 'vue'
import VueRouter from 'vue-router'
import tabBar from './../components/common/tabBar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 路由重定向
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '哈哈商城',
      keepAlive: true
    },
    components: { // 路由多命名路由
      default: () => import(/* webpackChunkName: "base" */ '../views/index/Home.vue'), // 路由懒加载
      footer: tabBar
    }
  },
  {
    path: '/kind',
    name: 'Kind',
    meta: {
      title: '分类'
    },
    components: {
      default: () => import(/* webpackChunkName: "base" */ '../views/classification/Kind.vue'),
      footer: tabBar
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    meta: {
      title: '购物车'
    },
    components: {
      default: () => import(/* webpackChunkName: "base" */ '../views/shopcart/ShopCart.vue')
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      title: '我的'
    },
    components: {
      default: () => import(/* webpackChunkName: "base" */ '../views/profile/Profile.vue'),
      footer: tabBar
    }
  },
  {
    path: '/details/:goods_id',
    name: 'detail',
    meta: {
      title: '商品详情'
    },
    components: {
      default: () => import(/* webpackChunkName: "base" */ '../views/index/Details.vue')
    },
    props: {
      default: true
    }
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/register/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登陆'
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/login/Login.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      title: '搜索'
    },
    component: () => import(/* webpackChunkName: "base" */ '../views/search/Search.vue')
  },
  {
    path: '/searchList',
    name: 'searchList',
    meta: {
      title: '搜索列表'
    },
    component: () => import(/* webpackChunkName: "base" */ '../views/search/SearchList.vue')
  },
  {
    path: '/profile/set',
    name: 'set',
    meta: {
      title: '个人设置'
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/profile/Set.vue')
  },
  {
    path: '/profile/set/userInfo',
    name: 'userInfo',
    meta: {
      title: '个人信息'
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/profile/UserInfo.vue')
  },
  {
    path: '/changeAddress',
    name: 'changeAddress',
    meta: {
      title: '修改地址'
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/shopcart/ChangeAddress.vue')
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    meta: {
      title: '新增地址'
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/shopcart/AddAddress.vue')
  },
  {
    path: '/editAddress/:id',
    name: 'editAddress',
    meta: {
      title: '编辑地址'
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/shopcart/EditAddress.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  // 设置网页title
  document.title = to.matched[0].meta.title
  next()
})

export default router
