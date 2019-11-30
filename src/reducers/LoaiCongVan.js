import * as typeContants from './../constants/task'
import Message from './../method/Message'
const initialState = { byId: [] }

let deleteLoaiCongVan = (state, action) => {
  let lst = [...state.byId]
  let index = lst.findIndex(x => String(x.maLoai) === String(action.id))
  lst.splice(index, 1)
  return lst
}
let addLoaiCongVan = (state, action) => {
  let lst = [...state.byId]
  lst.push(action.loaiCongVan)
  return lst
}
let editLoaiCongVan = (state, action) => {
  debugger
  let lst = [...state.byId]
  var index = lst.findIndex(x => x.maLoai === action.loaiCongVan.maLoai)
  lst[index] = action.loaiCongVan
  return lst
}

const loaiCongVanReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeContants.FETCH_LOAICONGVAN:
      return { ...state, byId: [] }

    case typeContants.FETCH_LOAICONGVAN_SUCCESS:
      if (action.payload.length === 0)
        Message(
          `Get data success but nothing to show`,
          'error',
          3000,
          'WARNING',
          'Lấy danh sách công văn'
        )
      else
        Message(
          `Get list 'loại công văn' success `,
          'success',
          3000,
          'DONE',
          'Lấy danh sách công văn'
        )
      return { ...state, byId: action.payload }

    case typeContants.FETCH_LOAICONGVAN_FAIL:
      return { ...state, byId: [] }

    case typeContants.DELETE_LOAICONGVAN:
      let lst = deleteLoaiCongVan(state, action)
      Message('Xoá thành công', 'success', 3000, 'DONE', 'Xoá loại công văn')
      return { ...state, byId: lst }

    case typeContants.ADD_LOAICONGVAN:
      let lst2 = addLoaiCongVan(state, action)
      Message('Thêm thành công', 'success', 3000, 'DONE', 'Xoá loại công văn')
      return { ...state, byId: lst2 }

    case typeContants.EDIT_LOAICONGVAN:
      let lst3 = editLoaiCongVan(state, action)
      Message('Sửa thành công', 'success', 3000, 'DONE', 'Sửa lĩnh vực')
      return { ...state, byId: lst3 }
    default:
      return state
  }
}
export default loaiCongVanReducer
