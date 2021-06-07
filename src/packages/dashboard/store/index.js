import api from '../api'
import {
  ORDER_STATUS_CANCELED,
  ORDER_STATUS_FULFILLED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_PROCESS,
} from '@core/constants'

export const FETCH_STATISTIC_ORDERS = 'fetchStatisticOrders'
export const FETCH_STATISTIC_TOP_SALES_COUNTRIES =
  'fetchStatisticTopSalesCountries'
export const GET_PERCENT_TOP_SALES_COUNTRIES = 'getPercentTopSalesCountries'
export const GET_STATISTICS_ORDERS_SELLER = 'getStatisticsOrdersSeller'

export const FETCH_STATISTIC_ORDERS_SUPPLIER = 'fetchStatisticOrdersSupplier'
export const GET_STATISTICS_ORDER_SUPPLIER = 'getStatisticsOrdersSupplier'

export const FETCH_STATISTIC_REF_ACTIVE = 'fetchStatisticRefActive'
export const FETCH_STATISTIC_REF_SALE = 'fetchStatisticRefSale'
export const GET_STATISTIC_REF = 'getStatisticRef'

export const FETCH_ORDERS = 'fetchOrders'
export const FETCH_ORDER_COUNT = 'fetchOrderCount'

export const FETCH_POINT = 'fetchPoint'
export const FETCH_CONTEST_PRODUCT = 'fetchContestProduct'
export const FETCH_NEW_PRODUCT = 'fetchNewProduct'
export const FETCH_COLLECTION = 'fetchCollection'
export const TRANSFER_BALANCE = 'transferBalance'
export const FETCH_ROLE = 'fetchRole'

export const state = {
  statisticOrders: {},
  supplierStatisticOrders: {},
  statisticTopSalesCountries: {},
  statisticRefActive: {},
  statisticRefSale: {},
  orders: [],
  orderCount: 0,
  user_point: 0,
  productCollection: [],
  productNew: [],
  user_role: '',
}

export const mutations = {
  [FETCH_STATISTIC_ORDERS]: (state, payload) => {
    state.statisticOrders = payload
  },
  [FETCH_STATISTIC_TOP_SALES_COUNTRIES]: (state, payload) => {
    state.statisticTopSalesCountries = payload
  },
  [FETCH_STATISTIC_ORDERS_SUPPLIER]: (state, payload) => {
    state.supplierStatisticOrders = payload
  },
  [FETCH_STATISTIC_REF_ACTIVE]: (state, payload) => {
    state.statisticRefActive = payload
  },
  [FETCH_STATISTIC_REF_SALE]: (state, payload) => {
    state.statisticRefSale = payload
  },
  [FETCH_ORDERS]: (state, payload) => {
    state.orders = payload
  },

  [FETCH_ORDER_COUNT]: (state, payload) => {
    state.orderCount = payload
  },

  [FETCH_POINT](state, payload) {
    state.user_point = payload
  },
  [FETCH_ROLE](state, payload) {
    state.user_role = payload
  },
  [FETCH_COLLECTION]: (state, payload) => {
    state.productCollection = payload
  },
  [FETCH_NEW_PRODUCT]: (state, payload) => {
    state.productNew = payload
  },
}

