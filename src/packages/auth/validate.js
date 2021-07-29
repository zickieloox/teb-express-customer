import { isEmail, isPhone } from '@core/utils/validate'

export const signup = {
  errors: {},

  isValid({ fullname, phone, email, password }) {
    let valid = true
    this.clean()

    if (!this.validFullname(fullname)) {
      valid = false
    }

    if (!this.validPhone(phone)) {
      valid = false
    }

    if (!this.validEmail(email)) {
      valid = false
    }

    if (!this.validPassword(password)) {
      valid = false
    }

    return valid
  },

  validFullname(fullname) {
    this.clean('fullname')
    if (!fullname) {
      this.errors.fullname = 'Vui lòng không để trống!'
      return false
    }

    return true
  },

  validPhone(phone) {
    this.clean('phone')
    if (!phone) {
      this.errors.phone = 'Vui lòng không để trống!'
      return false
    }

    if (!isPhone(phone)) {
      this.errors.phone = 'Số điện thoại không hợp lệ'
      return false
    }

    return true
  },

  validEmail(email) {
    this.clean('email')
    if (!email) {
      this.errors.email = 'Vui lòng không để trống!'
      return false
    }

    if (!isEmail(email)) {
      this.errors.email = 'Email không hợp lệ'
      return false
    }

    return true
  },

  validPassword(password) {
    this.clean('password')
    if (!password) {
      this.errors.password = 'Vui lòng không để trống!'
      return false
    }

    if (password.length < 6) {
      this.errors.password = 'Mật khẩu tối thiểu phải có 6 ký tự'
      return false
    }

    return true
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

  //SIGN IN
  isValidSignin({ email, password }) {
    let valid = true
    this.clean()
    if (!this.validEmailSignin(email)) {
      valid = false
    }
    if (!this.validPassword(password)) {
      valid = false
    }
    return valid
  },

  validEmailSignin(email) {
    this.clean('email')
    if (!email) {
      this.errors.email = 'Vui lòng không để trống!'
      return false
    }

    return true
  },
}
