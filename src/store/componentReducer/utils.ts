import { ComponentsInfoType, ComponentsStateType } from '.'

export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentsInfoType[]
) {
  const visibleComponent = componentList.filter((c) => !c.isHidden)
  const index = visibleComponent.findIndex((c) => c.fe_id === fe_id)
  if (index < 0) return ''

  let newSelectedId = ''
  const length = visibleComponent.length
  if (length <= 1) {
    newSelectedId = ''
  } else {
    if (index + 1 === length) {
      newSelectedId = visibleComponent[index - 1].fe_id
    } else {
      newSelectedId = visibleComponent[index + 1].fe_id
    }
  }
  return newSelectedId
}

export function insertNewComponent(
  state: ComponentsStateType,
  newComponent: ComponentsInfoType
) {
  const { selectedId } = state
  const index = state.componentList.findIndex((c) => c.fe_id === selectedId)
  if (index < 0) {
    state.componentList.push(newComponent)
  } else {
    state.componentList.splice(index + 1, 0, newComponent)
  }
}
