import { Typography } from 'antd'
import React from 'react'
import {
  QuestionParagraphDefaultProps,
  QuestionParagraphPropsType
} from './interface'

const { Paragraph } = Typography
const Component: React.FC<QuestionParagraphPropsType> = (props) => {
  const {
    text = '',
    isCenter,
    onChange,
    disabled
  } = {
    ...QuestionParagraphDefaultProps,
    ...props
  }
  const textList = text.split('\n')
  return (
    <Paragraph
      style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}
    >
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

export default Component
