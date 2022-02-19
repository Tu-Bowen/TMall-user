import http from './api'
export const getMessagelists=(params)=>{
    return http.fetchGet('/message/messagelists/customerservice',params)
}