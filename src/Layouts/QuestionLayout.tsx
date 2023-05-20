import React from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import { Spin } from 'antd'

const QuestionLayout: React.FC = () => {
  const { waitingUserData } = useLoadUserData()

  return (
    <>
      <div>{waitingUserData ? <Spin /> : <Outlet />}</div>
    </>
  )
}

export default QuestionLayout
