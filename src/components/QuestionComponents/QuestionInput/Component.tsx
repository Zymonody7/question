import { Input, Typography } from 'antd'
import React from 'react'
import { QuestionInputProps, QuestionInputDefaultProps } from './interface'

const { Paragraph } = Typography
const QuestionInput: React.FC<QuestionInputProps> = (
  props: QuestionInputProps
) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export default QuestionInput
