//API_ENDPOIN is a link to API example: localhost:8000/
export const API_URL = 'http://localhost:9999/api/'
//API READ FILE
export const API_URL_UPFILE = 'http://localhost:9999/api/readFile'
//API DOWNLOAD FILE
export const API_URL_DOWNFILE = 'http://localhost:9999/api/downloadFile'
//task == Công văn
export const API_CONGVAN_ENDPOIN = 'congvan'
export const CONGVAN = 'congvan'
//Loại công văn
export const API_LOAICONGVAN_ENDPOIN = 'loaicongvan'
export const LOAICONGVAN = 'loaicongvan'
//Lĩnh  vực
export const API_LINHVUC_ENDPOIN = 'linhvuc'
export const LINHVUC = 'linhVuc'
//Tài khoản
export const API_NGUOIDUNG_ENDPOIN = 'taikhoan'
export const NGUOIDUNG = 'taikhoan'
//Show Debug message ?
export const DEBUG_MESSAGE = true
//Show message ?
export const SHOW_MESSAGE = true

export function Copy(input) {
  var copyText = input
  copyText.select()
  copyText.setSelectionRange(0, 99999)
  document.execCommand('copy')
  alert('Copied the text: ' + copyText.value)
}
