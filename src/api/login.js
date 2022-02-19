import http from './api'
/**
 * 
 * @param {*参数} params 
 * @returns 
 * 获取当前商品列表
 */
export const login=(params)=>{
    return http.fetchPost("/user/login",params)
}
/**
 * 
 * @param {*参数} params 
 * @returns
 * 退出登录 
 */
export const logout=(params)=>{
    return http.fetchPost("/user/logout",params)
}
/**
 * @param {*参数} params 
 * @returns
 * 持久化登录接口
 */
 export const validate=(params)=>{
    return http.fetchPost("/user/validate",params)
}