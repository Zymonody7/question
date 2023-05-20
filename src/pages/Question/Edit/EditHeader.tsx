import React, { ChangeEvent, useState } from 'react'
import { Button, Input, Space, Typography, message } from 'antd'
import styles from './EditHeader.module.scss'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageinfoReducer'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '../../../service/question'
const { Title } = Typography
const TitleElem: React.FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }
  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChange}
      />
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type='text'
        onClick={() => setEditState(true)}
      ></Button>
    </Space>
  )
}
const SaveButton = () => {
  const { componentList = [] } = useGetComponentsInfo()

  const pageInfo = useGetPageInfo()
  const { id = '' } = useParams()
  const { loading, run: save } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
      onSuccess() {
        // message.success('保存成功')
      }
    }
  )
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 2000
    }
  )
  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  )
}
const PublishButton: React.FC = () => {
  const nav = useNavigate()
  const { componentList = [] } = useGetComponentsInfo()

  const pageInfo = useGetPageInfo()
  const { id = '' } = useParams()
  const { loading, run: pub } = useRequest(
    async () => {
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true
      })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id)
      }
    }
  )
  return (
    <Button
      onClick={pub}
      type='primary'
      disabled={loading}
    >
      发布
    </Button>
  )
}
const EditHeader = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type='link'
              icon={<LeftOutlined />}
              onClick={() => nav(-1)}
            >
              返回
            </Button>
            <TitleElem></TitleElem>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton></SaveButton>
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
