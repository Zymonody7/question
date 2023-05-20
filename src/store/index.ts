import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentReducer'
import pageinfoReducer, { PageInfoType } from './pageinfoReducer'

export type StateType = {
  user: UserStateType
  components: ComponentsStateType
  pageInfo: PageInfoType
}
export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
    pageInfo: pageinfoReducer
  }
})
