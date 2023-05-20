import request, { ResDataType } from './axios'

export async function getUserInfoService() {
  const url = '/api/user/info'
  const data = (await request.get(url)) as ResDataType
  return data
}

export async function registerService(
  username: string,
  password: string,
  nickname: string
) {
  const url = '/api/user/register'
  const body = { username, password, nickname: nickname || username }
  const data = (await request.post(url, body)) as ResDataType
  return data
}

export async function loginService(username: string, password: string) {
  const url = '/api/user/login'
  const body = { username, password }
  const data = (await request.post(url, body)) as ResDataType
  return data
}
