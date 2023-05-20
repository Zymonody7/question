import React, { useEffect } from 'react'
import { QuestionRadioPropsType, OptionType } from './interface'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const PropComponent: React.FC<QuestionRadioPropsType> = (props) => {
  const [form] = Form.useForm()
  const { title, isVertical, value, options, disabled, onChange } = props
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, value, options, isVertical])
  const handleValuesChange = () => {
    if (onChange == null) return
    const newValues = form.getFieldsValue() as QuestionRadioPropsType
    if (newValues.options) {
      newValues.options = newValues.options.filter((opt) => !(opt.text == null))
    }
    const { options = [] } = newValues
    options.forEach((opt) => {
      if (opt.value) return
      opt.value = nanoid(5)
    })
    onChange(newValues)
  }
  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ title, isVertical, value, options }}
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
      <Form.Item label='选项'>
        <Form.List name='options'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space
                    key={key}
                    align='baseline'
                  >
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '选项内容不能为空' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: OptionType) => {
                              if (opt.text === text) num++
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他选项重复'))
                          }
                        }
                      ]}
                    >
                      <Input placeholder='输入选项文字...' />
                    </Form.Item>
                    {index > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type='link'
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusCircleOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item
        label='默认选中'
        name='value'
      >
        <Select
          options={options?.map(({ text, value }) => ({
            value,
            label: text || ''
          }))}
          value={value}
        ></Select>
      </Form.Item>
      <Form.Item
        name='isVertical'
        valuePropName='checked'
      >
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
