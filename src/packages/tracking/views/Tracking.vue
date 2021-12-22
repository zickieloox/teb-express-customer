<template>
  <div class="tracking_page pages">
    <div class="search__section" v-if="newListPackages.length == 0">
      <div class="title">
        <h2>Tra cứu hành trình đơn hàng</h2>
        <span>Theo dõi lên đến 50 Tracking cùng một lúc.</span>
      </div>

      <div class="search">
        <div class="search-input">
          <input
            class="input-1"
            @click="openInput()"
            v-model="code"
            placeholder="Vui lòng nhập mã vận đơn"
            :class="{ hidden: openTextarea }"
          />
          <textarea
            id="textarea"
            :class="{ 'input-open': openTextarea }"
            v-model="code"
            class="input"
            :placeholder="
              `Vui lòng nhập mã vận đơn
Với nhiều mã vận đơn, các mã được phân cách bằng dấu enter`
            "
            @input="onChange"
          ></textarea>
        </div>
        <div class="button-group">
          <button
            class="btn btn-clear"
            v-if="openTextarea"
            :disabled="!code"
            @click="clearListCode"
            >Delete all</button
          >
          <button class="btn btn-tracking" @click.prevent="verifyCode">
            <img src="~@/assets/img/box-search.png" alt="" /> Track</button
          >
        </div>
      </div>
      <div class="wrapper" @click="openTextarea = false"></div>
    </div>

    <div class="tracking__section" v-else>
      <div class="tracking__header">
        <div class="filter_tab">
          <ul class="tablist">
            <li class="nav-item">
              <a
                href="#"
                class="nav-link"
                @click="filterStatus('')"
                :class="{ active: filter.status == '' }"
              >
                All ({{ count }})
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#"
                class="nav-link processing"
                @click="filterStatus(statusProcessing)"
                :class="{
                  disabled: !CountStatusProcessing,
                  active: filter.status == statusProcessing,
                }"
              >
                <inline-svg
                  :src="require('../../../assets/img/clock2.svg')"
                ></inline-svg>
                Processing ({{ CountStatusProcessing || 0 }})
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#"
                class="nav-link in-transit"
                @click="filterStatus(statusInTransit)"
                :class="{
                  disabled: !CountStatusInTransit,
                  active: filter.status == statusInTransit,
                }"
                ><inline-svg
                  :src="require('../../../assets/img/transit.svg')"
                ></inline-svg>
                In-Transit ({{ CountStatusInTransit || 0 }})
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#"
                class="nav-link delivered"
                @click="filterStatus(statusDelivered)"
                :class="{
                  disabled: !CountStatusDelivered,
                  active: filter.status == statusDelivered,
                }"
              >
                <inline-svg
                  :src="require('../../../assets/img/Tick-circle.svg')"
                ></inline-svg>
                Delivered ({{ CountStatusDelivered || 0 }})
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#"
                class="nav-link warning"
                @click="filterStatus(statusAlert)"
                :class="{
                  disabled: !CountStatusAlert,
                  active: filter.status == statusAlert,
                }"
                ><inline-svg
                  :src="require('../../../assets/img/Warning-2.svg')"
                ></inline-svg>
                Alert ({{ CountStatusAlert || 0 }})
              </a>
            </li>
          </ul>
          <button
            class="btn btn-tracking btn-tracking-large"
            @click="openModalTracking"
          >
            <img src="~@/assets/img/box-search.png" alt="" /> Track Other
            Packages</button
          >
        </div>
      </div>

      <div class="tracking">
        <template>
          <div class="table">
            <table class="table table-hover">
              <thead>
                <tr>
                  <!-- <th width="60"></th> -->
                  <th width="250">LIONBAY TRACKING</th>
                  <th width="250">LAST MILE TRACKING NO.</th>
                  <th width="450">STATUS</th>
                  <th width="82">
                    <div class="d-flex btn-action-icon">
                      <copy :value="dataCopy">
                        <inline-svg
                          :src="
                            require('../../../assets/img/copy_tracking.svg')
                          "
                        ></inline-svg>
                      </copy>
                      <a
                        data-text-hover="Mở rộng hoặc thu gọn"
                        class="lb-tooltip"
                      >
                        <inline-svg
                          v-if="!open"
                          @click="openTrackingDetail"
                          :src="
                            require('../../../assets/img/expand_tracking.svg')
                          "
                        ></inline-svg>
                        <inline-svg
                          v-else
                          @click="closeTrackingDetail"
                          :src="
                            require('../../../assets/img/close_tracking.svg')
                          "
                        ></inline-svg>
                      </a>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody
                v-for="(item, i) in newListPackages"
                :key="i"
                :class="{ 'tbody-opened': opened.includes(item.id) }"
              >
                <tr class="sperate"> </tr>

                <tr
                  class="clickable-row"
                  @click="toggle(item.id)"
                  :class="{ opened: opened.includes(item.id) && !deleting }"
                  v-if="!item.notFound"
                >
                  <!-- <td>
                    <img
                      v-if="item.status_string == statusDelivered"
                      src="~@/assets/img/iconDelivered.png"
                    />
                    <img
                      v-else-if="item.status_string == statusProcessing"
                      src="~@/assets/img/iconProcessing.png"
                    />
                    <img
                      v-else-if="item.status_string == statusInTransit"
                      src="~@/assets/img/iconInTransit.png"
                    />
                    <img
                      v-else-if="item.status_string == statusCancel"
                      src="~@/assets/img/iconCancel.png"
                    />
                    <img
                      v-else-if="item.status_string == statusAlert"
                      src="~@/assets/img/iconAlert.png"
                    />
                    <img
                      v-else-if="item.status_string == PackageStatusExpried"
                      src="~@/assets/img/iconExpried.png"
                    />
                    <img v-else src="~@/assets/img/iconPreTransit.png" />
                  </td> -->
                  <td
                    >{{ item.package_code.code }}
                    <br />
                    <span v-status:status="item.status_string"></span>
                  </td>
                  <td
                    >{{ item.tracking ? item.tracking.tracking_number : '' }}
                    <br /><span>&nbsp;</span></td
                  >
                  <td v-if="item.log">
                    {{ item.log[0].description }}
                    <br />
                    <span class="location">{{ item.log[0].location }}</span>
                  </td>
                  <td class="icon"
                    ><div @click="deletePackage(item)">
                      <inline-svg
                        :src="require('../../../assets/img/x.svg')"
                      ></inline-svg> </div
                  ></td>
                </tr>
                <tr v-else class="not-found">
                  <!-- <td>
                    <img src="~@/assets/img/iconNotFound.png" />
                  </td> -->
                  <td
                    >{{ item.package_code.code }}
                    <br />
                    <span>Not Found</span>
                  </td>
                  <td colspan="2"
                    ><span class="error"
                      >Không thể tìm thấy mã vận đơn này. Vui lòng kiểm tra lại
                      sau.</span
                    ></td
                  >
                  <td class="icon"
                    ><div @click="deletePackage(item)">
                      <inline-svg
                        :src="require('../../../assets/img/x.svg')"
                      ></inline-svg> </div
                  ></td>
                </tr>
                <transition :key="'A' + i" name="fade" mode="out-in">
                  <tr
                    class="tracking-detail"
                    v-show="
                      opened.includes(item.id) && !deleting && !item.notFound
                    "
                  >
                    <td colspan="4">
                      <div class="status">{{ item.status_string }}</div>

                      <div class="timeline-new">
                        <div
                          v-for="(item, i) in item.data"
                          :key="i"
                          :class="{
                            'first-item': i === 0,
                          }"
                          class="timeline-item-new"
                        >
                          <div class="item__right">
                            <div class="title">{{ item.name }}</div>
                          </div>
                          <div
                            v-for="(it, j) in item.data"
                            :key="j"
                            class="item__right__data"
                            :class="{
                              'first-data': j === 0,
                            }"
                          >
                            <div class="time">
                              {{ it.ship_time | datetime('HH:mm:ss') }}</div
                            >
                            <div class="des">
                              {{ convertDes(it) }}
                              <span class="location" v-if="it.location">
                                ___{{ it.location }}</span
                              ></div
                            >
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </transition>
              </tbody>
            </table>

            <div
              class="d-flex justify-content-between align-items-center mb-16"
              v-if="count > 0"
            >
              <p-pagination
                :total="countPackages"
                :perPage.sync="filter.limit"
                :current.sync="filter.page"
                :filterLimit="false"
                size="sm"
              ></p-pagination>
            </div>
          </div>
        </template>
      </div>
    </div>
    <modal-tracking
      :visible.sync="visibleModal"
      :codes="listCode"
      @track="track"
    >
    </modal-tracking>
  </div>
