import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_DEFAULT,
  LIST_PAGE_SIZE_PARAM_KEY
} from '../../constant/index'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
interface ListPageProps {
  total: number
}
const ListPage: React.FC<ListPageProps> = ({ total }) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE_DEFAULT)

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const current = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || 10
    setCurrent(current)
    setPageSize(pageSize)
  }, [searchParams])
  const nav = useNavigate()
  const { pathname } = useLocation()
  const handlePageChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page + '')
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize + '')
    nav({
      pathname,
      search: searchParams.toString()
    })
  }
  return (
    <Pagination
      total={total}
      current={current}
      pageSize={pageSize}
      onChange={handlePageChange}
    ></Pagination>
  )
}

export default ListPage
