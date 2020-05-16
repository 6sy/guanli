import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
axios.defaults.baseURL = 'http://127.0.0.1:4000/'
Vue.prototype.$http = axios
Vue.prototype.$qs = qs