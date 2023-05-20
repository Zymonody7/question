import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { MANAGER_INDEX_PATHNAME, REGISTER_PATHNAME } from '../../router/index'
import { useRequest } from 'ahooks'
import { loginService } from '../../service/user'
import { setToken } from '../../utils/user-token'

const { Title } = Typography
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'password'

const remeberUser = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}
const removeUser = () => {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}
const getUserInfoFromStorage = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  }
}
const Login: React.FC = () => {
  const [form] = Form.useForm()
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])
  const { run } = useRequest(
    async (values) => {
      const { username, password } = values
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(res) {
        const { token = '' } = res
        setToken(token)
        message.success('登录成功')
        nav(MANAGER_INDEX_PATHNAME)
      }
    }
  )
  const nav = useNavigate()
  const onFinish = (value: any) => {
    const { username, password, remeber } = value
    if (remeber) {
      remeberUser(username, password)
    } else {
      removeUser()
    }
    run(value)
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserOutlined />
          </Title>
          <Title>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remeber: true }}
          form={form}
        >
          <Form.Item
            label='用户名'
            name='username'
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '字符长度在5到20之间'
              },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='remeber'
            valuePropName='checked'
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button
                type='primary'
                htmlType='submit'
              >
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>新用户注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
