import * as taskContants from './../constants/task'
import Message from './../method/Message'
const initialState = { listTask: [] }

let deleteTask = (state, action) => {
  let lst = [...state.listTask]
  let index = lst.findIndex(x => String(x.id) === String(action.id))
  lst.splice(index, 1)
  return lst
}
let editCongVan = (state, action) => {
  let lst = [...state.listTask]
  var index = lst.findIndex(x => x.id === action.congVan.id)
  lst[index] = action.congVan
  return lst
}
const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskContants.FETCH_TASK:
      return { ...state, listTask: [] }
    case taskContants.FETCH_TASK_SUCCESS:
      if (action.payload.length === 0)
        Message(
          `Get data success but nothing to show`,
          'warning',
          3000,
          'DONE',
          'Lấy danh sách công văn'
        )
      // else
      //   Message(
      //     `Get list 'công văn' success `,
      //     'success',
      //     3000,
      //     'DONE',
      //     'Lấy danh sách công văn'
      //   )
      return { ...state, listTask: action.payload }
    case taskContants.FETCH_TASK_FAIL:
      console.log('Error get api :', action.payload)
      return { ...state, listTask: [] }
    case taskContants.DELETE_TASK:
      let lst = deleteTask(state, action)
      Message(
        `Susscess <br/>- Action: delete<br/>- TaskID: ${action.id}`,
        'success'
      )
      return { ...state, listTask: lst }
    case taskContants.EDIT_TASK:
      let lst3 = editCongVan(state, action)
      Message(
        'Sửa thành công',
        'success',
        3000,
        'DONE',
        'Sửa metadata công văn'
      )
      return { ...state, listTask: lst3 }
    default:
      return state
  }
}
export default TaskReducer
