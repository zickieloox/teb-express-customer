<template>
  <div class="package-detail pages">
    <div v-if="!isEmpty" class="page-content">
      <div class="page-header">
        <div class="page-header__subtitle">
          <div class="page-header__info">
            <div class="info-package">LionBay tracking</div>
            <div class="info-package">Dịch vụ </div>
            <div class="info-package">Last mile tracking </div>
            <div class="info-package">Ngày tạo </div>
            <div class="info-package">Trạng thái</div>
            <div class="package-code "
              >{{ $evaluate('package_detail.package.code_package') || 'N/A' }}
              <span
                @click="showContent"
                v-if="package_detail.package.label"
                class="page-header__barcode"
              >
                <img
                  src="@/assets/img/Vector-barcode.png"
                  style="margin-top: 6px; position: absolute;"
                />
              </span>
            </div>
            <div class="content-title">{{
              $evaluate('package_detail.package.service_name')
            }}</div>
            <div class="content-title tracking" v-if="package_detail.package">
              <a
                target="_blank"
                v-if="package_detail.package.tracking_number"
                :href="linkTrackInfo"
              >
                {{ $evaluate('package_detail.package.tracking_number') }}
                <inline-svg
                  :src="require('../../../assets/img/arrow-up-right.svg')"
                ></inline-svg>
              </a>
              <a v-else>N/A</a>
            </div>
            <div class="content-title">{{
              package_detail.package.created_at
                | datetime('dd/MM/yyyy HH:mm:ss')
            }}</div>

            <div class="content-title">
              <span v-if="statusValue" v-status:status="statusValue"></span>
            </div>
          </div>
          <div class="page-header__action">
            <p-button
              href="#"
              type="lb-default"
              @click="handleCancelPackage"
              v-if="hasCancelPackage"
            >
              <span>Hủy đơn</span>
            </p-button>
            <p-button
              @click="handleModal"
              class=" ml-7"
              type="lb-default"
              v-if="hasEditPackage"
            >
              <span>Sửa đơn</span>
            </p-button>
            <p-button
              class=" ml-7"
              @click="handleWayBill"
              type="primary"
              v-if="hasMakeTracking"
            >
              <span>Tạo tracking</span>
            </p-button>
            <a
              @click="handlerReturnPackage"
              class="btn btn-primary ml-7"
              v-if="hasReshipPackage"
            >
              Chuyển lại hàng
            </a>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-6 p-0">
                <div class="card-block" id="recipient-block">
                  <div class="card-header">
                    <div class="card-title">Người nhận</div>
                  </div>
                  <div class="card-content">
                    <div class="row">
                      <div class="col-4 mb-8">Họ và tên:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.recipient')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Điện thoại:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.phone_number')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Địa chỉ:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.address_1')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Địa chỉ phụ:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.address_2')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Thành phố:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.city')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Mã vùng:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.state_code')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Mã bưu điện:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.zipcode')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4">Mã quốc gia:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.country_code')
                        }}</div></div
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 p-0">
                <div class="card-block" id="item-block">
                  <div class="card-header">
                    <div class="card-title">Thông tin hàng hóa</div>
                  </div>
                  <div class="card-content">
                    <div class="row">
                      <div class="col-4 mb-8">Chi tiết hàng hóa:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.detail')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Mã đơn hàng:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.order_number')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Trọng lượng:</div>
                      <div class="col-8"
                        ><div
                          >{{ $evaluate('package_detail.package.weight')
                          }}<span v-if="isOverThanOld('weight')">
                            ({{
                              $evaluate('package_detail.package.actual_weight')
                            }})
                          </span></div
                        >
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Dài:</div>
                      <div class="col-8"
                        ><div
                          >{{ $evaluate('package_detail.package.length')
                          }}<span v-if="isOverThanOld()">
                            ({{
                              $evaluate('package_detail.package.actual_length')
                            }})
                          </span></div
                        ></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Rộng:</div>
                      <div class="col-8"
                        ><div
                          >{{ $evaluate('package_detail.package.width')
                          }}<span v-if="isOverThanOld()">
                            ({{
                              $evaluate('package_detail.package.actual_width')
                            }})
                          </span></div
                        ></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Cao:</div>
                      <div class="col-8"
                        ><div
                          >{{ $evaluate('package_detail.package.height')
                          }}<span v-if="isOverThanOld()">
                            ({{
                              $evaluate('package_detail.package.actual_height')
                            }})
                          </span></div
                        ></div
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="package-log" class="row">
              <div v-if="!displayDeliverDetail" class="col-12 p-0">
                <div class="row">
                  <div class="col-12 p-0">
                    <div class="card-block">
                      <div class="card-header new">
                        <div class="card-title">Hành trình đơn</div>
                        <div class="card-action"
                          ><a
                            @click="changeDisplayDeliverDetail()"
                            href="#package-log"
                            >Lịch sử đơn</a
                          ></div
                        >
                      </div>
                      <div class="card-content deliver-log">
                        <DeliveryLog :logs="package_detail.deliver_logs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="displayDeliverDetail" class="col-12 p-0">
                <div class="row">
                  <div class="col-12 p-0">
                    <div class="card-block">
                      <div class="card-header new">
                        <div class="card-title">Lịch sử đơn</div>
                        <div class="card-action"
                          ><a
                            @click="changeDisplayDeliverDetail()"
                            href="#package-log"
                            >Hành trình đơn</a
                          ></div
                        >
                      </div>
                      <div class="card-content">
                        <AuditLog :logs="package_detail.audit_logs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="fee">
              <div class="fee__left">
                <div class="title">Phí giao hàng:</div>
                <div class="title">Phí phát sinh:</div>
                <div class="fee__number">{{
                  $evaluate('package_detail.package?.shipping_fee')
                    | formatPrice
                }}</div>

                <div class="fee__number"
                  >{{ sumExtraFee | formatPrice }}
                  <div class="more-extra-fee" v-if="extraFee.length">
                    <img
                      @mouseover="showPopupMoreExtraFee"
                      @mouseleave="hiddenPopupMoreExtraFee"
                      src="~@/assets/img/InfoCircleGrey.svg"
                      alt=""
                    />
                  </div>
                </div>

                <div
                  v-if="isVisiblePopupMoreExtraFee"
                  class="pop-up-more-extra-fee"
                >
                  <div v-for="(item, i) of mapExtraFee" :key="i">
                    <div>{{ item.extra_fee_types.name }}</div>
                    <div>{{ item.amount | formatPrice }}</div>
                  </div>
                </div>
              </div>
              <div class="fee__right">
                <div> Tổng cước: </div>
                <div>{{ sumFee | formatPrice }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NotFound v-else></NotFound>

    <modal-edit-order
      :visible.sync="isVisibleModal"
      :info_user="package_detail"
      @create="init"
      :total="sumFee"
    >
    </modal-edit-order>
    <modal-confirm
      :visible.sync="isVisibleConfirmWayBill"
      v-if="isVisibleConfirmWayBill"
      :actionConfirm="actions.wayBill.button"
      :description="actions.wayBill.Description"
      :title="actions.wayBill.title"
      :type="actions.wayBill.type"
      :disabled="actions.wayBill.disabled"
      :loading="actions.wayBill.loading"
      @action="handleActionWayBill"
    ></modal-confirm>

    <modal-confirm
      :visible.sync="visibleConfirmCancel"
      v-if="visibleConfirmCancel"
      :actionConfirm="actions.cancelPackage.button"
      :cancel="actions.cancelPackage.cancel"
      :description="actions.cancelPackage.Description"
      :title="actions.cancelPackage.title"
      :type="actions.cancelPackage.type"
      :disabled="actions.cancelPackage.disabled"
      :loading="actions.cancelPackage.loading"
      @action="cancelPackageAction"
    ></modal-confirm>
    <modal-confirm
      :visible.sync="visibleConfirmReturn"
      v-if="visibleConfirmReturn"
      :actionConfirm="actions.returnPackage.button"
      :cancel="actions.returnPackage.cancel"
      :description="actions.returnPackage.Description"
      :title="actions.returnPackage.title"
      :type="actions.returnPackage.type"
      :disabled="actions.returnPackage.disabled"
      :loading="actions.returnPackage.loading"
      @action="pendingPickupPackageAction"
    ></modal-confirm>
  </div>
</template>

<style scoped>
.sum-price {
  border-top: 1px solid #cfd0d0;
  margin-top: 16px;
  padding-top: 16px;
}

.sum-price:last-child {
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: #313232;
}
.disable-extra-fee {
  color: #cfd0d0;
}

#package-log {
  padding: 0 12px;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'
import { printImage } from '@core/utils/print'
import {
  FETCH_PACKAGE_DETAIL,
  FETCH_LIST_SERVICE,
  PROCESS_PACKAGE,
  CANCEL_PACKAGES,
  PENDING_PICKUP_PACKAGES,
} from '../store/index'
import mixinChaining from '@/packages/shared/mixins/chaining'
import ModalEditOrder from './components/ModalEditOrder'
import { LIST_SENDER } from '../../setting/store'
import NotFound from '@/components/shared/NotFound'
import {
  PACKAGE_STATUS_TAB,
  MAP_NAME_STATUS_PACKAGE,
  CHANGE_PACKAGE_TYPE,
  PackageStatusCreatedText,
  PackageStatusPendingPickupText,
  PackageStatusReturnText,
  PackageAlertTypeWarehoseReturn,
} from '../constants'
import ModalConfirm from '@components/shared/modal/ModalConfirm'
import { extension } from '@core/utils/url'
import { cloneDeep } from '@core/utils'
import api from '../api'
import mixinPackageDetail from '../mixins/package_detail'
import AuditLog from './components/AuditLog'
import DeliveryLog from './components/DeliveryLog'

export default {
  name: 'PackageDetail',
  mixins: [mixinChaining, mixinPackageDetail],
  components: { ModalEditOrder, ModalConfirm, NotFound, AuditLog, DeliveryLog },
  data() {
    return {
      isFetching: true,
      packageID: 0,
      displayDeliverDetail: false,
      isVisibleModal: false,
      isVisiblePopupMoreExtraFee: false,
      isVisibleConfirmWayBill: false,
      timelinePagination: {
        numberPage: 0,
        itemsPerPage: 10,
        currentPage: 1,
      },
      ConvertData: [],
      auditPagination: {
        numberPage: 0,
        itemsPerPage: 10,
        currentPage: 1,
      },
      actions: {
        wayBill: {
          type: 'primary',
          title: 'Xác nhận',
          button: 'Tạo tracking',
          Description: '',
          disabled: false,
          loading: false,
        },
        cancelPackage: {
          type: 'primary',
          title: 'Xác nhận hủy đơn',
          button: 'Hủy đơn',
          cancel: 'Bỏ qua',
          Description: '',
          disabled: false,
          loading: false,
        },
        returnPackage: {
          type: 'primary',
          title: 'Xác nhận chuyển lại hàng',
          button: 'Xác nhận',
          cancel: 'Bỏ qua',
          Description: '',
          disabled: false,
          loading: false,
        },
      },
      visibleConfirmCancel: false,
      isVisibleModalLabel: false,
      visibleConfirmReturn: false,
      blob: null,
      PackageStatusCreatedText: PackageStatusCreatedText,
      PackageStatusPendingPickupText: PackageStatusPendingPickupText,
      PackageStatusReturnText: PackageStatusReturnText,
      PackageAlertTypeWarehoseReturn: PackageAlertTypeWarehoseReturn,
    }
  },
  computed: {
    ...mapState('package', {
      package_detail: (state) => state.package_detail,
    }),
    displayDeliverLogs() {
      return this.ConvertData
    },
    displayAuditLogs() {
      const start =
        (this.auditPagination.currentPage - 1) *
        this.auditPagination.itemsPerPage
      return this.package_detail.audit_logs.slice(
        start,
        start + this.auditPagination.itemsPerPage
      )
    },

    sumExtraFee() {
      if (
        !this.package_detail.extra_fee ||
        this.package_detail.extra_fee.length <= 0
      ) {
        return 0
      }

      return this.package_detail.extra_fee.reduce(
        (total, { amount }) => total + amount,
        0
      )
    },
    sumFee() {
      return this.package_detail.package.shipping_fee + this.sumExtraFee
    },
    mapStatus() {
      return MAP_NAME_STATUS_PACKAGE
    },
    isImage() {
      const ext = extension(this.package_detail.package.label)
      return ['png', 'jpg', 'jpeg'].includes(ext)
    },
    extraFee() {
      return this.package_detail.extra_fee ? this.package_detail.extra_fee : []
    },
    packageStatus() {
      return PACKAGE_STATUS_TAB
    },
    changePackageType() {
      return CHANGE_PACKAGE_TYPE
    },
    mapExtraFee() {
      let arr = cloneDeep(this.extraFee),
        result = []

      for (const ele of arr) {
        let index = result.findIndex(
          (x) => x.extra_fee_types.name == ele.extra_fee_types.name
        )
        if (index == -1) {
          result.push(ele)
        } else result[index].amount += ele.amount
      }
      return result
    },
  },
  created() {
    this.packageID = parseInt(this.$route.params.id, 10)
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('package', [
      FETCH_PACKAGE_DETAIL,
      FETCH_LIST_SERVICE,
      PROCESS_PACKAGE,
      CANCEL_PACKAGES,
      PENDING_PICKUP_PACKAGES,
    ]),
    ...mapActions('setting', [LIST_SENDER]),

    async init() {
      this.isFetching = true
      let [detail, service] = await Promise.all([
        this.fetchPackage(this.packageID),
        this[FETCH_LIST_SERVICE](),
      ])
      if (!detail.success || service.error) {
        return
      }

      let recipientBlockHeight = document.getElementById('recipient-block')
        .offsetHeight
      let itemBlockHeight = document.getElementById('item-block').offsetHeight
      if (
        itemBlockHeight < recipientBlockHeight &&
        this.package_detail.package &&
        this.package_detail.package.detail
      ) {
        document.getElementById('item-block').style.height =
          recipientBlockHeight + 'px'
      }

      this.isFetching = false
    },

    changeDisplayDeliverDetail() {
      this.displayDeliverDetail = !this.displayDeliverDetail
    },
    handleModal() {
      this.isVisibleModal = true
    },
    showPopupMoreExtraFee() {
      this.isVisiblePopupMoreExtraFee = true
    },
    hiddenPopupMoreExtraFee() {
      this.isVisiblePopupMoreExtraFee = false
    },

    isOverThanOld(prop) {
      if (!this.package_detail.package) {
        return false
      }

      if (prop == 'weight') {
        return (
          this.package_detail.package.actual_weight >
          this.package_detail.package[prop]
        )
      }

      return (
        this.package_detail.package.actual_height *
          this.package_detail.package.actual_width *
          this.package_detail.package.actual_length >
        this.package_detail.package.height *
          this.package_detail.package.width *
          this.package_detail.package.length
      )
    },

    handleWayBill() {
      this.actions.wayBill.Description = `Bạn có chắc chắn muốn tạo tracking?`
      this.isVisibleConfirmWayBill = true
    },

    async handleActionWayBill() {
      let id = this.packageID
      let params = { ids: [id] }

      this.actions.wayBill.loading = true
      const res = await this.processPackage(params)
      this.isVisibleConfirmWayBill = false
      this.actions.wayBill.loading = false

      if (!res || !res.success) {
        this.$toast.error(res.message, { duration: 3000 })
        return
      }

      this.init()
      this.$toast.success('Tạo tracking thành công', { duration: 3000 })
    },

    handleCancelPackage() {
      this.actions.cancelPackage.Description = `Bạn có chắc chắn muốn hủy đơn?`
      this.visibleConfirmCancel = true
    },

    async cancelPackageAction() {
      let id = this.packageID
      let payload = { ids: [id] }

      this.actions.cancelPackage.loading = true
      const result = await this[CANCEL_PACKAGES](payload)
      this.visibleConfirmCancel = false
      this.actions.cancelPackage.loading = false

      if (!result || !result.success) {
        this.$toast.error(result.message, { duration: 3000 })
        return
      }

      this.init()
      this.$toast.success('Hủy đơn thành công', { duration: 3000 })
    },

    handlerReturnPackage() {
      this.actions.returnPackage.Description = `Bạn có chắc chắn muốn chuyển lại hàng ?`
      this.visibleConfirmReturn = true
    },

    async pendingPickupPackageAction() {
      const payload = {
        ids: [this.packageID],
      }
      this.actions.returnPackage.loading = true
      const result = await this[PENDING_PICKUP_PACKAGES](payload)
      this.visibleConfirmReturn = false
      this.actions.returnPackage.loading = false

      if (!result || !result.success) {
        this.$toast.error(result.message, { duration: 3000 })
        return
      }

      this.init()
      this.$toast.success('Chuyển lại hàng thành công', { duration: 3000 })
    },

    async showContent() {
      document.activeElement && document.activeElement.blur()

      const res = await api.fetchBarcodeFile({
        url: this.package_detail.package.label,
        type: 'labels',
      })

      if (!res && res.error) {
        this.$toast.error(res.errorMessage, { duration: 3000 })
        return
      }

      try {
        let blob = (window.webkitURL || window.URL).createObjectURL(res)
        printImage(blob)
      } catch (error) {
        this.$toast.error('File error !!!')
      }
    },
  },
}
</script>
