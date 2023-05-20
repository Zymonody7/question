import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined
} from '@ant-design/icons'
import { Space, Button, Tooltip } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked
} from '../../../store/componentReducer'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

const EditToolbar = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent, componentList } =
    useGetComponentsInfo()
  useBindCanvasKeyPress()
  // if (!selectedComponent) return <>1</>
  const { isLocked } = selectedComponent || {}
  const handleDelete = () => {
    dispatch(removeSelectedComponent())
  }
  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  const handleLock = () => {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }
  const handleCopy = () => {
    dispatch(copySelectedComponent())
  }
  const handlePaste = () => {
    dispatch(pasteCopiedComponent())
  }
  const length = componentList.length
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId)
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex + 1 >= length

  const moveUp = () => {
    if (isFirst) return
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 })
    )
  }
  const moveDown = () => {
    if (isLast) return
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 })
    )
  }
  return (
    <Space>
      <Tooltip title='删除'>
        <Button
          shape='circle'
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title='隐藏'>
        <Button
          shape='circle'
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title='锁定'>
        <Button
          shape='circle'
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title='复制'>
        <Button
          shape='circle'
          icon={<CopyOutlined />}
          onClick={handleCopy}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title='粘贴'>
        <Button
          shape='circle'
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent == null}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title='上移'>
        <Button
          shape='circle'
          icon={<UpOutlined />}
          onClick={moveUp}
          disabled={isFirst}
        ></Button>
      </Tooltip>
      <Tooltip title='下移'>
        <Button
          shape='circle'
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
