import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/gloab.css'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import echarts from 'echarts'
import loadVue from 'load-vue'
Vue.use(loadVue)
Vue.prototype.$echarts = echarts
Vue.use(mavonEditor)
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// request拦截器，展示进度条
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem('my-token')
  if (token) {
    // eslint-disable-next-line
    config.headers['authorization'] = 'bearer ' + token
  }
  return config
})
// 在response拦截器 影藏进度条
axios.interceptors.response.use(config => {
  return config
})
Vue.prototype.$qs = qs
Vue.use(elementUi)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
