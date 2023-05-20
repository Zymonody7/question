import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HOME_PATHNAME, LOGIN_PATHNAME } from '../../router'
import { UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../../service/user'
import { Button } from 'antd'
import { removeToken } from '../../utils/user-token'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../../store/userReducer'

const UserInfo: React.FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  // const { data } = useRequest(getUserInfoService)
  // const { nickname, username } = data || {}
  const { username, nickname } = useGetUserInfo()
  const logout = () => {
    dispatch(logoutReducer())
    removeToken()
    nav(HOME_PATHNAME)
  }
  const UserInfo = (
    <>
      <span style={{ color: '#e5e5e5' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button
        type='link'
        onClick={logout}
      >
        退出
      </Button>
    </>
  )
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <>{username ? UserInfo : Login}</>
}

export default UserInfo
