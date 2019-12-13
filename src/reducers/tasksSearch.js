import * as taskContants from './../constants/task'
import Message from './../method/Message'
const initialState = { listTask: [] }

let deleteTask = (state, action) => {
  let lst = [...state.listTask]
  let index = lst.findIndex(x => String(x.id) === String(action.id))
  lst.splice(index, 1)
  return lst
}

const CongVanSearch = (state = initialState, action) => {
  switch (action.type) {
    case taskContants.FETCH_CONGVAN_SEARCH:
      return { ...state, listTask: [] }
    case taskContants.FETCH_CONGVAN_SEARCH_SUCCESS:
      if (action.payload.length === 0)
        Message(
          `Get data success but nothing to show`,
          'warning',
          3000,
          'DONE',
          'Lấy danh sách công văn'
        )
      return { ...state, listTask: action.payload }
    case taskContants.FETCH_CONGVAN_SEARCH_FAIL:
      console.log('Error get api :', action.payload)
      return { ...state, listTask: [] }
    case taskContants.DELETE_TASK:
      let lst = deleteTask(state, action)
      Message(
        `Susscess <br/>- Action: delete<br/>- TaskID: ${action.id}`,
        'success'
      )
      return { ...state, listTask: lst }
    default:
      return state
  }
}
export default CongVanSearch
