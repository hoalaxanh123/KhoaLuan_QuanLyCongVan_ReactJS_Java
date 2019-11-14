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
  Message('DEBUG: GET LIST LoaiCongVan OK<br/>', 'success')
  return {
    type: taskConstant.FETCH_LOAICONGVAN_SUCCESS,
    payload: data
  }
}

//If error,
export const fetchListTaskFail = error => {
  Message('DEBUG: GET LIST LoaiCongVan not OK<br/>' + error, 'error')
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
          dispatch(deleteTask(id))
        })
        .catch(error => {
          Message(
            `Error when:<br/>Action: delete<br/>Loại công văn ID: ${id}<br/>Error: ${Error}`,
            'error'
          )
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
