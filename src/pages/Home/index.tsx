import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Button } from 'antd'
import { MANAGER_INDEX_PATHNAME } from '../../router'
import styles from './Home.module.scss'
import axios from 'axios'
const { Title, Paragraph } = Typography
const Home: React.FC = () => {
  const nav = useNavigate()
  const handleClick = () => {
    nav('/login')
  }
  // useEffect(() => {
  //   axios.get('/api/test').then((res) => {
  //     console.log(res)
  //   })
  // }, [])
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份， 发布问卷 90 份， 收到答卷980份
        </Paragraph>
        <div>
          <Button
            type='primary'
            onClick={() => nav(MANAGER_INDEX_PATHNAME)}
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
