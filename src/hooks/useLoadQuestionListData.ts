import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../service/question'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_DEFAULT,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM
} from '../constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar = false, isDeleted = false } = opt
  const [searchParams] = useSearchParams()
  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize =
        parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
        LIST_PAGE_SIZE_DEFAULT
      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize
      })
      return data
    },
    {
      refreshDeps: [searchParams]
    }
  )
  return { loading, data, error, refresh }
}

export default useLoadQuestionListData
