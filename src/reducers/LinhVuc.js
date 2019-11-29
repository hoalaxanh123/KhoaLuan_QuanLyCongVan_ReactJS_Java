import * as typeContants from './../constants/task'
import Message from './../method/Message'
const initialState = { byId: [] }

let deletelinhVuc = (state, action) => {
  let lst = [...state.byId]
  let index = lst.findIndex(x => String(x.maLinhVuc) === String(action.id))
  lst.splice(index, 1)
  return lst
}
let addLinhVuc = (state, action) => {
  let lst = [...state.byId]
  lst.push(action.linhVuc)
  return lst
}
let editLinhVuc = (state, action) => {
  debugger
  let lst = [...state.byId]
  var index = lst.findIndex(x => x.maLinhVuc === action.linhVuc.maLinhVuc)
  lst[index] = action.linhVuc
  return lst
}
const linhVucReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeContants.FETCH_LINHVUC:
      return { ...state, byId: [] }
    case typeContants.FETCH_LINHVUC_SUCCESS:
      if (action.payload.length === 0)
        Message(`Get data success but nothing to show`, 'error', 10000)
      else Message(`Get list 'lĩnh vực' success `, 'success')
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

    case typeContants.ADD_LINHVUC:
      let lst2 = addLinhVuc(state, action)
      Message(`Susscess <br/>- Action: Add new LinhVuc<br/>- `, 'success')
      return { ...state, byId: lst2 }

    case typeContants.EDIT_LINHVUC:
      let lst3 = editLinhVuc(state, action)
      Message(`Susscess <br/>- Action: Edit LinhVuc<br/>- `, 'success')
      return { ...state, byId: lst3 }
    default:
      return state
  }
}
export default linhVucReducer
