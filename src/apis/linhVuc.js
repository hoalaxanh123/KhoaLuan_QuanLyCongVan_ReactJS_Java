import axiosService from './../commons/axiosService'
import { API_URL, API_LINHVUC_ENDPOIN } from './../constants'

const endpoin = API_LINHVUC_ENDPOIN

export const getListTask = () => {
  return axiosService.get(`${API_URL}${endpoin}`)
}

export const deleteTask = id => {
  return axiosService.delete(`${API_URL}${endpoin}/${id}`)
}

export const addTask = loaiCongvan => {
  return axiosService.post(`${API_URL}${endpoin}`, loaiCongvan)
}

export const editTask = linhVuc => {
  return axiosService.put(`${API_URL}${endpoin}/${linhVuc.maLinhVuc}`, linhVuc)
}
