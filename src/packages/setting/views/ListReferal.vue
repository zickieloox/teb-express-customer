<template>
  <div class="pages affiliate">
    <div class="page-header">
      <h1>Copy mã giới thiệu của bạn</h1>
      <p
        >Gửi link giới thiệu cho bạn bè và nhận hoa hồng mỗi khi người tham gia
        phát sinh doanh thu.</p
      >
      <div class="d-flex" id="link-group">
        <p-input :input="link"></p-input>
        <p-button type="primary" @click="copy" id="btn-coppy">
          Copy
          <span id="myTooltip" class="tooltip-text"></span>
        </p-button>
      </div>
    </div>
    <div class="page-content">
      <div class="card">
        <div class="card-body">
          <div
            class="d-flex justify-content-between align-items-center content-title"
          >
            <h1>Bạn đã giới thiệu</h1>
            <p-datepicker
              :format="'dd/mm/yyyy'"
              class="p-input-group input-group"
              :single-date-picker="true"
              id="filter-date"
              @update="selectDate"
              :value="{
                startDate: filter.date,
                endDate: filter.date,
              }"
              :label="labelDate"
              :ranges="false"
              @clear="clearSearchDate"
            ></p-datepicker>
          </div>
          <VclTable class="mt-20" v-if="isFetching"></VclTable>
          <template v-else-if="users.length">
            <div class="table-responsive">
              <table class="table table-hover table-packages" id="tbl-packages">
                <thead>
                  <tr>
                    <th>
                      Tên
                    </th>
                    <th>Ngày được mời</th>
                    <template v-if="isPromAff">
                      <th>
                        Doanh thu
                      </th>
                      <th>
                        Hoa hồng
                      </th>
                      <th>
                        Ngày trả hoa hồng
                      </th>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in users" :key="i">
                    <td> {{ item.full_name }}</td>
                    <td>{{ item.created_at | datetime('dd/MM/yyyy') }}</td>
                    <template v-if="isPromAff">
                      <td> {{ item.revenue | formatPrice }}</td>
                      <td> {{ item.commission | formatPrice }}</td>
                      <td>{{ dateFilter }}</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="d-flex justify-content-between align-items-center mb-80"
              v-if="count > 0"
            >
              <p-pagination
                :total="count"
                :perPage.sync="filter.limit"
                :current.sync="filter.page"
                size="sm"
              >
              </p-pagination>
            </div>
          </template>
          <empty-search-result v-else></empty-search-result>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { mapActions } from 'vuex'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import { GET_REFERAL_INFO } from '../store'
import { date } from '@core/utils/datetime'
export default {
  name: 'ListCoupon',
  mixins: [mixinRoute, mixinTable],
  components: {
    EmptySearchResult,
  },
  data() {
    return {
      filter: {
        limit: 25,
        status: '',
        search: '',
        date: '',
      },
      isPromAff: false,
      link: '',
      labelDate: `Chọn ngày`,
      isFetching: false,
      users: [],
      count: 0,
    }
  },
  computed: {
    dateFilter() {
      return this.filter.date
        ? date(this.filter.date, 'dd/MM/yyyy')
        : date(new Date(), 'dd/MM/yyyy')
    },
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('setting', [GET_REFERAL_INFO]),
    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      let r = await this[GET_REFERAL_INFO](this.filter)
      this.isFetching = false
      if (!r.success) {
        this.$toast.open({
          type: 'error',
          message: r.message,
          duration: 4000,
        })
        return
      }
      this.link = r.link
      this.users = r.users || []
      this.count = r.count
      this.isPromAff = r.is_promotion_aff
    },
    selectDate(v) {
      this.filter.date = date(v.startDate, 'yyyy-MM-dd')
    },
    copy() {
      let copyText = this.link
      let textArea = document.createElement('textarea')
      textArea.value = copyText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('Copy')
      textArea.remove()

      let tooltip = document.getElementById('myTooltip')
      tooltip.innerHTML = 'Đã sao chép'
      setTimeout(() => (tooltip.innerHTML = ''), 1000)
    },
    clearSearchDate() {
      this.filter.date = ''
    },
  },
  watch: {
    filter: {
      handler: function() {
        this.init()
      },
      deep: true,
    },
  },
}
</script>
<style lang="scss">
#link-group .p-input-group {
  max-width: 408px;
  margin-right: 8px;
}

.affiliate {
  background-color: #fff;
  .page-header {
    background-color: #fff;
    border: unset !important;
    h1 {
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      color: #111212;
      margin-bottom: 4px !important;
    }
    p {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      color: #313232;
      margin-bottom: 16px;
    }
  }
  .page-content {
    .card {
      border: unset !important;
      .content-title h1 {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        color: #111212;
      }
      #filter-date {
        width: auto;
        .reportrange-text {
          height: auto !important;
          border-radius: unset !important;
          border-top: none;
          border-left: none;
          border-right: none;
          & > div {
            height: 20px;
          }
          .label-date-picker {
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            color: #313232;
            display: inline-block;
          }
          img {
            margin-left: 5px !important;
            margin-top: 1px !important;
          }
        }
      }
    }
  }
  #btn-coppy {
    position: relative;
  }
  .tooltip-text {
    position: absolute;
    width: 100px;
    background-color: #37393e;
    z-index: 11;
    text-align: center;
    border-radius: 4px;
    color: #fff;
    bottom: -27px;
    right: -12px;
    font-size: 12px;
  }
}
</style>
