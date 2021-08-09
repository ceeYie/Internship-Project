import axios from 'axios'
import {  Message } from 'element-ui'
import store from '@/store'


// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 50000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = ''
      config.headers['TENANT-CODE'] = 'ASP0001'
      config.headers['SERVICE'] = 'dst'
    }
    return config
  },
  error => {
    console.log(error) 
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res)
    if (res.code !== 20000) {

    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) 
    return Promise.reject(error)
  }
)

export default service
