import * as typeContants from './../constants/task'
import Message from './../method/Message'
const initialState = { byId: [] }

let deleteLoaiCongVan = (state, action) => {
  let lst = [...state.byId]
  let index = lst.findIndex(x => String(x.maLoai) === String(action.id))
  lst.splice(index, 1)
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
    default:
      return state
  }
}
export default loaiCongVanReducer
