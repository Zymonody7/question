import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { ComponentPropsType } from '../../components/QuestionComponents'
import cloneDeep from 'lodash.clonedeep'
import { getNextSelectedId, insertNewComponent } from './utils'
import { arrayMove } from '@dnd-kit/sortable'
export type ComponentsInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: {}
}

export type ComponentsStateType = {
  componentList: Array<ComponentsInfoType>
  selectedId: string
  copiedComponent: ComponentsInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null
}

export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload
    },
    changeSelectedId: (
      draft: ComponentsStateType,
      action: PayloadAction<string>
    ) => {
      draft.selectedId = action.payload
    },
    addComponent: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsInfoType>
    ) => {
      // state.componentList.concat(action.payload)
      insertNewComponent(state, action.payload)
    },
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: string; newProps: ComponentPropsType }>
    ) => {
      const { id, newProps } = action.payload
      const index = state.componentList.findIndex(
        (c) => c.fe_id === state.selectedId
      )
      if (index > 0) {
        const curCmp = state.componentList[index]
        curCmp.props = {
          ...curCmp.props,
          ...newProps
        }
        state.componentList.splice(index, 1, curCmp)
      }
    },
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = state
      const newSelectedId = getNextSelectedId(removeId, componentList)
      console.log('删之前', state.selectedId)

      state.selectedId = newSelectedId
      console.log('删之后', state.selectedId)
      const index = componentList.findIndex((c) => c.fe_id === removeId)
      componentList.splice(index, 1)
    },
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList = [] } = state
      const { fe_id, isHidden } = action.payload

      let newSelectedId = ''
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList)
      } else {
        newSelectedId = fe_id
      }

      state.selectedId = newSelectedId
      const curCmp = componentList.find((c) => c.fe_id === fe_id)
      if (curCmp) {
        curCmp.isHidden = isHidden
      }
    },
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload
      const index = state.componentList.findIndex((c) => c.fe_id === fe_id)

      const curCmp = state.componentList[index]
      curCmp.isLocked = !curCmp.isLocked
      state.componentList.splice(index, 1, curCmp)
    },
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state
      const selectedComponent = componentList.find(
        (c) => c.fe_id === selectedId
      )
      if (selectedComponent == null) return
      state.copiedComponent = cloneDeep(selectedComponent)
    },
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state
      if (copiedComponent == null) return

      copiedComponent.fe_id = nanoid()
      insertNewComponent(state, copiedComponent)
    },
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      )
      if (selectedIndex < 0) return // 未选中
      if (selectedIndex <= 0) return //选中第一个，无法往上选
      state.selectedId = componentList[selectedIndex - 1].fe_id
    },
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      )
      if (selectedIndex < 0) return // 未选中
      if (selectedIndex + 1 === componentList.length) return //选中最后一个，无法往下选
      state.selectedId = componentList[selectedIndex + 1].fe_id
    },
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      const { title, fe_id } = action.payload
      const index = state.componentList.findIndex((c) => c.fe_id === fe_id)
      if (index > 0) state.componentList[index].title = title
    },
    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList: curComponentList } = state
      const { oldIndex, newIndex } = action.payload
      state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
      // console.log(arrayMove(curComponentList, oldIndex, newIndex))
    }
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent
} = componentSlice.actions

export default componentSlice.reducer
