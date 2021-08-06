import axios from 'axios'
import {  Message } from 'element-ui'
import store from '@/store'


// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})


service.interceptors.request.use(
  config => {

    if (store.getters.token) {
      config.headers['X-Token'] = '12345'
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
