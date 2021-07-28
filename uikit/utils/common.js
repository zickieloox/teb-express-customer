/**
 * Get value of an object property/path even if it's nested
 */
export function getValueByPath(obj, path) {
  return path.split('.').reduce((o, i) => o[i], obj)
}

export function makeid(length) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  var n = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * n))
  }

  return result
}
