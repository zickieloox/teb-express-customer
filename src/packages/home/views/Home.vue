<template>
  <div class="home-page pages pb-5">
    <div class="page-content">
      <div class="page-header">
        <div class="d-flex justify-content-between">
          <h3 class="page-title">Dashboard</h3>
          <div class="actions">
            <select v-model="time">
              <option value="d7">7 ngày gần đây</option>
              <option value="d14">14 ngày gần đây</option>
              <option value="d30">30 ngày gần đây</option>
            </select>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="w-search">
          <input
            type="text"
            placeholder="Tìm kiếm theo mã vận đơn"
            @keydown.enter.prevent="searchHandle"
          />
          <div class="icon icon-search"></div>
        </div>
        <div class="row mt-24">
          <div class="col-9">
            <div class="row">
              <div class="col-4">
                <div class="box box-warning">
                  <a
                    @click="goListpackage('processing')"
                    href="javascript:void(0)"
                  >
                    <div class="w-icon">
                      <i class="icon icon-clock"></i>
                    </div>
                    <p class="title">Đang xử lý</p>
                    <p class="value">{{ numbers.processing }}</p>
                  </a>
                </div>
              </div>
              <div class="col-4">
                <div class="box box-info">
                  <a
                    @click="goListpackage('in-transit')"
                    href="javascript:void(0)"
                  >
                    <div class="w-icon">
                      <i class="icon icon-plane"></i>
                    </div>
                    <p class="title">Đang giao</p>
                    <p class="value">{{ numbers.intransit }}</p>
                  </a>
                </div>
              </div>
              <div class="col-4">
                <div class="box box-success">
                  <a
                    @click="goListpackage('delivered')"
                    href="javascript:void(0)"
                  >
                    <div class="w-icon">
                      <i class="icon icon-box-tick"></i>
                    </div>
                    <p class="title">Giao thành công</p>
                    <p class="value">{{ numbers.delivered }}</p>
                  </a>
                </div>
              </div>
              <div class="col-12 mt-24">
                <div class="card">
                  <h3 class="card-title">Thống kê đơn hàng</h3>
                  <div class="card-body">
                    <line-chart
                      :chartData="chartData"
                      :options="chartOptions"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 list-actions">
            <div class="card bg-gray">
              <h3 class="card-title">Hoạt động</h3>
              <div class="card-body">
                <ul class="messages pb-4">
                  <li v-for="item in messages" :key="item.id">
                    <router-link
                      :to="{
                        name: 'package-detail',
                        params: { id: item.package_id },
                      }"
                    >
                      <i class="icon icon-export"></i>
                      <p v-html="item.message"></p>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '../components/LineChart'
import { mapActions, mapState, mapGetters } from 'vuex'
import { FETCH_ANALYTICS } from '../store'
import {
  PACKAGE_STATUS_CREATED,
  PACKAGE_STATUS_PENDING_PICKUP,
  PACKAGE_STATUS_PICKED,
  PACKAGE_STATUS_WAREHOUSE_LABELED,
  PACKAGE_STATUS_WAREHOUSE_INCONTAINER,
  PACKAGE_STATUS_WAREHOUSE_INSHIPMENT,
  PACKAGE_STATUS_INTRANSIT,
  PACKAGE_STATUS_DELIVERED,
  PACKAGE_STATUS_RETURNED,
  PACKAGE_STATUS_CANCELLED,
} from '../constant'

