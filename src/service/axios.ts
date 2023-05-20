import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'
const instance = axios.create({
  timeout: 10 * 1000
})
instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }
    // return 123
    throw new Error(msg)
  }
  return data
})

export default instance

export type ResType = {
  errno: number
  data?: any
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
