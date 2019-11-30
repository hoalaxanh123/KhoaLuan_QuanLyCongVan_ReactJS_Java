import * as typeContants from './../constants/task'
import Message from './../method/Message'
const initialState = { byId: [] }

let deleteNguoiDung = (state, action) => {
  let lst = [...state.byId]
  let index = lst.findIndex(x => String(x.maTaiKhoan) === String(action.id))
  lst.splice(index, 1)
  return lst
}
let addNguoiDung = (state, action) => {
  let lst = [...state.byId]
  lst.push(action.nguoiDung)
  return lst
}
let editNguoiDung = (state, action) => {
  debugger
  let lst = [...state.byId]
  var index = lst.findIndex(x => x.maTaiKhoan === action.nguoiDung.maTaiKhoan)
  lst[index] = action.nguoiDung
  return lst
}
const NguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeContants.FETCH_NGUOIDUNG:
      return { ...state, byId: [] }
    case typeContants.FETCH_NGUOIDUNG_SUCCESS:
      if (action.payload.length === 0)
        Message(`Get data success but nothing to show`, 'error')
      else Message(`Get list 'tài khoản' success `, 'success')
      return { ...state, byId: action.payload }
    case typeContants.FETCH_NGUOIDUNG_FAIL:
      console.log('Error get api :', action.payload)
      return { ...state, byId: [] }
    case typeContants.DELETE_NGUOIDUNG:
      debugger
      let lst = deleteNguoiDung(state, action)
      Message(
        `Susscess <br/>- Action: delete<br/>- TaskID: ${action.id}`,
        'success'
      )
      return { ...state, byId: lst }
    case typeContants.ADD_NGUOIDUNG:
      let lst2 = addNguoiDung(state, action)
      Message(`Susscess <br/>- Action: Add new LoaiCongVan<br/>- `, 'success')
      return { ...state, byId: lst2 }

    case typeContants.EDIT_NGUOIDUNG:
      let lst3 = editNguoiDung(state, action)
      Message(`Susscess <br/>- Action: Edit LoaiCongVan<br/>- `, 'success')
      return { ...state, byId: lst3 }
    default:
      return state
  }
}
export default NguoiDungReducer
