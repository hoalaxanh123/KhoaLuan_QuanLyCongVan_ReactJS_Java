import axiosService from './../commons/axiosService'
import { API_URL, API_LOAICONGVAN_ENDPOIN } from './../constants'

const endpoin = API_LOAICONGVAN_ENDPOIN

export const getListTask = () => {
  return axiosService.get(`${API_URL}${endpoin}`)
}

export const deleteTask = id => {
  return axiosService.delete(`${API_URL}${endpoin}/${id}`)
}
