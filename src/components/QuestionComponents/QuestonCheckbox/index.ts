import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './interface'
export * from './interface'

export default {
  title: '多选标题',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps
}
