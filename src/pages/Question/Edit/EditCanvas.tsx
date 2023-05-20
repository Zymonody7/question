import React from 'react'
import styles from './EditCanvas.module.scss'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import { Spin } from 'antd'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import {
  ComponentsInfoType,
  changeSelectedId,
  moveComponent
} from '../../../store/componentReducer'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

type PropsType = {
  loading: boolean
}
const genComponent = (componentInfo: ComponentsInfoType) => {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props}></Component>
}

const EditCanvas: React.FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentsInfo()
  const dispatch = useDispatch()
  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id }
  })
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  if (loading) {
    return (
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <Spin></Spin>
      </div>
    )
  }
  const handleClick = (event: MouseEvent, id: string) => {
    dispatch(changeSelectedId(id))
    event.stopPropagation()
  }

  return (
    <SortableContainer
      items={componentListWithId}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.canvas}>
        {componentList
          .filter((c) => !c.isHidden)
          .map((c) => {
            const { fe_id, isLocked } = c
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked

            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked
            })
            return (
              <SortableItem
                key={fe_id}
                id={fe_id}
              >
                <div
                  className={wrapperClassName}
                  onClick={(e: any) => handleClick(e, fe_id)}
                >
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
        {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle></QuestionTitle>
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput></QuestionInput>
        </div>
      </div> */}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
