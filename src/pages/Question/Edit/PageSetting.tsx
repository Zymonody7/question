import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageinfoReducer'

const { TextArea } = Input
const PageSetting: React.FC = () => {
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const handleValuesChange = () => {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])
  return (
    <Form
      layout='vertical'
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label='标题'
        name='title'
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input placeholder='请输入标题' />
      </Form.Item>
      <Form.Item
        label='问卷描述'
        name='desc'
      >
        <TextArea placeholder='问卷描述' />
      </Form.Item>
      <Form.Item
        label='样式代码'
        name='css'
      >
        <TextArea placeholder='css样式代码' />
      </Form.Item>
      <Form.Item
        label='脚本代码'
        name='js'
      >
        <TextArea placeholder='js脚本代码' />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
