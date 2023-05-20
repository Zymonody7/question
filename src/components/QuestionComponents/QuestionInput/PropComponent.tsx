import React, { useEffect } from 'react'
import { QuestionInputProps } from './interface'
import { Form, Input } from 'antd'

const PropComponent: React.FC<QuestionInputProps> = ({
  title,
  placeholder,
  onChange,
  disabled
}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      title,
      placeholder
    })
  }, [title, placeholder])

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout='vertical'
      form={form}
      initialValues={{ title, placeholder }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label='标题'
        name='title'
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Placeholder'
        name='placeholder'
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
