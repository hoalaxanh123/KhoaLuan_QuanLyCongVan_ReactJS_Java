// root reducer

import { combineReducers } from 'redux'
import TaskReducer from './tasks'
import loaiCongVanReducer from './LoaiCongVan'
import linhVucReducer from './LinhVuc'

const rootReducer = combineReducers({
  task: TaskReducer, //Rename to task (this.state.task)
  loaiCongVan: loaiCongVanReducer,
  linhVuc: linhVucReducer
})

export default rootReducer
