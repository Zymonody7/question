import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionInputConf, { QuestionInputProps } from './QuestionInput'
import QuestionParagraphConf, {
  QuestionParagraphPropsType
} from './QuestionParagraph'
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio'
import QuestionTextAreaConf, {
  QuestionTextAreaPropsType
} from './QuestionTextArea'
import QuestionTitleConf, { QuestionTitleProps } from './QuestionTitle'
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType
} from './QuestonCheckbox'

export type ComponentPropsType = QuestionInputProps &
  QuestionTitleProps &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextAreaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

export type ComponentConfType = {
  title: string
  type: string
  Component: React.FC<ComponentPropsType>
  PropComponent: React.FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextAreaConf,
  QuestionRadioConf,
  QuestionCheckboxConf
]

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}

export const ComponentConfGroup = [
  {
    groupName: '文本显示',
    components: [QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf]
  },
  {
    groupName: '用户输入',
    components: [
      QuestionInputConf,
      QuestionTextAreaConf,
      QuestionRadioConf,
      QuestionCheckboxConf
    ]
  }
]
