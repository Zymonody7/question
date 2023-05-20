import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent
} from '../store/componentReducer'
const isActiveElementValid = () => {
  const activeElem = document.activeElement
  if (activeElem === document.body) return true
  if (activeElem?.matches('div[role="button"]')) return true
  return false
}
const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()
  // 删除
  useKeyPress(['backspace', 'delete'], () => {
    if (isActiveElementValid()) {
      dispatch(removeSelectedComponent())
    }
  })
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
}

export default useBindCanvasKeyPress
