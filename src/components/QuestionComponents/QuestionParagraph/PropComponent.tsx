import React, { useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Checkbox, Form, Input } from 'antd'

const { TextArea } = Input
const PropComponent: React.FC<QuestionParagraphPropsType> = ({
  text,
  isCenter,
  onChange,
  disabled
}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])
  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout='vertical'
      initialValues={{ text, isCenter }}
      disabled={disabled}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label='段落内容'
        name='text'
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        name='isCenter'
        valuePropName='checked'
      >
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
