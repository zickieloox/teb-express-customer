<template>
  <div class="home-page pages">
    <div class="page-content">
      <div class="page-header"> Xin chào, {{ user.full_name }} </div>
      <div class="page-content">
        <div class="money card">Tiền hàng</div>
        <div class="d-flex">
          <div class="package card">
            <div class="card-title"> Analytics </div>
            <div class="card-body">
              <line-chart :chartData="chartData" :options="chartOptions" />
            </div>
          </div>
          <div class="news card">Tin tức</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '../components/LineChart'
import { mapState } from 'vuex'
import { date } from '@core/utils/datetime'

export default {
  name: 'Home',
  components: {
    LineChart,
  },
  data() {
    return {
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
      days: [],
      data1: [],
      data2: [],
    }
  },
  computed: {
    ...mapState('shared', {
      user: (state) => state.user,
    }),
  },
  created() {},
  mounted() {
    var day = new Date()
    this.getDaysInMonth(day, day.getMonth(), day.getFullYear())
    this.fetchData()
    this.fillData()
  },
  methods: {
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
            label: 'Hoàn trả',
            borderColor: 'rgba(230,46,10,1)',
            borderWidth: 1,
            backgroundColor: 'rgba(230, 46, 10, 0.2)',
            pointStyle: 'rectRot',
            data: this.data2,
          },
        ],
      }
    },

    fetchData() {
      for (let i = 0; i < this.days.length; i++) {
        this.data1.push(this.getRandomInt())
        this.data2.push(this.getRandomInt())
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },

    getDaysInMonth(day, month, year) {
      var firtsDate = new Date(year, month, 1)
      while (firtsDate.getMonth() === month) {
        firtsDate = new Date(firtsDate)
        var formatDate = date(firtsDate, 'dd/MM')
        var formatCurrentDate = date(day, 'dd/MM')

        if (formatDate === formatCurrentDate) {
          break
        }

        this.days.push(formatDate)
        firtsDate.setDate(firtsDate.getDate() + 1)
      }
      return this.days
    },
  },
  //   watch: {
  //     filter: {
  //       handler: function() {
  //         this.init()
  //       },
  //       deep: true,
  //     },
  //   },
}
</script>
