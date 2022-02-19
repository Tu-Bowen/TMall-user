import http from './api'
/**
 * 
 * @param {参数} params 
 * @returns 
 * 获取订单列表
 */
export const getOrderlist=(params)=>{
    return http.fetchGet('/order/orderlist',params)
}