export default {
  name: 'Home',
  components: {
    LineChart,
  },
  data() {
    return {
      time: 'd14',
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            style: 'circle',
            radius: 3,
          },
        },
        legend: {
          display: true,
          align: 'end',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
      },
      datavalues: {
        created: [],
        pendingPickup: [],
        intransit: [],
        delivered: [],
        returned: [],
        cancelled: [],
        processing: [],
      },
      numbers: {
        created: 0,
        pendingPickup: 0,
        intransit: 0,
        delivered: 0,
        returned: 0,
        cancelled: 0,
        processing: 0,
      },
    }
  },
  computed: {
    ...mapGetters('home', ['messages']),
    ...mapState('home', {
      analytics: (state) => state.analytics,
    }),
    days() {
      const mapdays = { d7: 7, d14: 14, d30: 30 }
      const num = mapdays[this.time] || 14

      const now = new Date()
      const days = []
      for (let i = 0; i < num; i++) {
        let m = now.getMonth() + 1
        let d = now.getDate()
        days[num - i - 1] = `${d > 9 ? d : '0' + d}/${m > 9 ? m : '0' + m}`
        now.setDate(now.getDate() - 1)
      }

      return days
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('home', {
      fetchAnalytics: FETCH_ANALYTICS,
    }),

    async init() {
      this.createBaseData()

      const res = await this.fetchAnalytics()
      if (!res || res.error) {
        this.fillData()
        this.$toast.error(res.message)
        return
      }

      for (const v of this.analytics) {
        const day = this.dateToDay(v.date_time)
        const index = this.days.findIndex((item) => item === day)
        if (index === -1) continue

        let count = parseInt(v.count)

        switch (v.status) {
          case PACKAGE_STATUS_CREATED:
            this.numbers.created += count
            this.datavalues.created[index] += count
            break
          case PACKAGE_STATUS_PENDING_PICKUP:
            this.numbers.pendingPickup += count
            this.datavalues.pendingPickup[index] += count
            break
          case PACKAGE_STATUS_PICKED:
          case PACKAGE_STATUS_WAREHOUSE_LABELED:
          case PACKAGE_STATUS_WAREHOUSE_INCONTAINER:
          case PACKAGE_STATUS_WAREHOUSE_INSHIPMENT:
            this.numbers.processing += count
            this.datavalues.processing[index] += count
            break
          case PACKAGE_STATUS_INTRANSIT:
            this.numbers.intransit += count
            this.datavalues.intransit[index] += count
            break
          case PACKAGE_STATUS_DELIVERED:
            this.numbers.delivered += count
            this.datavalues.delivered[index] += count
            break
          case PACKAGE_STATUS_RETURNED:
            this.numbers.returned += count
            this.datavalues.returned[index] += count
            break
          case PACKAGE_STATUS_CANCELLED:
            this.numbers.cancelled += count
            this.datavalues.cancelled[index] += count
            break
        }
      }

      this.fillData()
    },

    dateToDay(date) {
      const d = date.substr(-2, 2)
      const m = date.substr(5, 2)
      return `${d}/${m}`
    },

    createBaseData() {
      this.numbers = {
        created: 0,
        pendingPickup: 0,
        intransit: 0,
        delivered: 0,
        returned: 0,
        cancelled: 0,
        processing: 0,
      }

      for (const key in this.datavalues) {
        if (!Object.hasOwnProperty.call(this.datavalues, key)) continue
        this.datavalues[key] = []
        for (let i = 0; i < this.days.length; i++) {
          this.datavalues[key].push(0)
        }
      }
    },

    fillData() {
      this.chartData = {
        labels: this.days,
        datasets: [
          {
            label: 'Giao thành công',
            borderColor: '#48BE78',
            borderWidth: 1,
            backgroundColor: '#F0FFF3',
            data: this.datavalues.delivered,
          },
          {
            label: 'Đang giao',
            borderColor: '#02BABA',
            borderWidth: 1,
            backgroundColor: '#E6FBFF',
            data: this.datavalues.intransit,
          },
          {
            label: 'Đang xử lý',
            borderColor: '#FA8C16',
            borderWidth: 1,
            backgroundColor: '#FFF7E6',
            data: this.datavalues.processing,
          },
        ],
      }
    },

    searchHandle(e) {
      let keyword = e.target.value.trim()
      if (keyword == '') return

      this.$router.push({ name: 'list-packages', query: { code: keyword } })
    },

    goListpackage(status) {
      const mapdays = { d7: 7, d14: 14, d30: 30 }
      const num = mapdays[this.time] || 14

      let t = new Date()
      let ed = this.dateformat(t)

      t.setDate(t.getDate() - num + 1)
      let sd = this.dateformat(t)

      this.$router.push({
        name: 'list-packages',
        query: {
          status: status,
          start_date: sd,
          end_date: ed,
        },
      })
    },

    dateformat(dt) {
      const y = dt.getFullYear()
      const m = dt.getMonth() + 1
      const d = dt.getDate()

      return `${y}-${m > 9 ? m : '0' + m}-${d > 9 ? d : '0' + d}`
    },
  },
  watch: {
    time() {
      this.init()
    },
  },
}
</script>
