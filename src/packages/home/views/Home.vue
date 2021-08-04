<template>
  <div class="home-page pages">
    <div class="page-content">
      <div class="page-header">
        <div class="d-flex justify-content-between">
          <h3 class="page-title">Dashborad</h3>
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
          <input type="text" placeholder="Tìm kiếm theo mã vận đơn" />
          <div class="icon icon-search"></div>
        </div>
        <div class="row mt-24">
          <div class="col-9">
            <div class="row">
              <div class="col-4">
                <div class="box box-warning">
                  <div class="w-icon">
                    <i class="icon icon-clock"></i>
                  </div>
                  <p class="title">Đang xử lý</p>
                  <p class="value">1.287</p>
                </div>
              </div>
              <div class="col-4">
                <div class="box box-info">
                  <div class="w-icon">
                    <i class="icon icon-plane"></i>
                  </div>
                  <p class="title">Đang giao</p>
                  <p class="value">1.287</p>
                </div>
              </div>
              <div class="col-4">
                <div class="box box-success">
                  <div class="w-icon">
                    <i class="icon icon-box-tick"></i>
                  </div>
                  <p class="title">Giao thành công</p>
                  <p class="value">1.287</p>
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
          <div class="col-3">
            <div class="card bg-gray">
              <h3 class="card-title">Hoạt động</h3>
              <div class="card-body">
                <ul class="messages">
                  <li v-for="message in messages" :key="message.id">
                    <i class="icon icon-export"></i>
                    <p
                      >Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit.</p
                    >
                  </li>
                  <li>
                    <i class="icon icon-export"></i>
                    <p
                      >Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit.</p
                    >
                  </li>
                  <li>
                    <i class="icon icon-export"></i>
                    <p
                      >Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit.</p
                    >
                  </li>
                  <li>
                    <i class="icon icon-export"></i>
                    <p
                      >Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit.</p
                    >
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
// import { date } from '@core/utils/datetime'
import { FETCH_ANALYTICS } from '../store'

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
            radius: 0,
          },
        },
        legend: {
          display: true,
          align: 'end',
          labels: {
            usePointStyle: true,
            pointStyle: 'rectRot',
          },
        },
      },
      data1: [],
      data2: [],
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
        days[num - i - 1] = `${now.getDate()}/${now.getMonth() + 1}`
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

    init() {
      this.fetchAnalytics()
    },

    fillData() {
      this.chartData = {
        labels: this.days,
        datasets: [
          {
            label: 'Giao thành công',
            borderColor: 'rgba(72, 190, 120, 1)',
            borderWidth: 1,
            backgroundColor: 'rgba(72, 190, 120, 0.2)',
            pointStyle: 'rectRot',
            data: this.data1,
          },
          {
            label: 'Đang giao',
            borderColor: 'rgba(72, 190, 120, 1)',
            borderWidth: 1,
            backgroundColor: 'rgba(72, 190, 120, 0.2)',
            pointStyle: 'rectRot',
            data: this.data1,
          },
          {
            label: 'Đang xử lý',
            borderColor: 'rgba(230,46,10,1)',
            borderWidth: 1,
            backgroundColor: 'rgba(230, 46, 10, 0.2)',
            pointStyle: 'rectRot',
            data: this.data2,
          },
        ],
      }
    },
  },
}
</script>
