import React, { useState } from 'react'
import { useTitle } from 'ahooks'
import { Empty, Pagination, Spin, Typography } from 'antd'
import styles from './Star.module.scss'
import QuestionCard from '../../../components/QuestionCard'
import ListSearch from '../../../components/ListSearch'
import useLoadQuestionListData from '../../../hooks/useLoadQuestionListData'
import ListPage from '../../../components/ListPage'

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
const Star: React.FC = () => {
  useTitle('小铭问卷 - 星标问卷')
  // const [questionList, setQuestionList] = useState(rowQuestionList)
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
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
        {!loading && list.length > 0
          ? list.map((q: any) => {
              const { _id } = q
              return (
                <QuestionCard
                  key={_id}
                  {...q}
                ></QuestionCard>
              )
            })
          : !loading && <Empty description='暂无数据' />}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}></ListPage>
      </div>
    </>
  )
}

export default Star
