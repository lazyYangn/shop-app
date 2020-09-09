//lacalstorage 本身支持 字符串
//封装目的:为了可替换
export const getArray = (key) => {
  let val = localStorage.getItem(key)
  return val === null ? [] : val.split(',')
}
export const setArray = (key, value) => {
  let arr = getArray(key)
  arr.push(value)
  localStorage.setItem(key, arr.toString())
}
export const clearArray = (key) => {
  localStorage.removeItem(key)
}
export const setCachVal = (key, value) => {
  localStorage.setItem(key, value)
}
export const getCachVal = (key) => {
  return localStorage.getItem(key)
}
export const clearCachVal = () => {
  return localStorage.clear()
}