export const actions = {
  /**
   *
   * @param commit
   * @param payload
   * @return {Promise<void>}
   */
  async fetchStatisticOrders({ commit }, payload) {
    let response = await api.fetchStatisticOrders(payload)

    if (!response || response.error) {
      response = {}
    }

    commit(FETCH_STATISTIC_ORDERS, response)
  },

  /**
   *
   * @param commit
   * @param payload
   * @return {Promise<void>}
   */
  async fetchStatisticTopSalesCountries({ commit }, payload) {
    let response = await api.fetchStatisticTopSalesCountries(payload)

    if (!response || response.error) {
      response = {
        countries: {},
      }
    }

    commit(FETCH_STATISTIC_TOP_SALES_COUNTRIES, response.countries)
  },
  async fetchStatisticOrdersSupplier({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchStatisticOrdersSupplier(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = {}
    }

    commit(FETCH_STATISTIC_ORDERS_SUPPLIER, response)
    return result
  },

  async fetchStatisticRefActive({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchStatisticRefActive(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = {}
    }

    commit(FETCH_STATISTIC_REF_ACTIVE, response)
    return result
  },

  async fetchStatisticRefSale({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchStatisticRefSale(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = {}
    }

    commit(FETCH_STATISTIC_REF_SALE, response)
    return result
  },

  async fetchOrders({ commit }, payload) {
    let result = { success: true }
    let [list, count] = await Promise.all([
      api.fetchOrders(payload),
      api.fetchOrderCount(payload),
    ])

    if (!list.orders || !count) {
      list.orders = []
      count = { count: 0 }
      result = {
        success: false,
        message: list.errorMessage || '',
      }
    }

    commit(FETCH_ORDERS, list.orders)
    commit(FETCH_ORDER_COUNT, count.count)

    return result
  },
  async fetchPoint({ commit }) {
    let userPoint = {}
    let isSuccess = { success: false }
    const response = await api.fetchPoint()
    if (response && response.user_point) {
      userPoint = response.user_point.point
      isSuccess = { success: true }
    }
    commit(FETCH_POINT, userPoint)
    commit(FETCH_ROLE, response.user_role)

    return isSuccess
  },

  // eslint-disable-next-line no-empty-pattern
  async fetchContestProduct({ commit }, payload) {
    let result = { success: true }
    let [newproduct, collection] = await Promise.all([
      api.fetchProductBases(payload.new_product),
      api.fetchProductBases(payload.collection),
    ])

    if (!newproduct.products) {
      newproduct.products = []
      result = {
        success: false,
        message: newproduct.errorMessage || '',
      }
    }
    if (!collection.products) {
      collection.products = []
      result = {
        success: false,
        message: collection.errorMessage || '',
      }
    }
    commit(FETCH_NEW_PRODUCT, newproduct.products)
    commit(FETCH_COLLECTION, collection.products)
    return result
  },

  // eslint-disable-next-line
  async [TRANSFER_BALANCE]({ commit }, coin) {
    const res = await api.transferBalance(parseInt(coin))
    if (!res || res.error) {
      return { success: false, message: res.errorMessage }
    }

    return { success: true }
  },
}

const getRouteByStatus = (status) => {
  return { name: 'order-list', query: { status } }
}

const status = {
  pending: {
    icon: 'shopping-cart',
    color: 'warning',
    heading: 'Pending',
    route: getRouteByStatus(ORDER_STATUS_PENDING),
  },
  process: {
    icon: 'collection-folder-image',
    color: 'info',
    heading: 'Process',
    route: getRouteByStatus(ORDER_STATUS_PROCESS),
  },
  fulfilled: {
    icon: 'truck',
    color: 'success',
    heading: 'Fulfilled',
    route: getRouteByStatus(ORDER_STATUS_FULFILLED),
  },
  reject: {
    icon: 'delete',
    color: 'danger',
    heading: 'Cancelled',
    route: getRouteByStatus(ORDER_STATUS_CANCELED),
  },
}

const ReferentCard = {
  user_active: {
    icon: 'collection-folder-image',
    color: 'warning',
    heading: 'User Active',
  },
  amount: {
    icon: 'shopping-cart',
    color: 'info',
    heading: 'Amount',
  },
  order: {
    icon: 'truck',
    color: 'success',
    heading: 'Order',
  },
}
const getStatisticsByStatus = (statisticsStatus) => {
  const statistics = []
  Object.keys(statisticsStatus).forEach((key) => {
    statistics.push(
      Object.assign({ value: statisticsStatus[key] || 0, ...status[key] })
    )
  })

  return statistics
}

const getStatisticsRefByIcon = (statisticsRef) => {
  const statistics = []
  Object.keys(statisticsRef).forEach((key) => {
    statistics.push(
      Object.assign({ value: statisticsRef[key] || 0, ...ReferentCard[key] })
    )
  })

  return statistics
}

export const getters = {
  [GET_PERCENT_TOP_SALES_COUNTRIES]: (state, getters, rootState) => {
    if (!Object.keys(state.statisticTopSalesCountries).length) {
      return []
    }
    const countries = []
    const total = Object.values(state.statisticTopSalesCountries).reduce(
      (accumulator, currentValue) => accumulator + currentValue
    )

    Object.keys(state.statisticTopSalesCountries).forEach((key) => {
      const sales = state.statisticTopSalesCountries[key]
      const country = rootState.shared.countries.find(
        ({ code }) => code === key
      )

      countries.push({
        code: key,
        name: country ? country.name : key,
        sales,
        percent: ((sales / total) * 100).toFixed(2),
      })
    })

    return countries.sort((a, b) => b.sales - a.sales)
  },
  [GET_STATISTICS_ORDERS_SELLER]: (state) => {
    let statisticsStatus
    if (state.statisticOrders.result != undefined) {
      statisticsStatus = {
        pending: state.statisticOrders.result.order_pending,
        process: state.statisticOrders.result.order_process,
        fulfilled: state.statisticOrders.result.order_fulfilled,
        reject: state.statisticOrders.result.order_canceled,
      }
      return getStatisticsByStatus(statisticsStatus)
    }

    return []
  },
  [GET_STATISTICS_ORDER_SUPPLIER]: (state) => {
    const statisticsStatus = {
      pending: state.supplierStatisticOrders.order_pending,
      fulfilled: state.supplierStatisticOrders.order_fulfilled,
      reject: state.supplierStatisticOrders.order_reject,
    }

    return getStatisticsByStatus(statisticsStatus)
  },
  [GET_STATISTIC_REF]: (state) => {
    const statisticsRef = {
      user_active: state.statisticRefActive.user_active,
      amount: state.statisticRefSale.amount,
      order: state.statisticRefSale.order,
    }
    return getStatisticsRefByIcon(statisticsRef)
  },
}
