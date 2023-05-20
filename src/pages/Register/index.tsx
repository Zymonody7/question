import React from 'react'
import { Button, Form, Input, Space, Typography, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { HOME_PATHNAME, LOGIN_PATHNAME } from '../../router'
import { useRequest } from 'ahooks'
import { registerService } from '../../service/user'
const { Title } = Typography
const Register: React.FC = () => {
  const nav = useNavigate()
  const { run } = useRequest(
    async (values) => {
      const { username, password, nickname } = values
      await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功')
        nav(LOGIN_PATHNAME)
      }
    }
  )
  const onFinish = (value: any) => {
    run(value)
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
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
            label='确认密码'
            name='confirm'
            dependencies={['password']}
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次密码不一致'))
                  }
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label='昵称'
            name='nickname'
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Space>
              <Button
                htmlType='submit'
                type='primary'
              >
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
