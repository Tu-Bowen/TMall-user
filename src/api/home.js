import http from './api'
export const getBanner=()=>{
    return http.fetchGet("/home/banner")
}
export const getActivity=()=>{
    return http.fetchGet("/home/activity")
}
export const getHotgoods=()=>{
    return http.fetchGet("/goods/Hotgoods")
}
export const getHomemoudle=()=>{
    return http.fetchGet("/goods/Homemoudle")
}