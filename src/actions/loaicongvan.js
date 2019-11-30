import { trackPromise } from 'react-promise-tracker'
import * as apiLoaiCongVan from './../apis/loaicongvan'
import * as taskConstant from './../constants/task'
import Message from './../method/Message'

//Step 0: fetchGetList to call API
//Step 1: dispatch(fetchListTask()) to reset state 'task' to empty ([])
//Step 2: if success, dispatch(fetchListTaskSuccess(res.data)) to return data ( will parse to state 'task')
//Step 3: if error, dispatch(fetchListTaskFail(res.data)) to return error
export const fetchGetList = () => {
  return dispatch => {
    dispatch(fetchListTask()) // to reset state 'task' to empty ([])
    trackPromise(
      apiLoaiCongVan
        .getListTask()
        .then(res => {
          dispatch(fetchListTaskSuccess(res.data))
        })
        .catch(error => {
          dispatch(fetchListTaskFail(error))
        })
    )
  }
}

//Reset state task to empty []
export const fetchListTask = () => {
  return {
    type: taskConstant.FETCH_LOAICONGVAN
  }
}

//If success, set state task = data
export const fetchListTaskSuccess = data => {
  console.log('DEBUG: GET LIST LoaiCongVan OK<br/>', 'success')
  return {
    type: taskConstant.FETCH_LOAICONGVAN_SUCCESS,
    payload: data
  }
}

//If error,
export const fetchListTaskFail = error => {
  console.log('DEBUG: GET LIST LoaiCongVan not OK<br/>' + error, 'error')
  return {
    type: taskConstant.FETCH_LOAICONGVAN_FAIL,
    payload: error
  }
}

//Delete a task
export const deleteTask_Request = id => {
  return dispatch => {
    trackPromise(
      apiLoaiCongVan
        .deleteTask(id)
        .then(res => {
          console.log('res :', res)
          dispatch(deleteTask(id))
        })
        .catch(error => {
          Message(error, 'error', 3000, 'ERROR', 'Xoá loại công văn')
        })
    )
  }
}
export const deleteTask = id => {
  return {
    type: taskConstant.DELETE_LOAICONGVAN,
    id: id
  }
}
//add a task
export const addTask_Request = loaiCongVan => {
  return dispatch => {
    trackPromise(
      apiLoaiCongVan
        .addTask(loaiCongVan)
        .then(res => {
          loaiCongVan.maLoai = res.data.maLoai
          dispatch(addTask(loaiCongVan))
        })
        .catch(error => {
          Message(error, 'error', 3000, 'ERROR', 'Thêm loại công văn')
        })
    )
  }
}
export const addTask = loaiCongVan => {
  return {
    type: taskConstant.ADD_LOAICONGVAN,
    loaiCongVan: loaiCongVan
  }
}

//edit a task
export const editTask_Request = loaiCongVan => {
  console.log('loaiCongVan :', loaiCongVan)
  return dispatch => {
    trackPromise(
      apiLoaiCongVan
        .editTask(loaiCongVan)
        .then(res => {
          dispatch(editTask(loaiCongVan))
        })
        .catch(error => {
          Message(error, 'error', 3000, 'ERROR', 'Sửa loại công văn')
        })
    )
  }
}
export const editTask = loaiCongVan => {
  return {
    type: taskConstant.EDIT_LOAICONGVAN,
    loaiCongVan: loaiCongVan
  }
}
