import { useState, useEffect } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../service/user'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'
const useLoadUserData = () => {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { username } = useGetUserInfo()

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      const { username, nickname } = res
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    }
  })
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
