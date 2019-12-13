import axiosService from '../commons/axiosService'
import { API_URL, API_CONGVAN_ENDPOIN, API_URL_SEARCH } from '../constants'

const endpoin = API_CONGVAN_ENDPOIN

export const getListTask = keyword => {
  return axiosService.postWitoutAuthen(API_URL_SEARCH, keyword)
}

export const addTask = task => {
  return axiosService.post(`${API_URL}${endpoin}`, task)
}

export const deleteTask = id => {
  return axiosService.delete(`${API_URL}${endpoin}/${id}`)
}
