import Vue from 'vue'
import VueRouter from 'vue-router'
// import Main from '@/components/pages/Main'
// import Home from '@/components/pages/tabs/Home'
// import Category from '@/components/pages/tabs/Category'
// import Order from '@/components/pages/tabs/Order'
// import Account from '@/components/pages/tabs/Account'
// import Cart from '@/components/pages/Cart'
// import Search from '@/components/pages/Search'
// import SearchResult from '@/components/pages/SearchResult'
// import OnBoarDing from '@/components/pages/OnBoarDing'
// import Login from '@/components/pages/Login'
// import Register from '@/components/pages/Register'
// import GoodsCategory from '@/components/pages/GoodsCategory'
// import GoodDetail from '@/components/pages/GoodDetail'
// 懒加载 会把打包后的js文件分开来加载 变成多个js文件
const Main = ()=>import('@/components/pages/Main')
const Home = ()=>import('@/components/pages/tabs/Home')
const Category = ()=>import('@/components/pages/tabs/Category')
const Order = ()=>import('@/components/pages/tabs/Order')
const Account = ()=>import('@/components/pages/tabs/Account')
const Cart = ()=>import('@/components/pages/Cart')
const Search = ()=>import('@/components/pages/Search')
const SearchResult = ()=>import('@/components/pages/SearchResult')
const OnBoarDing = ()=>import('@/components/pages/OnBoarDing')
const Login = ()=>import('@/components/pages/Login')
const Register = ()=>import('@/components/pages/Register')
const GoodsCategory = ()=>import('@/components/pages/GoodsCategory')
const GoodDetail = ()=>import('@/components/pages/GoodDetail')
const OrderDetail = ()=>import('@/components/pages/OrderDetail')
const TestScroll = ()=> import("@/components/pages/TestScroll")

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
  { path: '/orderdetail', name: 'orderdetail', component: OrderDetail },
  {path:'/testscroll',name:'testscroll',component:TestScroll},
]

const router = new VueRouter({
  routes,
})

export default router
