import React, { useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  AreaChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
import {
  duplicateQuestionService,
  updateQuestionService
} from '../service/question'
interface QuestionCardProps {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean
}
const { confirm } = Modal
const handleCopy = () => {
  message.success('复制成功')
}
const handleDel = () => {
  confirm({
    title: '确定删除?',
    okText: '确定',
    onOk: () => {
      message.success('删除成功')
    }
  })
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  _id,
  title,
  isPublished,
  isStar,
  answerCount,
  createdAt,
  isDeleted
}) => {
  const nav = useNavigate()

  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      }
    }
  )

  const { run: duplicate, loading: duplicateLoading } = useRequest(
    async () => {
      return await duplicateQuestionService(_id)
    },
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`)
      }
    }
  )

  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      }
    }
  )
  const [isDeletedState, setIsDeletedState] = useState(isDeleted)
  if (isDeletedState) return null
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color='processing'>已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['action-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type='text'
              size='small'
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<AreaChartOutlined />}
              type='text'
              size='small'
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type='text'
              size='small'
              icon={<StarOutlined />}
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title='确定复制该问卷?'
              okText='确定'
              cancelText='取消'
              onConfirm={handleCopy}
            >
              <Button
                type='text'
                size='small'
                icon={<CopyOutlined />}
                onClick={duplicate}
                disabled={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>
            <Button
              type='text'
              size='small'
              icon={<DeleteOutlined />}
              onClick={deleteQuestion}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
