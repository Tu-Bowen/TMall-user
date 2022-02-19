import http from './api'
export const getSession=(params)=>{
    return http.fetchGet('/session/sessionlists',params)
}