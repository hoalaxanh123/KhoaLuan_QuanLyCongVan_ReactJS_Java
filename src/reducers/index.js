// root reducer

import { combineReducers } from 'redux'
import TaskReducer from './tasks'
import loaiCongVanReducer from './LoaiCongVan'
import linhVucReducer from './LinhVuc'
import nguoiDungReducer from './NguoiDung'
import CongVanSearch from './tasksSearch'

const rootReducer = combineReducers({
  task: TaskReducer, //Rename to task (this.state.task)
  loaiCongVan: loaiCongVanReducer,
  linhVuc: linhVucReducer,
  nguoiDung: nguoiDungReducer,
  congVanSearch: CongVanSearch
})

export default rootReducer
