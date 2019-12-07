import { trackPromise } from 'react-promise-tracker'
import * as apiLinhVuc from './../apis/linhVuc'
import * as taskConstant from './../constants/task'
import Message from './../method/Message'
import { message } from 'antd'

//Step 0: fetchGetList to call API
//Step 1: dispatch(fetchListTask()) to reset state 'task' to empty ([])
//Step 2: if success, dispatch(fetchListTaskSuccess(res.data)) to return data ( will parse to state 'task')
//Step 3: if error, dispatch(fetchListTaskFail(res.data)) to return error
export const fetchGetList = () => {
  return dispatch => {
    dispatch(fetchListTask()) // to reset state 'task' to empty ([])
    trackPromise(
      apiLinhVuc
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
    type: taskConstant.FETCH_LINHVUC
  }
}

//If success, set state task = data
export const fetchListTaskSuccess = data => {
  console.log('DEBUG: GET LIST LINHVUC OK', 'success')
  return {
    type: taskConstant.FETCH_LINHVUC_SUCCESS,
    payload: data
  }
}

//If error,
export const fetchListTaskFail = error => {
  console.error('Lấy danh sách loại công văn bị lỗi\n', error)
  message.error('Lấy danh sách loại công văn bị lỗi ' + error, 10)
}

//Delete a task
export const deleteTask_Request = id => {
  return dispatch => {
    trackPromise(
      apiLinhVuc
        .deleteTask(id)
        .then(res => {
          dispatch(deleteTask(id))
        })
        .catch(error => {
          Message(error, 'error', 3000, 'ERROR', 'Xoá lĩnh vực')
        })
    )
  }
}
export const deleteTask = id => {
  return {
    type: taskConstant.DELETE_LINHVUC,
    id: id
  }
}

//add a task
export const addTask_Request = linhVuc => {
  return dispatch => {
    trackPromise(
      apiLinhVuc
        .addTask(linhVuc)
        .then(res => {
          linhVuc.maLinhVuc = res.data.maLinhVuc
          dispatch(addTask(linhVuc))
        })
        .catch(error => {
          Message(error, 'error', 3000, 'ERROR', 'Thêm lĩnh vực')
        })
    )
  }
}
export const addTask = linhVuc => {
  return {
    type: taskConstant.ADD_LINHVUC,
    linhVuc: linhVuc
  }
}

//edit a task
export const editTask_Request = linhVuc => {
  return dispatch => {
    trackPromise(
      apiLinhVuc
        .editTask(linhVuc)
        .then(res => {
          dispatch(editTask(linhVuc))
        })
        .catch(error => {
          Message(error, 'error', 3000, 'ERROR', 'Sửa lĩnh vực')
        })
    )
  }
}
export const editTask = linhVuc => {
  return {
    type: taskConstant.EDIT_LINHVUC,
    linhVuc: linhVuc
  }
}
