import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManagerLayout.module.scss'
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { Button, Space, Divider, message } from 'antd'
import { createQuestionService } from '../service/question'
import { useRequest } from 'ahooks'

const ManagerLayout: React.FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  // const [loading, setLoading] = useState(false)
  // const handleCreateClick = async () => {
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   const { id } = data || {}
  //   if (id) {
  //     nav(`/question/edit/${id}`)
  //     message.success('创建成功')
  //   }
  //   setLoading(false)
  // }
  const {
    loading,
    error,
    run: handleCreateClick
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: (res) => {
      nav(`/question/edit/${res.id}`)
      message.success('创建成功')
    }
  })
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction='vertical'>
          <Button
            type='primary'
            size='large'
            icon={<PlusOutlined></PlusOutlined>}
            onClick={handleCreateClick}
            disabled={loading}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTopColor: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manager/list') ? 'default' : 'text'}
            size='large'
            icon={<BarsOutlined />}
            onClick={() => nav('/manager/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manager/star') ? 'default' : 'text'}
            size='large'
            icon={<StarOutlined />}
            onClick={() => nav('/manager/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manager/trash') ? 'default' : 'text'}
            size='large'
            icon={<DeleteOutlined />}
            onClick={() => nav('/manager/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManagerLayout
