/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login'
import home from '../views/home/home'
import userList from '../views/user/userList'
import welcome from '../views/home/welcome'
import order from '../views/order/order'
import item from '../views/shopItem/item.vue'
import adress from '../views/adress/adrress.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login', component: login, meta: { isLogin: true }
  },
  // eslint-disable-next-line
  {
    // eslint-disable-next-line
    path: '/home', component: home, redirect: '/userList', meta: { isLogin: false },
    children: [
      { path: '/userList', component: userList, meta: { isLogin: false } },
      { path: '/order', component: order, meta: { isLogin: false } },
      { path: '/shops', component: item, meta: { isLogin: false } },
      { path: '/adress', component:adress, meta: { isLogin: false } },
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next)=>{
//   let token=window.localStorage.getItem('login')
//   if(to.meta.isLogin){
//     next()
//   }else{
//     if(token){
//       next()
//     }else{
//       router.push('/login')
//     }
//   }
// })
export default router
