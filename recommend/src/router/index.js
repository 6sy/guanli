import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login'
import home from '../views/home/home'
import userList from '../views/user/userList'
import power from '../views/power/power'
import welcome from '../views/home/welcome'
import addArticle from '../views/addArticle/addArticle'
import writeArticle from '../views/addArticle/writeArticle'
import article from '../views/article/article'
import comment from '../views/comments/comment'
import viewAnalyse from '../views/viewAnalyse/viewAnalyse'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login', component: login, meta: { isLogin: true }
  },
  { path: '/writeArticle', component: writeArticle, meta: { isLogin: true }, name: 'writeArticle' },
  // eslint-disable-next-line
  {
    // eslint-disable-next-line
    path: '/home', component: home, redirect: '/welcome', meta: { isLogin: false },
    children: [
      { path: '/userList', component: userList, meta: { isLogin: false } },
      { path: '/power', component: power, meta: { isLogin: false } },
      { path: '/welcome', component: welcome, meta: { isLogin: false } },
      { path: '/addArticle', component: addArticle, meta: { isLogin: false } },
      { path: '/articleList', component: article, meta: { isLogin: false } },
      { path: '/commentList', component: comment, meta: { isLogin: false } },
      { path: '/viewAnalyse', component: viewAnalyse, meta: { isLogin: false } }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
