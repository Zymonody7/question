import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM } from '../../constant'
const { Search } = Input
const ListSearch: React.FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM) || ''
    setValue(curVal)
  }, [searchParams])
  const [value, setValue] = useState('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const handleSearch = (value: string) => {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM}=${value}`
    })
  }
  return (
    <Search
      placeholder='输入关键字'
      onSearch={handleSearch}
      onChange={handleChange}
      value={value}
      size='large'
      allowClear
      style={{ width: '300px' }}
    />
  )
}

export default ListSearch
