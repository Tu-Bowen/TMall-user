import http from './api'
/**
 * 
 * @param {*参数} params 
 * @returns 
 * 获取当前用户信息
 */
export const getUserinfo=(params)=>{
    return http.fetchGet("/user/userinfo",params)
}
/**
 * 编辑当前用户信息
 */
export const editUserinfo=(params)=>{
    return http.fetchPost("/user/editinfo",params)
}