export function createOrder(value) {
  switch (value) {
    case '1':
      return false
    case '2':
      return true
    case '3':
      return false
    case '4':
      return false
    case '5':
      return false
    case '6':
      return false
    case '7':
      return false
    default:
      return false
  }
}
export function print(status) {
  switch (status) {
    case '1':
      return false
    case '2':
      return true
    case '3':
      return true
    case '4':
      return true
    case '5':
      return true
    case '6':
      return true
    case '7':
      return true
    default:
      return false
  }
}

export function cancelOrder(status) {
  switch (status) {
    case '1':
      return false
    case '2':
      return true
    case '3':
      return false
    case '4':
      return false
    case '5':
      return false
    case '6':
      return false
    case '7':
      return false
  }
}
