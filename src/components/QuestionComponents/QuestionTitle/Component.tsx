import { Typography } from 'antd'
import React from 'react'
import { QuestionTitleDefaultProps, QuestionTitleProps } from './interface'

const { Title } = Typography
const QuestionTitle: React.FC<QuestionTitleProps> = (props) => {
  const {
    text = '',
    level = 1,
    isCenter = false
  } = { ...QuestionTitleDefaultProps, ...props }

  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '14px'
  }
  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'start',
          marginBottom: '0',
          fontSize: genFontSize(level)
        }}
      >
        {text}
      </Title>
    </div>
  )
}

export default QuestionTitle
