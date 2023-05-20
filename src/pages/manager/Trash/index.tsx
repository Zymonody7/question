import React, { useState } from 'react'
import styles from './Trash.module.scss'
import {
  Typography,
  Empty,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  message,
  Spin
} from 'antd'
import { useRequest, useTitle } from 'ahooks'
import QuestionCard from '../../../components/QuestionCard'
import ListSearch from '../../../components/ListSearch'
import useLoadQuestionListData from '../../../hooks/useLoadQuestionListData'
import ListPage from '../../../components/ListPage'
import {
  deleteQuestionService,
  updateQuestionService
} from '../../../service/question'

const rowQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3月10日 13:23'
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createdAt: '2月10日 13:23'
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3月14日 13:23'
  }
]
const { Title } = Typography
const { confirm } = Modal
const Trash: React.FC = () => {
  useTitle('小铭问卷 - 回收站')
  // const [questionList, setQuestionList] = useState(rowQuestionList)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const {
    data = {},
    loading,
    refresh
  } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color='processing'>已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        )
      }
    },
    {
      title: '答卷',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    }
  ]
  const handleDel = () => {
    confirm({
      title: '是否彻底删除？',
      content: '删除后不可以找回',
      onOk: deleteQuestion
    })
  }

  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      onSuccess() {
        message.success('恢复成功')
        refresh()
        setSelectedIds([])
      }
    }
  )

  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        refresh()
        setSelectedIds([])
      }
    }
  )
  const TableElem = (
    <>
      <div style={{ marginBottom: '12px' }}>
        <Space>
          <Button
            type='primary'
            disabled={selectedIds.length === 0}
            onClick={recover}
          >
            恢复
          </Button>
          <Button
            danger
            disabled={selectedIds.length === 0}
            onClick={handleDel}
          >
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        rowKey={(q) => q._id}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectRowKeys) => {
            setSelectedIds(selectRowKeys as string[])
          }
        }}
      ></Table>
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading &&
          (list.length > 0 ? TableElem : <Empty description='暂无数据' />)}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}></ListPage>
      </div>
    </>
  )
}

export default Trash
