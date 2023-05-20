import React from 'react'
import {
  QuestionTextAreaDefaultProps,
  QuestionTextAreaPropsType
} from './interface'
import { Input, Typography } from 'antd'
const { Paragraph } = Typography
const { TextArea } = Input
const Component: React.FC<QuestionTextAreaPropsType> = (props) => {
  const { title, placeholder } = { ...QuestionTextAreaDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default Component
