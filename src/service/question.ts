import request, { ResDataType } from './axios'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await request.get(url)) as ResDataType
  return data
}

export async function createQuestionService() {
  const url = `/api/question`
  const data = (await request.post(url)) as ResDataType
  return data
}

export async function getQuestionListService(opt: Partial<SearchOption> = {}) {
  const url = '/api/question'
  const data = (await request.get(url, { params: opt })) as ResDataType
  return data
}

export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
) {
  const url = `/api/question/${id}`
  const data = (await request.patch(url, opt)) as ResDataType
  return data
}

export async function duplicateQuestionService(id: string) {
  const url = `/api/question/duplicate/${id}`
  const data = (await request.post(url)) as ResDataType
  return data
}

export async function deleteQuestionService(ids: string[]) {
  const url = '/api/question'
  const data = await request.delete(url, { data: { ids } })
  return data
}
