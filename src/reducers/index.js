// root reducer

import { combineReducers } from 'redux'
import TaskReducer from './tasks'
import loaiCongVanReducer from './LoaiCongVan'

const rootReducer = combineReducers({
  task: TaskReducer, //Rename to task (this.state.task)
  loaiCongVan: loaiCongVanReducer
})

export default rootReducer
