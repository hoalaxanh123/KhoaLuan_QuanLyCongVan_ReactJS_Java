import { trackPromise } from 'react-promise-tracker'
import * as apiNguoiDung from './../apis/nguoiDung'
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
  Message('DEBUG: GET LIST NGUOIDUNG OK<br/>', 'success')
  return {
    type: taskConstant.FETCH_NGUOIDUNG_SUCCESS,
    payload: data
  }
}

//If error,
export const fetchListTaskFail = error => {
  Message('DEBUG: GET LIST NGUOIDUNG not OK<br/>' + error, 'error')
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
          Message(
            `Error when:<br/>Action: delete<br/>Tài khoản ID: ${id}<br/>Error: ${Error}`,
            'error'
          )
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
