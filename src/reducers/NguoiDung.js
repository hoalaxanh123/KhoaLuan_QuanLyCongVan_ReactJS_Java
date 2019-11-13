import * as typeContants from './../constants/task'
import Message from './../method/Message'
const initialState = { byId: [] }

let deleteNguoiDung = (state, action) => {
  let lst = [...state.byId]
  let index = lst.findIndex(x => String(x.id) === String(action.id))
  lst.splice(index, 1)
  return lst
}

const NguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeContants.FETCH_NGUOIDUNG:
      return { ...state, byId: [] }
    case typeContants.FETCH_NGUOIDUNG_SUCCESS:
      if (action.payload.length === 0)
        Message(`Get data success but nothing to show`, 'error')
      else Message(`Get data success `, 'success')
      return { ...state, byId: action.payload }
    case typeContants.FETCH_NGUOIDUNG_FAIL:
      console.log('Error get api :', action.payload)
      return { ...state, byId: [] }
    case typeContants.DELETE_NGUOIDUNG:
      let lst = deleteNguoiDung(state, action)
      Message(
        `Susscess <br/>- Action: delete<br/>- TaskID: ${action.id}`,
        'success'
      )
      return { ...state, listTask: lst }
    default:
      return state
  }
}
export default NguoiDungReducer
