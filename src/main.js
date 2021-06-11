import Vue from 'vue'
import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'
import VueClipboard from 'vue-clipboard2'
import VueCarousel from 'vue-carousel'
import App from './App.vue'
import MainPlugin from './plugins/main'
import VueLazyLoad from 'vue-lazyload'
import VueTour from 'vue-tour'
// import DashboardPlugin from './material-dashboard'
import * as filters from './core/helpers/filters'
import initGlobalDirectives from '@core/vue/directives'
import router from './core/router'
import store from './core/store'
import '../uikit'
import { VclTable } from 'vue-content-loading'
import validationMessagesVi from 'vee-validate/dist/locale/vi'
// import validationMessagesEn from 'vee-validate/dist/locale/en'

Vue.use(VueClipboard)
Vue.use(VeeValidate, { locale: 'vi', dictionary: { vi: validationMessagesVi } })
// Vue.use(VeeValidate, { locale: 'en', dictionary: { en: validationMessagesEn } })
Vue.use(Notifications)
Vue.use(MainPlugin)
Vue.use(VueCarousel)
Vue.use(VueLazyLoad)
Vue.use(VueTour)
Vue.component('VclTable', VclTable)
// Vue.use(DashboardPlugin)
initGlobalDirectives()

VeeValidate.Validator.extend('username', {
  getMessage: () => `Tài khoản chỉ chứa số và chữ cái`,
  validate: (value) => {
    const regex = new RegExp(/^[a-zA-Z0-9]{4,36}$/)
    return regex.test(value)
  },
})
VeeValidate.Validator.extend('phone', {
  getMessage: () =>
    `Nhập số điện thoại từ 10 đến 11 chữ số, bắt đầu bằng 0,84 hoặc +84`,
  validate: (value) => {
    const regex = new RegExp(/^[0-9+()-. ]+$/)
    return regex.test(value)
  },
})
VeeValidate.Validator.extend('phone_number', {
  getMessage: () =>
    `Phone must be in a valid phone number (e.g., 123 456-789).`,
  validate: (value) => {
    /* eslint-disable */
    const regex = new RegExp(
      /^[0-9+()-. ]+$/
      // /\(?([0-9]{2})\)?([ .-]?)([0-9]{2})+$/
    )
    return regex.test(value)
  },
})
VeeValidate.Validator.extend('phone_number_space', {
  getMessage: () => `Your phone number can't end with a blank space`,
  validate: (value) => {
    const regex = new RegExp(/.*[ ]$/)
    return !regex.test(value)
  },
})
VeeValidate.Validator.extend('shop_email', {
  getMessage: () =>
    `Email must be in a valid email format (e.g., you@example.com).`,
  validate: (value) => {
    const regex = new RegExp(
      /^[a-z0-9A-Z_\\.]{1,32}@[a-z0-9A-Z]{2,}(\.[a-z0-9A-Z]{2,4}){1,2}$/
    )
    return regex.test(value)
  },
})

VeeValidate.Validator.extend('fullName', {
  getMessage: () => `Invalid Full Name`,
  validate: (value) => {
    const regex = new RegExp(
      /^([^0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*){0,150}$/
    )
    return regex.test(value)
  },
})
VeeValidate.Validator.extend('shopName', {
  getMessage: () => `Be between 1-100 characters.`,
  validate: (value) => {
    const regex = new RegExp(/^.{1,100}$/)
    return regex.test(value)
  },
})
VeeValidate.Validator.extend('phoneAddress', {
  getMessage: () => `Invalid phone`,
  validate: (value) => {
    /* eslint-disable */
    const regex = new RegExp(
      /^[0-9+()-. ]+$/
      // /\(?([0-9]{2})\)?([ .-]?)([0-9]{2})+$/
    )
    return regex.test(value)
  },
})
VeeValidate.Validator.extend('city', {
  getMessage: () => `Invalid city`,
  validate: (value) => {
    const regex = new RegExp(/^[\s+a-zA-Z0-9_.,\-\u00A1-\uFFFF]{0,50}$/)
    return regex.test(value)
  },
})
VeeValidate.Validator.extend('postcode', {
  getMessage: () => `Invalid postcode`,
  validate: (value) => {
    const regex = new RegExp(/^[a-zA-Z0-9\-\_\ ]{0,11}$/)
    return regex.test(value)
  },
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// Register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
