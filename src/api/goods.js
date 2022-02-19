import http from './api'
/**
 * 
 * @param {*参数} params 
 * @returns 
 * 获取当前商品列表
 */
export const getGoodlists=(params)=>{
    return http.fetchGet("/goods",params)
}
/**
 * 
 * @param {*参数} params 
 * @returns 
 * 获取周边商品列表
 */
 export const getTypegoodslists=(params)=>{
    return http.fetchGet("/goods/typegoods",params)
}
/**
 * 获取商品详情
 */
export const getGoodsdetail=(params)=>{
    return http.fetchGet('/goods/goodsdetail',params)
}