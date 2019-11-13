// root reducer

import { combineReducers } from 'redux'
import TaskReducer from './tasks'
import loaiCongVanReducer from './LoaiCongVan'
import linhVucReducer from './LinhVuc'
import nguoiDungReducer from './NguoiDung'

const rootReducer = combineReducers({
  task: TaskReducer, //Rename to task (this.state.task)
  loaiCongVan: loaiCongVanReducer,
  linhVuc: linhVucReducer,
  nguoiDung: nguoiDungReducer
})

export default rootReducer
