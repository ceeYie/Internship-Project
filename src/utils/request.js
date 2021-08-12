import axios from 'axios'
import {  Message } from 'element-ui'
import store from '@/utils/auth'
import router from '../router'
// create an axios instance
const service = axios.create({
  baseURL: 'api', // process.env.VUE_APP_BASE_API
  timeout: 50000 // request timeout
})

service.interceptors.request.use(
  config => {
    let tonke = store.get('userToken')
    if(router.history.current.path==='/login'){
      config.headers['Authorization'] = 'Basic QVNQMDAwMTpBU1AwMDAx'
    }else{
      config.headers['Authorization'] = 'bearer '+tonke
    }
    config.headers['TENANT-CODE'] = 'ASP0001'
    config.headers['SERVICE'] = 'dst'
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
    
    return res
  },
  error => {
    console.log('err' + error) 
    return Promise.reject(error)
  }
)

export default service
