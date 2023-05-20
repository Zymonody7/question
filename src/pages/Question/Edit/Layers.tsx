import React, { ChangeEvent, useState } from 'react'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import { useDispatch } from 'react-redux'
import { Button, Input, Space, message } from 'antd'
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked
} from '../../../store/componentReducer'
import styles from './Layers.module.scss'
import classNames from 'classnames'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
const Layers = () => {
  const { componentList = [], selectedId } = useGetComponentsInfo()
  const dispatch = useDispatch()
  const [changingTitleId, setChangingTitleId] = useState('')
  const handleTitleClick = (fe_id: string) => {
    const curCmp = componentList.find((c) => c.fe_id === fe_id)
    if (curCmp && curCmp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }
    setChangingTitleId(fe_id)
  }

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return

    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  const changeHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  const changeLocked = (fe_id: string) => {
    dispatch(toggleComponentLocked({ fe_id }))
  }
  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id }
  })
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer
      items={componentListWithId}
      onDragEnd={handleDragEnd}
    >
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c

        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId
        })
        return (
          <SortableItem
            key={fe_id}
            id={fe_id}
          >
            <div className={styles.wrapper}>
              <div
                className={titleClassName}
                onClick={() => handleTitleClick(fe_id)}
              >
                {fe_id === changingTitleId && (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                  />
                )}

                {fe_id !== changingTitleId && title}
              </div>
              <div className={styles.header}>
                <Space>
                  <Button
                    onClick={() => changeHidden(fe_id, !isHidden)}
                    size='small'
                    shape='circle'
                    className={!isHidden ? styles.btn : ''}
                    type={isHidden ? 'primary' : 'text'}
                    icon={<EyeInvisibleOutlined />}
                  ></Button>
                  <Button
                    onClick={() => changeLocked(fe_id)}
                    size='small'
                    shape='circle'
                    className={!isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
