import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './List.module.scss'
import QuestionCard from '../../../components/QuestionCard'
import { useDebounce, useDebounceFn, useRequest, useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '../../../components/ListSearch'
import { getQuestionListService } from '../../../service/question'
import useLoadQuestionListData from '../../../hooks/useLoadQuestionListData'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_DEFAULT,
  LIST_SEARCH_PARAM
} from '../../../constant'
const rowQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '3月10日 13:23'
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '2月10日 13:23'
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '3月14日 13:23'
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createdAt: '3月16日 23:23'
  }
]

const { Title } = Typography

const List: React.FC = () => {
  useTitle('小铭问卷 - 我的问卷')
  // const [questionList, setQuestionList] = useState(rowQuestionList)
  // const [list, setList] = useState([])
  // const [total, setTotal] = useState(0)

  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService()
  //     const { list = [], total = 0 } = data
  //     setList(list)
  //     setTotal(total)
  //   }
  //   load()
  // })

  // const { data = {}, loading } = useRequest(getQuestionListService)
  // const { total = 0, list = [] } = data

  // const { data = {}, loading, error } = useLoadQuestionListData()
  // const { total = 0, list = [] } = data
  const [searchParams] = useSearchParams()

  const [started, setStarted] = useState(false) //标记是否开始加载
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length
  const keyword = searchParams.get(LIST_SEARCH_PARAM) || ''
  // const [loading, setLoading] = useState(false)
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE_DEFAULT,
        keyword
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      }
    }
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      // console.log('load more')
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000
    }
  )
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const loadMoreElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description='暂无数据' />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>加载下一页...</span>
  }, [started, loading, haveMoreData])
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return (
              <QuestionCard
                key={_id}
                {...q}
              ></QuestionCard>
            )
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreElem}</div>
      </div>
    </>
  )
}

export default List
