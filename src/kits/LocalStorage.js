export const getArray = (key) => {
  let val = localStorage.getItem(key)
  return val === null ? [] : val.split(',')
}
export const setArray = (key, value) => {
  let arr = getArray(key)
  arr.push(value)
  localStorage.setItem(key, arr.toString())
}
