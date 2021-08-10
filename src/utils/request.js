import axios from 'axios'
import {  Message } from 'element-ui'
import store from '@/utils/auth'


// create an axios instance
const service = axios.create({
  baseURL: 'api', // process.env.VUE_APP_BASE_API
  timeout: 50000 // request timeout
})

let tonke = store.get('userToken')
service.interceptors.request.use(
  config => {
    if(tonke){
      config.headers['Authorization'] = 'bearer '+tonke
    }else{
      config.headers['Authorization'] = 'Basic QVNQMDAwMTpBU1AwMDAx'
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
    console.log(res)

    return res
  },
  error => {
    console.log('err' + error) 
    return Promise.reject(error)
  }
)

export default service
