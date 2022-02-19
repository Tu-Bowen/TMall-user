import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决路由命名冲突的方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
// 异步组件加载
const Index = () => import('@/views');
const Login = () => import('@/views/Login');
const Home = () => import('@/views/Home');
const Goods = () => import('@/views/Goods');
const Thanks = () => import('@/views/Thanks');
const GoodsDetail = () => import('@/views/GoodsDetail');
const User = () => import('@/views/User');
const Logon = () => import('@/views/Logon');
const Cart = () => import('@/views/Cart'); 
const Order = () =>import('@/views/Order');
const Message =() => import('@/views/Message');
const Addressedit =() =>import('@/views/Address/edit.vue');
const Addressadd =()=> import('@/views/Address/add.vue');
//  import Index from '@/views/index'
//  import Login from '@/views/Login'
//  import Home from '@/views/Home'
//  import Goods from '@/views/Goods'
//  import Thanks from '@/views/Thanks'
// import GoodsDetail from '@/views/GoodsDetail'
//  import User from '@/views/User';
Vue.use(VueRouter);
const routes=[
    {
        path:'/',
        redirect:'/home',
        name:'home',
        component:Index,
        children:[
            {
                path:'home',
                component:Home
            },
            {
                path:'thanks',
                component:Thanks
            },
            {
                path:'goods',
                component:Goods
            },
            {
                path:'goodsDetail',
                name:"goodsDetail",
                component:GoodsDetail
            },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/logon',
        name:'logon',
        component:Logon
    },
    {
        path:'/user',
        name:'user',
        redirect:'/user/message',
        component:User,
        children:[
            {
                path:'cart',
                component:Cart
            },
            {
                path:'order',
                component:Order
            },
            {
                path:'message',
                component:Message,
            },
            {
                path:'address/edit',
                component:Addressedit
            },
            {
                path:'address/add',
                component:Addressadd
            }
        ],
        meta:{
            auth:true
        }
    }
]

const router=new VueRouter({
    routes
})

export default router;