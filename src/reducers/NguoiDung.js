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
        Message(
          `Get data success but nothing to show`,
          'warning',
          3000,
          'DONE',
          'Lấy danh sách người dùng'
        )
      // else
      //   Message(
      //     `Get list 'tài khoản' success `,
      //     'success',
      //     3000,
      //     'DONE',
      //     'Lấy danh sách người dùng'
      //   )
      return { ...state, byId: action.payload }
    case typeContants.FETCH_NGUOIDUNG_FAIL:
      console.log('Error get api :', action.payload)
      return { ...state, byId: [] }
    case typeContants.DELETE_NGUOIDUNG:
      let lst = deleteNguoiDung(state, action)
      Message('Xoá thành công', 'success', 3000, 'DONE', 'Xoá người dùng')
      return { ...state, byId: lst }
    case typeContants.ADD_NGUOIDUNG:
      let lst2 = addNguoiDung(state, action)
      Message('Thêm thành công', 'success', 3000, 'DONE', 'Thêm người dùng')
      return { ...state, byId: lst2 }

    case typeContants.EDIT_NGUOIDUNG:
      let lst3 = editNguoiDung(state, action)
      Message(
        'Sửa thành công',
        'success',
        3000,
        'DONE',
        'Sửa thông tin người dùng'
      )
      return { ...state, byId: lst3 }
    default:
      return state
  }
}
export default NguoiDungReducer
