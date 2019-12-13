import axiosService from './../commons/axiosService'
import { API_URL, API_NGUOIDUNG_ENDPOIN } from './../constants'

const endpoin = API_NGUOIDUNG_ENDPOIN

export const getListTask = () => {
  return axiosService.get(`${API_URL}${endpoin}`)
}

export const deleteTask = id => {
  return axiosService.delete(`${API_URL}${endpoin}/${id}`)
}

export const addTask = nguoiDung => {
  return axiosService.post(`${API_URL}${endpoin}`, nguoiDung)
}

export const editTask = nguoiDung => {
  return axiosService.put(
    `${API_URL}${endpoin}/${nguoiDung.maTaiKhoan}`,
    nguoiDung
  )
}
