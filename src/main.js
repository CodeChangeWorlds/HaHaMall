import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as $apis from './api'
import {
  NavBar,
  Icon,
  Form,
  Field,
  Button,
  toast,
  dialog,
  Swipe,
  ShareSheet,
  SwipeItem,
  Image as VanImage,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Tag,
  Grid,
  GridItem,
  Lazyload,
  List,
  PullRefresh,
  Search,
  Empty,
  DropdownMenu,
  DropdownItem,
  Card,
  Sticky,
  SubmitBar,
  SwipeCell,
  Checkbox,
  Stepper,
  Popup,
  Picker,
  DatetimePicker,
  AddressList,
  AddressEdit,
  Badge
} from 'vant'
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(toast)
Vue.use(dialog)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(ShareSheet)
Vue.use(Tag)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(List)
Vue.use(Lazyload)
Vue.use(PullRefresh)
Vue.use(Search)
Vue.use(Empty)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Sticky)
Vue.use(SubmitBar)
Vue.use(SwipeCell)
Vue.use(Checkbox)
Vue.use(Stepper)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(DatetimePicker)
Vue.use(AddressList)
Vue.use(AddressEdit)
Vue.use(Badge)

// 全局接口封装
Vue.prototype.$apis = $apis
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
