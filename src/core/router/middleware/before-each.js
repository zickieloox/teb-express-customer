import Browser from '@core/helpers/browser'
import AuthService from '@core/services/auth'
import ShopService from '@core/services/shop'
import S3Service from '@core/services/s3'

// eslint-disable-next-line
const beforeEach = (router, store) => {
  router.beforeEach(async (to, from, next) => {
    // Logout
    if (
      to.fullPath.startsWith('/logout') ||
      (!store.getters['auth/isSeller'] && AuthService.isAuthenticated())
    ) {
      AuthService.clear()
      ShopService.clear()
      S3Service.destroy()
      Browser.redirect('/')
      return
    }

    // Login
    if (to.fullPath.startsWith('/sign-in') && AuthService.isAuthenticated()) {
      Browser.redirect('/')
      return
    }

    // No required auth
    if (to.meta.noAuthRequired) {
      return next()
    }
    if (!AuthService.isAuthenticated() && !to.fullPath.startsWith('/sign-in')) {
      const path = encodeURIComponent(
        window.location.href.replace(window.location.origin, '')
      )
      const shop_id = ShopService.getId()

      if (shop_id && !from.fullPath.startsWith('/404')) {
        return next({ path: `/sign-in?path=${path}&shop_id=${shop_id}` })
      } else if (!from.fullPath.startsWith('/404')) {
        return next({ path: `/sign-in?path=${path}` })
      } else {
        return next({ path: `/sign-in` })
      }
    }

    if (store.getters['auth/isSeller']) {
      if (['shop-select', 'shop-add'].indexOf(to.name) !== -1) {
        return next()
      }

      const { shop_id } = from.query
      // Handle select shop
      if (!ShopService.getId() || shop_id) {
        const result = await store.dispatch('shop/selectShop', {
          fetch: true,
          id: +shop_id,
        })
        if (!result.success) {
          if (result.noData) {
            return next({ name: 'shop-add' })
          }

          if (result.fetchError) {
            return next({ name: 'shop-select' })
          }
        }
      }

      // Fetch shops
      if (!store.state.shop.shops || !store.state.shop.shops.length) {
        store.dispatch('shop/fetchShops')
      }
    }

    return next()
  })
}

export default beforeEach
