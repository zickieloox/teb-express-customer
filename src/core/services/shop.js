import { isEmpty } from '@core/utils'
const key = 'shop'

const ShopService = {
  shop: {},
  init() {
    const shop = this.getStorage()

    if (shop && !isEmpty(shop)) {
      this.set(shop, false)
    }
  },

  /**
   * Get shop id
   * @return {*}
   */
  getId() {
    return this.shop.id
  },

  /**
   * Set
   * @param shop
   * @param storage
   */
  set(shop, storage = true) {
    this.shop = shop || {}

    if (storage) {
      this.storage(shop)
    }
  },

  /**
   * Get data from storage
   * @returns {*|{}}
   */
  getStorage() {
    return Storage.get(key, {})
  },

  /**
   * Storage data
   * @param data
   */
  storage(data) {
    Storage.set(key, data)
  },

  /**
   * Clear storage
   */
  clear() {
    Storage.remove(key)
  },
}

export default ShopService
