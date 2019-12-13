import { trackPromise } from 'react-promise-tracker'
import * as apiNguoiDung from './../apis/nguoiDung'
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
      apiNguoiDung
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
    type: taskConstant.FETCH_NGUOIDUNG
  }
}

//If success, set state task = data
export const fetchListTaskSuccess = data => {
  // console.log('DEBUG: GET LIST NGUOIDUNG OK')
  return {
    type: taskConstant.FETCH_NGUOIDUNG_SUCCESS,
    payload: data
  }
}

//If error,
export const fetchListTaskFail = error => {
  console.error('Lấy danh sách người dùng bị lỗi\n', error)
  message.error('Lấy danh sách người dùng bị lỗi ' + error, 10)
  return {
    type: taskConstant.FETCH_NGUOIDUNG_FAIL,
    payload: error
  }
}

//Delete a task
export const deleteTask_Request = id => {
  return dispatch => {
    trackPromise(
      apiNguoiDung
        .deleteTask(id)
        .then(res => {
          dispatch(deleteTask(id))
        })
        .catch(error => {
          Message(error, 'error', 3000, 'ERROR', 'Xoá người dùng')
        })
    )
  }
}
export const deleteTask = id => {
  return {
    type: taskConstant.DELETE_NGUOIDUNG,
    id: id
  }
}

//add a task
export const addTask_Request = nguoiDung => {
  return dispatch => {
    trackPromise(
      apiNguoiDung
        .addTask(nguoiDung)
        .then(res => {
          nguoiDung.maTaiKhoan = res.data.maTaiKhoan
          dispatch(addTask(nguoiDung))
        })
        .catch(error => {
          Message(error, 'error', 3000, 'ERROR', 'Thêm người dùng')
        })
    )
  }
}
export const addTask = nguoiDung => {
  return {
    type: taskConstant.ADD_NGUOIDUNG,
    nguoiDung: nguoiDung
  }
}

//edit a task
export const editTask_Request = nguoiDung => {
  return dispatch => {
    trackPromise(
      apiNguoiDung
        .editTask(nguoiDung)
        .then(res => {
          dispatch(editTask(nguoiDung))
        })
        .catch(error => {
          Message(error, 'error', 3000, 'ERROR', 'Sửa thông tin người dùng')
        })
    )
  }
}
export const editTask = nguoiDung => {
  return {
    type: taskConstant.EDIT_NGUOIDUNG,
    nguoiDung: nguoiDung
  }
}
