import Vue from 'vue';
import Vuex from 'vuex';
import { io } from "socket.io-client";


import {setStore,getStore} from '@/utils/storage'
Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        login:false,//是否登录
        userInfo:null,//用户信息
        token:null,//用户token
        cartList:[],//加入购物车的商品
        showCart:false,//是否展示购物车
        SocketIO:null,//socket.io连接实例
        message:[]
    },
    mutations: {
        // 网页初始化时从本地缓存获取购物车数据
        INITBUYCART(state) {
          let initCart = getStore('buyCart');
          //console.log(initCart)
          if (initCart) {
            state.cartList = JSON.parse(initCart)
    
          }
        },
        SHOWCART(state, { showCart }) {
          state.showCart = showCart;
        },
        ISLOGIN(state, info) {
          state.userInfo = info;
          state.login = true;
          setStore('userInfo', info);
        },
        SOCKET(state){
           state.SocketIO = io("http://localhost:3000/");
           state.SocketIO.on("return_private_message",data=>{
            console.log(data);
              const message ={
                STATUS:'y',
                TEXT:data.text,
                TIME:null,
                TYPE:"text",
                sender_type:data.sender_type,
                senderid:data.senderid,
                sendername:data.sendername
              }
              state.message.push(message)
          })
        },
        SOCKETEMIT(state,{event,params}){
          state.SocketIO.emit(event,params)
        },
        /** */
        SOCKETON(state,{event,callback}){
          console.log(event)
          state.SocketIO.on(event,data=>{
            callback&&callback.apply(this,[data])
          })
        },
        /** */
        MESSAGE(state,{message}){
          state.message=[...state.message,...message]
        },
        ADDCART(state, payload) {
          let cart = state.cartList;
          let goods = {
            goods_id:payload.goods_id,
            goods_price:payload.goods_price,
            goods_name:payload.goods_name,
            goods_show:payload.goods_show
          }
          console.log(goods)
          let falg = true;
          if (cart.length) {
            cart.forEach(item => {
              if (item.goods_id === goods.goods_id) {
                if (item.goods_number >= 0) {
                  falg = false;
                  item.goods_number += 1;
                }
              }
            })
          }
          if (!cart.length || falg) {
            goods.goods_number = 1;
            cart.push(goods);
          }
          console.log(cart)
          state.cartList = cart;
          setStore('buyCart', cart);
        }
    
      },
    actions:{

    },
    modules:{

    }
})