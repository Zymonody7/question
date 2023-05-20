import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../service/question'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentReducer'
import { resetPageInfo } from '../store/pageinfoReducer'

const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  const { data, loading, run, error } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('问卷id异常')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true
    }
  )
  useEffect(() => {
    if (!data) return
    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      componentList = []
    } = data

    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    dispatch(
      resetComponents({ componentList, selectedId: '', copiedComponent: null })
    )

    dispatch(resetPageInfo({ title, desc, js, css }))
  }, [data])
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
