import axiosService from './../commons/axiosService'
import { API_URL, API_LOAICONGVAN_ENDPOIN } from './../constants'

const endpoin = API_LOAICONGVAN_ENDPOIN

export const getListTask = () => {
  return axiosService.get(`${API_URL}${endpoin}`)
}

export const deleteTask = id => {
  return axiosService.delete(`${API_URL}${endpoin}/${id}`)
}

export const addTask = loaiCongvan => {
  return axiosService.post(`${API_URL}${endpoin}`, loaiCongvan)
}

export const editTask = loaiCongvan => {
  return axiosService.put(
    `${API_URL}${endpoin}/${loaiCongvan.maLoai}`,
    loaiCongvan
  )
}
