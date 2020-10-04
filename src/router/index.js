import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/pages/Main'
import Home from '@/components/pages/tabs/Home'
import Category from '@/components/pages/tabs/Category'
import Order from '@/components/pages/tabs/Order'
import Account from '@/components/pages/tabs/Account'
import Cart from '@/components/pages/Cart'
import Search from '@/components/pages/Search'
import SearchResult from '@/components/pages/SearchResult'
import OnBoarDing from '@/components/pages/OnBoarDing'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import GoodsCategory from '@/components/pages/GoodsCategory'
import GoodDetail from '@/components/pages/GoodDetail'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { path: '/main/home' } },
  {
    path: '/main',
    component: Main,
    children: [
      { path: 'home', component: Home },
      { path: 'category', component: Category },
      { path: 'order', component: Order },
      { path: 'account', component: Account },
    ],
  },
  { path: '/onboarding', name: 'onboarding', component: OnBoarDing },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/search', name: 'search', component: Search },
  {
    path: '/searchresult',
    name: 'searchresult',
    component: SearchResult,
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/goodscategory', name: 'goodscategory', component: GoodsCategory },
  { path: '/gooddetail/:id', name: 'gooddetail', component: GoodDetail },
]

const router = new VueRouter({
  routes,
})

export default router
