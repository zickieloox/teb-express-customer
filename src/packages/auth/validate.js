import { isEmail, isPhone } from '@core/utils/validate'

function validFullname(fullname) {
  if (!fullname) return 'Vui lòng không để trống!'
  return true
}

function validPackage(pkg) {
  if (!pkg) return 'Vui lòng chọn quy mô vận chuyển!'
  return true
}

function validPhone(phone) {
  if (!phone) return 'Vui lòng không để trống!'
  if (!isPhone(phone)) return 'Số điện thoại không hợp lệ'
  return true
}

function validEmail(email) {
  if (!email) return 'Vui lòng không để trống!'
  if (!isEmail(email)) return 'Email không hợp lệ'
  return true
}

function validPassword(password) {
  if (!password) return 'Vui lòng không để trống!'
  if (password.length < 6) return 'Mật khẩu tối thiểu phải có 6 ký tự'
  return true
}

export const signup = {
  errors: {},

  isValid(user) {
    let valid = true
    this.clean()

    if (!this.validFullname(user.fullname)) {
      valid = false
    }

    if (!this.validPackage(user.package)) {
      valid = false
    }

    if (!this.validPhone(user.phone)) {
      valid = false
    }

    if (!this.validEmail(user.email)) {
      valid = false
    }

    if (!this.validPassword(user.password)) {
      valid = false
    }

    return valid
  },

  validFullname(fullname) {
    this.clean('fullname')
    const msg = validFullname(fullname)
    if (msg === true) return true

    this.errors.fullname = msg
    return false
  },

  validPackage(pkg) {
    this.clean('package')
    const msg = validPackage(pkg)
    if (msg === true) return true

    this.errors.package = msg
    return false
  },

  validPhone(phone) {
    this.clean('phone')
    const msg = validPhone(phone)
    if (msg === true) return true

    this.errors.phone = msg
    return false
  },

  validEmail(email) {
    this.clean('email')
    const msg = validEmail(email)
    if (msg === true) return true

    this.errors.email = msg
    return false
  },

  validPassword(password) {
    this.clean('password')
    const msg = validPassword(password)
    if (msg === true) return true

    this.errors.password = msg
    return false
  },

  hasError(name) {
    return !!this.errors[name]
  },
  error(name) {
    return this.errors[name]
  },
  clean(name) {
    if (name) {
      delete this.errors[name]
    } else {
      this.errors = {}
    }
  },
}

export const signin = {
  errors: {},

  isValid({ email, password }) {
    let valid = true
    this.clean()

    if (!this.validEmail(email)) {
      valid = false
    }

    if (!this.validPassword(password)) {
      valid = false
    }

    return valid
  },

  validEmail(email) {
    this.clean('email')
    if (!email) {
      this.errors.email = 'Vui lòng không để trống!'
      return false
    }

    return true
  },

  validPassword(password) {
    this.clean('password')
    const msg = validPassword(password)
    if (msg === true) return true

    this.errors.password = msg
    return false
  },

  hasError(name) {
    return !!this.errors[name]
  },
  error(name) {
    return this.errors[name]
  },
  clean(name) {
    if (name) {
      delete this.errors[name]
    } else {
      this.errors = {}
    }
  },
}
