import axios from 'axios'
import Vue from 'vue'
axios.defaults.baseURL = 'http://127.0.0.1:4000/'
// request拦截器，展示进度条
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  Nprogress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在response拦截器 影藏进度条
axios.interceptors.response.use(config => {
  Nprogress.done()
  return config
})