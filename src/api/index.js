import request from './../utils/request'
// 请求轮播图数据
export function getBannerData () {
  return request.get('/bannerApi')
}
// 请求商品列表数据
export function getGoodsData (params) { // 接收参数
  return request.get('/goodsApi', { params })
}
// 请求商品详情页的数据
export function getGoodsDetailsData (params) { // 接收参数
  return request.get('/goodsApi/details', { params })
}
// 发送短信验证码
export function sendCode (params) {
  return request.post('/userApi/sendCode', params)
}
// 注册
export function register (params) {
  return request.post('/userApi/register', params)
}
// 登陆
export function login (params) {
  return request.post('userApi/login', params)
}
// 添加到购物车
export function addCart (params) {
  return request.post('shopcartApi/add', params)
}
// 获取购物车数据
export function getShopCart (params) {
  return request.get('shopcartApi', { params })
}
// 删除购物车商品
export function deleteShopCart (params) {
  return request.get('shopcartApi/delete', { params })
}
// 更新购物车商品数量
export function updateShopCart (params) {
  return request.get('shopcartApi/update', { params })
}
// 多选
export function selectItemCheckedAll (params) {
  return request.get('shopcartApi/selectItemAll', { params })
}
// 单选
export function selectItemChecked (params) {
  return request.get('shopcartApi/selectItem', { params })
}
// 获取商品分类
export function getCategories () {
  return request.get('goodsApi/getCategory')
}
// 搜索商品
export function searchVal (params) {
  return request.get('goodsApi/search', { params })
}
// 获取商品分类
export function getCateList (params) {
  return request.get('goodsApi/cateList', { params })
}
// 获取用户信息
export function getUserInfo (params) {
  return request.get('userApi/userInfo', { params })
}
// 修改用户信息
export function updateUserInfo (params) {
  return request.post('userApi/updateUser', params)
}
// 修改用户头像
export function updateAvatar (params) {
  return request.post('userApi/updateAvatar', params)
}
// 获取地址列表
export function getAddr (params) {
  return request.get('userApi/addr', { params })
}
// 添加地址
export function addAddr (params) {
  return request.post('userApi/addAddr', params)
}
// 修改地址
export function editAddr (params) {
  return request.post('userApi/editAddr', params)
}
// 删除地址
export function delAddr (params) {
  return request.get('userApi/delAddr', { params })
}
// 获取地址详细
export function addr (params) {
  return request.get('/userApi/getAddr', { params })
}
// 选择地址
export function selectAddr (params) {
  return request.get('/userApi/selectAddr', { params })
}
// 生成订单
export function generateOrder (params) {
  return request.post('shopcartApi/order', params)
}
