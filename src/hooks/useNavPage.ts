import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { useEffect } from 'react'
import {
  LOGIN_PATHNAME,
  MANAGER_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo
} from '../router'
const useNavPage = (waitingUserData: boolean) => {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    if (waitingUserData) return
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGER_INDEX_PATHNAME)
      }
      return
    }
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [username, pathname, waitingUserData])
}

export default useNavPage
