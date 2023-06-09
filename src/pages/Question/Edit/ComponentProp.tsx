import React from 'react'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import {
  ComponentPropsType,
  getComponentConfByType
} from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentReducer'

const NoProp: React.FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}
const ComponentProp = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentsInfo()
  if (selectedComponent == null) {
    return <NoProp />
  }

  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfByType(type)

  if (componentConf == null) return <NoProp />
  const { PropComponent } = componentConf

  const changeProps = (newProps: ComponentPropsType) => {
    // console.log(newProps)

    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ id: fe_id, newProps }))
  }
  return (
    <PropComponent
      {...props}
      onChange={changeProps}
      disabled={isLocked || isHidden}
    />
  )
}

export default ComponentProp
