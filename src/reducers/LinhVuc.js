import * as typeContants from './../constants/task'
import Message from './../method/Message'
const initialState = { byId: [] }

let deletelinhVuc = (state, action) => {
  let lst = [...state.byId]
  let index = lst.findIndex(x => String(x.maLinhVuc) === String(action.id))
  lst.splice(index, 1)
  return lst
}

const linhVucReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeContants.FETCH_LINHVUC:
      return { ...state, byId: [] }
    case typeContants.FETCH_LINHVUC_SUCCESS:
      if (action.payload.length === 0)
        Message(`Get data success but nothing to show`, 'error')
      else Message(`Get data success `, 'success')
      return { ...state, byId: action.payload }
    case typeContants.FETCH_LINHVUC_FAIL:
      console.log('Error get api :', action.payload)
      return { ...state, byId: [] }
    case typeContants.DELETE_LINHVUC:
      let lst = deletelinhVuc(state, action)
      Message(
        `Susscess <br/>- Action: delete<br/>- TaskID: ${action.id}`,
        'success'
      )
      return { ...state, byId: lst }
    default:
      return state
  }
}
export default linhVucReducer
