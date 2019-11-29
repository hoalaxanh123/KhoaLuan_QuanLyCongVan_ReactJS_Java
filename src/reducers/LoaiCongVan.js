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
        Message(`Get data success but nothing to show`, 'error')
      else Message(`Get list 'loại công văn' success `, 'success')
      return { ...state, byId: action.payload }

    case typeContants.FETCH_LOAICONGVAN_FAIL:
      console.log('Error get api :', action.payload)
      return { ...state, byId: [] }

    case typeContants.DELETE_LOAICONGVAN:
      let lst = deleteLoaiCongVan(state, action)
      Message(
        `Susscess <br/>- Action: delete<br/>- TaskID: ${action.id}`,
        'success'
      )
      return { ...state, byId: lst }

    case typeContants.ADD_LOAICONGVAN:
      let lst2 = addLoaiCongVan(state, action)
      Message(`Susscess <br/>- Action: Add new LoaiCongVan<br/>- `, 'success')
      return { ...state, byId: lst2 }

    case typeContants.EDIT_LOAICONGVAN:
      let lst3 = editLoaiCongVan(state, action)
      Message(`Susscess <br/>- Action: Edit LoaiCongVan<br/>- `, 'success')
      return { ...state, byId: lst3 }
    default:
      return state
  }
}
export default loaiCongVanReducer