</template>

<script>
// import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { GET_LOGS } from '../store'
import Uniq from 'lodash/uniq'
import { datetime } from '../../../core/utils/datetime'
import { DELIVER_LOG_PACKAGE } from '../../package/constants'
import {
  MAP_NAME_STATUS_PACKAGE,
  PackageStatusDeliveredText,
  PackageStatusProcessingText,
  PackageStatusInTransitText,
  PackageStatusReturnText,
  PackageStatusPendingPickupText,
  PackageStatusCancelledText,
  PackageStatusExpiredText,
} from '../constant'
import ModalTracking from '../components/ModalTracking.vue'
import Copy from '../../bill/components/Copy.vue'
export default {
  name: 'Tracking',
  components: {
    ModalTracking,
    Copy,
  },
  data() {
    return {
      code: '',
      listCode: [],
      logPackage: [],
      errText: '',
      open: false,
      opened: [],
      statusProcessing: PackageStatusProcessingText,
      statusInTransit: PackageStatusInTransitText,
      statusDelivered: PackageStatusDeliveredText,
      statusAlert: PackageStatusReturnText,
      statusPendingPickup: PackageStatusPendingPickupText,
      statusCancel: PackageStatusCancelledText,
      filter: {
        limit: 10,
        page: 1,
        status: '',
      },
      newListPackages: [],
      deleting: false,
      countPackages: 0,
      openTextarea: false,
      visibleModal: false,
      dataCopy: '',
      isLoading: false,
      PackageStatusExpried: PackageStatusExpiredText,
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
      // count: (state) => state.countPackages,
      count_status: (state) => state.count_status,
    }),
    ListPackages: {
      get() {
        return this.packages == null
          ? this.notFoundCodes
          : this.packages
              .map((item) => {
                item = Object.assign({}, item, {
                  log: this.logs.filter((x) => x.package_id == item.id),
                  notFound: false,
                })
                item.status_string =
                  item.status_string == this.statusPendingPickup
                    ? 'Pre-Transit'
                    : item.status_string

                const times = item.log.map((item) =>
                  datetime(item.ship_time, 'dd-MM-yyyy')
                )
                let ConvertData = []
                const uniqTimes = Uniq(times)
                uniqTimes.forEach((element) =>
                  ConvertData.push({ name: element, data: [] })
                )
                ConvertData.forEach((x) =>
                  item.log.forEach(function(it) {
                    if (datetime(it.ship_time, 'dd-MM-yyyy') == x.name) {
                      x.data.push(it)
                    }
                  })
                )
                return Object.assign({}, item, {
                  data: ConvertData,
                })
              })
              .concat(this.notFoundCodes)
      },
      set(packages) {
        return packages
      },
    },
    CountStatusProcessing() {
      return this.count_status
        .filter((x) => x.status == this.statusProcessing)
        .map((x) => x.count)[0]
    },
    CountStatusInTransit() {
      return this.count_status
        .filter((x) => x.status == this.statusInTransit)
        .map((x) => x.count)[0]
    },
    CountStatusDelivered() {
      return this.count_status
        .filter((x) => x.status == this.statusDelivered)
        .map((x) => x.count)[0]
    },
    CountStatusAlert() {
      return this.count_status
        .filter((x) => x.status == this.statusAlert)
        .map((x) => x.count)[0]
    },
    count() {
      return this.ListPackages.length
    },
    mapStatus() {
      return MAP_NAME_STATUS_PACKAGE
    },
    notFoundCodes() {
      let notFoundArr = []
      if (this.packages == null) {
        return this.listCode.map((x) => {
          return {
            package_code: { code: x },
            status_string: 'Not found',
            notFound: true,
            log: [],
          }
        })
      }
      for (const item of this.listCode) {
        if (
          !this.packages.map((x) => x.package_code.code).includes(item) &&
          !this.packages
            .map((x) => (x.tracking ? x.tracking.tracking_number : []))
            .includes(item)
        ) {
          notFoundArr.push({
            package_code: { code: item },
            status_string: 'Not found',
            notFound: true,
            log: [],
          })
        }
      }

      return notFoundArr
    },
  },
  methods: {
    ...mapActions('tracking', [GET_LOGS]),

    async track(codes) {
      this.isLoading = true
      this.listCode = codes
      const result = await this[GET_LOGS](this.listCode)

      if (result.error && result.message != 'Không tìm thấy') {
        this.listCode = []
        this.$toast.open({ type: 'error', message: result.message })
        return
      }
      this.errText = ''
      if (this.count / this.filter.limit == this.filter.page - 1) {
        this.filter.page--
      }
      this.filterStatus('')
      this.opened = []

      this.deleting = false
      this.isLoading = false
    },

    verifyCode() {
      if (this.code == '') {
        this.errText = 'Vui lòng kiểm tra dữ liệu đầu vào!'
        this.$toast.open({ type: 'error', message: this.errText })
        return
      }

      var regex = /^[A-Za-z0-9\n\t ]+$/
      var isValid = regex.test(this.code.trim())
      if (!isValid) {
        this.errText = 'Mã vận đơn không hợp lệ'
        this.$toast.open({ type: 'error', message: this.errText })
        return
      }

      this.listCode = [
        ...new Set(
          this.code
            .trim()
            .split(/[\n\t ]/)
            .filter((x) => x != '')
        ),
      ]
      this.track(this.listCode)
    },

    clearListCode() {
      this.code = ''
      this.listCode = []
      this.$store.commit('tracking/setPackage', null)
      this.logPackage = []
    },

    filterStatus(status) {
      this.filter.status = status
      this.filter.page = 1

      if (status == '') {
        this.countPackages = this.count
        this.newListPackages = this.paginate(
          this.ListPackages,
          this.filter.limit,
          this.filter.page
        )
        return
      }
      this.countPackages = this.count_status
        .filter((x) => x.status == status)
        .map((x) => x.count)[0]
      this.newListPackages = this.ListPackages.filter(
        (x) => x.status_string == status
      )
    },

    toggle(id) {
      const index = this.opened.indexOf(id)
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
    },

    deletePackage(item) {
      this.deleting = true

      this.listCode = this.ListPackages.filter((x) => x != item).map(
        (x) => x.package_code.code
      )
      if (this.listCode.length > 0) {
        this.track(this.listCode)
        return
      }
      this.newListPackages = []
      this.code = ''
    },

    paginate(array, page_size, page_number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size)
    },

    convertDes(data) {
      if (data.description == '') {
        return DELIVER_LOG_PACKAGE[data.type] || ''
      }
      return data.description
    },

    openTrackingDetail() {
      this.open = !this.open
      for (const item of this.ListPackages) {
        this.opened.push(item.id)
      }
    },
    closeTrackingDetail() {
      this.open = !this.open
      this.opened = []
    },

    openInput() {
      this.openTextarea = true

      setTimeout(() => {
        document.getElementById('textarea').focus()
      }, 300)
    },

    openModalTracking() {
      this.visibleModal = true
    },

    onChange() {
      this.code = this.code.replace(/ /g, '\n')
    },
  },
  watch: {
    filter: {
      handler: function() {
        if (this.ListPackages) {
          this.newListPackages =
            this.filter.status != ''
              ? this.ListPackages.filter(
                  (x) => x.status_string == this.filter.status
                ).slice(
                  (this.filter.page - 1) * this.filter.limit,
                  this.filter.page * this.filter.limit
                )
              : this.ListPackages.slice(
                  (this.filter.page - 1) * this.filter.limit,
                  this.filter.page * this.filter.limit
                )
          return
        }
        this.newListPackages = []
      },
      deep: true,
    },
    newListPackages: {
      handler: function() {
        this.dataCopy = ''
        for (const item of this.newListPackages) {
          this.dataCopy += `Mã vận đơn: ${item.package_code.code}
Tracking: ${item.tracking ? item.tracking.tracking_number : ''}
Trạng thái: ${item.status_string.charAt(0).toUpperCase() +
            item.status_string.slice(1)}
Hành trình đơn:\n`
          for (const log of item.log) {
            this.dataCopy += log.location
              ? `${datetime(log.ship_time)} ${log.description}, ${
                  log.location
                } \n`
              : `${datetime(log.ship_time)} ${log.description} \n`
          }
          this.dataCopy += `\n`
        }
      },
      deep: true,
    },
  },
}
</script>
