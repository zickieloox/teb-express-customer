<template>
  <div></div>
</template>
<script>
import { mapActions } from 'vuex'
import AuthService from '@core/services/auth'
import ShopService from '@core/services/shop'
export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        user_referring_code: null,
        phone_number: '',
      },
      result: { success: false, message: '' },
      shop_name: '',
      country_code: '',
      isLoading: false,
    }
  },
  created() {
    window.localStorage.clear()
    AuthService.clear()
    ShopService.clear()
    const url = new URL(window.location.href)
    const token = url.searchParams.get('token')
    this.getUserInfo(token)
  },

  methods: {
    ...mapActions('auth', ['accessShop']),

    async getUserInfo(token) {
      this.result = await this.accessShop({ token: token })
      if (this.result && this.result.success) {
        window.location.replace('/')
      } else if (this.result && this.result.message) {
        this.$toast.open({
          type: 'error',
          message: this.result.message,
        })
      }
    },
  },
}
</script>
