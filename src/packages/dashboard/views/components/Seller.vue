<template>
  <div class="page">
    <div class="page-content container-fluid">
      <statistic-card :statistics="statisticsOrders" />
      <div
        class="row"
        v-if="statisticTopSalesCountries && hasStatisticTopCountries"
      >
        <div class="col-12">
          <div class="card card-shadow table-row">
            <div class="card-header card-header-transparent py-20">
              <span class="text-body blue-grey-700 font-weight-700">
                Quốc gia có doanh thu tốt nhất
              </span>
            </div>
            <global-sales-top-locations
              :map-data="statisticTopSalesCountries"
              :sales="statisticsSales"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { FETCH_COUNTRIES } from '@/packages/shared/store'
import {
  FETCH_STATISTIC_ORDERS,
  FETCH_STATISTIC_TOP_SALES_COUNTRIES,
  GET_PERCENT_TOP_SALES_COUNTRIES,
  GET_STATISTICS_ORDERS_SELLER,
} from '../../store'
import StatisticCard from './StatisticCard'
import GlobalSalesTopLocations from './SellerGlobalSalesTopLocations'
import ShopService from '@core/services/shop'

export default {
  name: 'Dashboard',
  components: { StatisticCard, GlobalSalesTopLocations },
  computed: {
    ...mapState('dashboard', {
      statisticTopSalesCountries: (state) => state.statisticTopSalesCountries,
    }),
    ...mapGetters('dashboard', {
      statisticsSales: GET_PERCENT_TOP_SALES_COUNTRIES,
      statisticsOrders: GET_STATISTICS_ORDERS_SELLER,
    }),
    hasStatisticTopCountries() {
      return (
        this.statisticTopSalesCountries &&
        Object.keys(this.statisticTopSalesCountries).length
      )
    },
  },
  data() {
    return {
      isFetchingStatisticOrders: false,
      resultStatisticOrders: {},
      isFetchingStatisticTopCountries: false,
      resultStatisticTopCountries: {},
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('dashboard', [
      FETCH_STATISTIC_ORDERS,
      FETCH_STATISTIC_TOP_SALES_COUNTRIES,
    ]),
    ...mapActions('shared', [FETCH_COUNTRIES]),

    init() {
      this.fetchCountries()
      this.handleFetchStatisticOrders()
      this.handleFetchTopCountries()
    },

    async handleFetchStatisticOrders() {
      this.isFetchingStatisticOrders = true
      this.resultStatisticOrders = await this.fetchStatisticOrders({
        shop_id: ShopService.getId(),
      })
      this.isFetchingStatisticOrders = false
    },

    async handleFetchTopCountries() {
      this.isFetchingStatisticTopCountries = true
      this.resultStatisticTopCountries = await this.fetchStatisticTopSalesCountries(
        {
          shop_id: ShopService.getId(),
        }
      )
      this.isFetchingStatisticTopCountries = false
    },
  },
}
</script>
