import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const { Header, Content, Footer } = Layout
const MainLayout: React.FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {waitingUserData ? <Spin /> : <Outlet />}
      </Content>
      <Footer className={styles.footer}>
        小铭问卷 &copy;2023 - present .Created by zymonody
      </Footer>
    </Layout>
  )
}

export default MainLayout
