import axios from 'axios'
import { getStore } from '@/utils/storage'
axios.defaults.timeout = 50000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(config => {
  const token = getStore('token');
  if (token) {
    // 表示用户已登录
    config.headers.common['Authorization'] = token;
  }
  return config
}, error => {
  return Promise.reject(error);
})
export default {
    fetchGet (url, params = {}) {
      return new Promise((resolve, reject) => {
        axios.get(url, params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    fetchPost (url, params = {}) {
      return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }