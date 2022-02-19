import http from './api'
/**
 * 
 * @param {参数} params 
 * @returns 
 * 获取购物车列表
 */
export const getCartlist=(params)=>{
    return http.fetchPost('/cart/cartlist',params)
}
/**
 * 
 * @param {参数} params 
 * @returns 
 * 添加购物车
 */
export const addCartlist=(params)=>{
    return http.fetchPost('/cart/addcartlist',params)
}