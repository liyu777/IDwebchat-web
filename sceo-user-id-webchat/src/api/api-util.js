import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.withCredentials = true
// 配置axios 拦截器
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做某事
  return config
}, (error) => {
  // 请求错误时做些事
  Message({
    message: '服务器异常 ' + error.message,
    type: 'error'
  })
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做些事
  const result = response.data
  if (!result) {
    Message({
      message: '数据异常！',
      type: 'error'
    })
    return Promise.reject({message: '数据异常！'})
  }
  if (result.retCode === 1) {
    // 成功
    return result.data
  } else if (result.retCode === 0) {
    // 失败
    Message({
      message: result.errMsg,
      type: 'error'
    })
    return Promise.reject({message: result.errMsg})
  } else if (result.retCode === -1) {
    window.location.href = result.data
    // return Promise.reject({message: '未登录'})
  } else if (result.retCode === -2) {
    return Promise.reject({message: result.errMsg})
  }
  return Promise.reject({message: '未知状态！'})
}, (error) => {
  // 请求错误时做些事
  Message({
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
})
