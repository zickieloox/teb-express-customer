<template>
  <div class="tracking_page pages">
    <div class="search__section">
      <div class="search">
        <textarea
          v-model="code"
          class="input"
          placeholder="Nhập mã vận đơn hoặc tracking number"
        ></textarea>
        <div class="button-group">
          <button class="btn btn-tracking" @click="verifyCode">Track</button>
          <button class="btn btn-clear" @click="clearListCode">Xóa</button>
        </div>
      </div>
      <div class="text-err" v-if="errText">
        <img src="~@/assets/img/danger.svg" alt="banner" />{{ errText }}
      </div>
    </div>

    <div class="tracking__section">
      <div class="tracking">
        <div class="list-track" v-if="ListPackages && ListPackages.length">
          <div
            :class="{ 'button-package': active }"
            v-for="(item, i) in ListPackages"
            :key="i"
            style="margin-bottom: 12px"
          >
            <button
              class="package"
              @click="selectPackage(item)"
              :class="{ active: item.isActive }"
            >
              <div class="title" v-if="item.tracking">
                {{ item.tracking.tracking_number }}
              </div>
              <div class="content">
                <div style="margin-bottom: 4px">
                  TrackingNo:
                  <span v-if="item.tracking">{{
                    item.tracking.tracking_number
                  }}</span>
                </div>
                <div style="margin-bottom: 4px">
                  Package:
                  <span>{{
                    item.package_code ? item.package_code.code : ''
                  }}</span>
                </div>
                <div>
                  Status:
                  <span
                    v-status:status="mapStatus[item.status_string].value"
                  ></span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="log" v-if="logPackage && logPackage.length">
          <div class="timeline">
            <div
              v-for="(item, i) in logPackage"
              :key="i"
              :class="{
                'first-item': i === 0,
              }"
              class="timeline-item"
            >
              <div class="timeline-item__left">
                <div>{{ item.ship_time | date('dd/MM/yyyy') }}</div>
                <div>{{ item.ship_time | date('HH:mm:ss') }}</div>
              </div>
              <div class="timeline-item__right">
                <div v-html="item.text"></div>
                <span v-if="item.location"
                  ><i class="fa fa-map-marker mr-1"></i>
                  {{ item.location }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { GET_LOGS } from '../store'
import {
  MAP_NAME_STATUS_PACKAGE,
  DELIVER_LOG_PACKAGE,
  PackageStatusCancelled,
  PackageStatusReturned,
  ROLE_ADMIN,
  ROLE_SUPPORT,
  ROLE_ACCOUNTANT,
} from '../constant'
export default {
  name: 'Tracking',
  data() {
    return {
      code: '',
      listCode: [],
      logPackage: [],
      errText: '',
      active: false,
    }
  },
  beforeMount() {
    this.code = ''
    this.listCode = []
    this.$store.commit('tracking/setPackage', null)
    this.logPackage = []
  },
  computed: {
    ...mapState('tracking', {
      packages: (state) => state.packages,
      logs: (state) => state.logs,
    }),
    ListPackages: {
      get() {
        return this.packages == null
          ? this.packages
          : this.packages.map((item) =>
              Object.assign({}, item, { isActive: false })
            )
      },
      set(packages) {
        return packages
      },
    },
    ListLogs() {
      return this.logs.map((log) => {
        let text = DELIVER_LOG_PACKAGE[log.type]

        if (log.type == PackageStatusCancelled) {
          text = `${
            DELIVER_LOG_PACKAGE[log.type]
          } bởi <strong>${this.displayUserName(log)}</strong>`
        }
        if (log.type == PackageStatusReturned) {
          text = `${DELIVER_LOG_PACKAGE[log.type]} <p>Lí do: ${
            log.description
          }</p>`
        }

        text = text || log.description
        return {
          package_id: log.package_id,
          text,
          ship_time: log.ship_time,
          location: log.location,
        }
      })
    },
    mapStatus() {
      return MAP_NAME_STATUS_PACKAGE
    },
  },
  methods: {
    ...mapActions('tracking', [GET_LOGS]),

    async track() {
      this.listCode = this.listCode.filter((x) => x != '')
      const result = await this[GET_LOGS](this.listCode)
      if (result.error) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }
      this.errText = ''
      this.active = true
      this.logPackage = this.ListLogs.filter(
        (x) => x.package_id == this.packages[0].id
      )
    },

    verifyCode() {
      if (this.code == '') {
        return (this.errText = 'Vui lòng kiểm tra dữ liệu đầu vào!')
      }

      var regex = /^[A-Za-z0-9\n ]+$/
      var isValid = regex.test(this.code.trim())
      if (!isValid) {
        return (this.errText = 'Mã vận đơn/Tracking number không hợp lệ')
      }

      this.listCode = this.code.trim().split(/[\n ]/)
      this.track()
    },

    onChange() {
      this.errText = ''
    },

    clearListCode() {
      this.code = ''
      this.listCode = []
      this.$store.commit('tracking/setPackage', null)
      this.logPackage = []
    },

    selectPackage(item) {
      for (const i of this.packages) {
        i.isActive = false
        if (i == item) {
          i.isActive = true
        }
      }
      this.logPackage = this.ListLogs.filter((x) => x.package_id == item.id)
      this.active = false
    },

    displayUserName(item) {
      if (
        item.updated_user_role == ROLE_ADMIN ||
        item.updated_user_role == ROLE_SUPPORT ||
        item.updated_user_role == ROLE_ACCOUNTANT
      ) {
        return 'Bộ phận chăm sóc khách hàng'
      }

      return item.updated_user_name
    },
  },
}
</script>
