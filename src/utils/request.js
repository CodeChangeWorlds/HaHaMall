import axios from 'axios'
import router from './../router'
// process.env.NODE_ENV 环境变量
// development 开发u环境
// prouction 生产环境
const isDev = process.env.NODE_ENV === 'development'
// 创建axios实例
const request = axios.create({
  baseURL: isDev ? 'http://127.0.0.1:3000/api' : 'https://www.coderby.tk/api', // 请求数据的路径
  timeout: 5000 // 响应超时的时间
})
// 请求拦截器
request.interceptors.request.use((config) => {
  // 将token添加到头信息
  config.headers.token = localStorage.getItem('SESSDATA')
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response) => {
  // 如果没有token重定向到登录页
  if (response.data.code === '10008') {
    router.push('/login')
  }
  return response
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
