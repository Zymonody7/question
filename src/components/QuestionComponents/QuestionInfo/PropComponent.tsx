import React, { useEffect } from 'react'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'
import { Form, Checkbox, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const PropComponent: React.FC<QuestionInfoPropsType> = (props) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])
  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout='vertical'
      initialValues={{ title, desc }}
      disabled={disabled}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label='标题'
        name='title'
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='段落内容'
        name='desc'
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea autoSize />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
