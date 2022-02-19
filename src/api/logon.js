import http from './api'
export const Logon =(params)=>{
    return http.fetchPost('/user/register',params)
}