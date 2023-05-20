import React from 'react'
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface'
import { Radio, Space, Typography } from 'antd'

const { Title, Paragraph } = Typography
const Component: React.FC<QuestionRadioPropsType> = (props) => {
  const {
    title,
    options = [],
    value,
    isVertical
  } = { ...QuestionRadioDefaultProps, ...props }
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((opt) => {
            const { value, text } = opt
            return (
              <Radio
                value={value}
                key={value}
              >
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
