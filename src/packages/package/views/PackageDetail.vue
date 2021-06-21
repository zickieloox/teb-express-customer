<template>
  <div class="package-detail pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header_back">
          <router-link :to="{ name: 'list-packages' }" class="text">
            <img
              src="@/assets/img/chevron-left.svg"
              alt=""
              class="page-header_back_icon"
            />
            <span>Quản lý vận đơn</span>
          </router-link>
        </div>

        <div class="page-header__subtitle">
          <div class="page-header__info">
            <div>
              <div>Mã vận đơn</div>
              <div class="package-code">{{ package_detail.package.code }}</div>
            </div>
            <div>
              <div>Dịch vụ </div>
              <div>{{ $evaluate('package_detail.package.service?.name') }}</div>
            </div>
            <div>
              <div>Ngày tạo </div>
              <div>{{
                package_detail.package.created_at
                  | datetime('dd-MM-yyyy HH:mm:ss')
              }}</div>
            </div>
            <div>
              <div>Trạng thái</div>
              <div>{{
                $evaluate(
                  `packageStatus[${package_detail.package.status}]?.text`
                ) || ''
              }}</div>
            </div>
          </div>
          <div class="page-header__action">
            <a href="#" class="btn btn-danger">
              <span>Hủy đơn</span>
            </a>
            <a
              @click="handleModal"
              href="#"
              class="btn btn-primary-custom ml-7"
            >
              <span>Sửa đơn</span>
            </a>
            <a href="#" class="btn btn-primary ml-7">
              <span>Vận đơn</span>
            </a>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-4 p-0">
                <div class="card-block">
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
                    <div v-if="package_detail.package.address_2" class="row">
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
              <div v-if="!displayDeliverDetail" class="col-8 p-0">
                <div class="row">
                  <div class="col-6 p-0">
                    <div class="card-block">
                      <div class="card-header">
                        <div class="card-title">Thông tin hàng hóa</div>
                      </div>
                      <div class="card-content">
                        <div class="row">
                          <div class="col-4 mb-8">Mã đơn hàng:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.code')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4 mb-8">Chi tiết hàng hóa:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.detail')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4 mb-8">SKU:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.sku')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4 mb-8">Trọng lượng:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.weight')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4 mb-8">Dài:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.length')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4 mb-8">Rộng:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.width')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4 mb-8">Cao:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.height')
                            }}</div></div
                          >
                        </div>
                      </div>
                    </div>
                    <div class="card-block">
                      <div class="card-header">
                        <div class="card-title">Phí</div>
                      </div>
                      <div class="card-content">
                        <div class="row">
                          <div class="col-8 mb-8">Phí giao hàng:</div>
                          <div class="col-4"
                            ><div>{{
                              $evaluate('package_detail.package?.shipping_fee')
                                | formatPrice
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-8 mb-8">Phí phát sinh:</div>
                          <div class="col-4 more-extra-fee"
                            ><div>{{ sumExtraFee | formatPrice }}</div
                            ><div v-if="extraFee.length" class="ml-2">
                              <img
                                @mouseover="showPopupMoreExtraFee"
                                @mouseleave="hiddenPopupMoreExtraFee"
                                src="~@/assets/img/InfoCircleGrey.svg"
                                alt=""
                              />
                            </div>
                            <div
                              v-if="isVisiblePopupMoreExtraFee"
                              class="pop-up-more-extra-fee"
                            >
                              <div v-for="(item, i) of extraFee" :key="i">
                                <div>{{ item.extra_fee_types.name }}</div>
                                <div>{{ item.amount | formatPrice }}</div>
                              </div>
                            </div></div
                          >
                        </div>
                        <div class="row sum-price">
                          <div class="col-8">Tổng cước:</div>
                          <div class="col-4"
                            ><div>{{ sumFee | formatPrice }}</div></div
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 p-0">
                    <div class="card-block">
                      <div class="card-header">
                        <div class="card-title">Hành trình đơn</div>
                        <div class="card-action"
                          ><a @click="changeDisplayDeliverDetail()" href="#"
                            >Lịch sử phát sinh</a
                          ></div
                        >
                      </div>
                      <div class="card-content deliver-log">
                        <div class="timeline">
                          <div
                            v-for="(item, i) in displayDeliverLogs"
                            :key="i"
                            :class="{
                              'first-item':
                                i === 0 && timelinePagination.currentPage === 1,
                            }"
                            class="timeline-item"
                          >
                            <div class="timeline-item__left">
                              <div>{{
                                item.ship_time | datetime('dd/MM/yyyy')
                              }}</div>
                              <div>{{
                                item.ship_time | datetime('HH:mm')
                              }}</div>
                            </div>
                            <div class="timeline-item__right">
                              <div>{{ item.location }}</div>
                            </div>
                          </div>
                        </div>
                        <div class="timeline__next-page">
                          <div
                            :class="{
                              'disable-next-page':
                                timelinePagination.currentPage <= 1,
                            }"
                            @click="previousTimeLinePage"
                            >Trước</div
                          ><div
                            :class="{
                              'disable-next-page':
                                timelinePagination.currentPage >=
                                  timelinePagination.numberPage ||
                                timelinePagination.numberPage <= 1,
                            }"
                            @click="nextTimeLinePage"
                            >Sau</div
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="displayDeliverDetail" class="col-8 p-0">
                <div class="row">
                  <div class="col-12">
                    <div class="card-block">
                      <div class="card-header">
                        <div class="card-action"
                          ><a @click="changeDisplayDeliverDetail()" href="#"
                            >Hành trình đơn</a
                          ></div
                        >
                        <div class="card-title">Lịch sử phát sinh</div>
                      </div>
                      <div class="card-content">
                        <template>
                          <div class="table-responsive">
                            <table class="table table-hover" id="tbl-packages">
                              <thead>
                                <tr>
                                  <th>Thời gian</th>
                                  <th>Người thực hiện</th>
                                  <th>Loại thay đổi</th>
                                  <th>Nội dung cũ</th>
                                  <th>Nội dung mới</th>
                                  <th>Phí sửa đơn</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(item, i) in displayAuditLogs"
                                  :key="i"
                                >
                                  <td>
                                    {{
                                      item.created_at
                                        | datetime('dd/MM/yyyy - HH:mm')
                                    }}
                                  </td>
                                  <td>{{ item.updated_user_name }}</td>
                                  <td>
                                    {{
                                      $evaluate(
                                        `changePackageType[${item.type}]`
                                      ) || ''
                                    }}
                                  </td>
                                  <td>
                                    {{ item.old_value }}
                                  </td>
                                  <td>{{ item.value }}</td>
                                  <td>{{ item.fee | formatPrice }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </template>
                        <div class="timeline__next-page">
                          <div
                            :class="{
                              'disable-next-page':
                                auditPagination.currentPage <= 1,
                            }"
                            @click="previousAuditLogPage"
                            >Trước</div
                          ><div
                            :class="{
                              'disable-next-page':
                                auditPagination.currentPage >=
                                  auditPagination.numberPage ||
                                auditPagination.numberPage <= 1,
                            }"
                            @click="nextAuditLogPage"
                            >Sau</div
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-edit-order
      :visible.sync="isVisibleModal"
      :info_user="package_detail"
      @create="init"
      :total="sumFee"
    >
    </modal-edit-order>
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
</style>
<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_PACKAGE_DETAIL, FETCH_LIST_SERVICE } from '../store/index'
import mixinChaining from '@/packages/shared/mixins/chaining'
import ModalEditOrder from './components/ModalEditOrder'
import { LIST_SENDER } from '../../setting/store'
import {
  PACKAGE_STATUS_TAB,
  CHANGE_PACKAGE_TYPE,
} from '@/packages/package/constants'
export default {
  name: 'PackageDetail',
  mixins: [mixinChaining],
  components: { ModalEditOrder },
  data() {
    return {
      isFetching: true,
      packageID: 0,
      displayDeliverDetail: false,
      isVisibleModal: false,
      isVisiblePopupMoreExtraFee: false,
      timelinePagination: {
        numberPage: 0,
        itemsPerPage: 10,
        currentPage: 1,
      },
      auditPagination: {
        numberPage: 0,
        itemsPerPage: 10,
        currentPage: 1,
      },
    }
  },
  computed: {
    ...mapState('package', {
      package_detail: (state) => state.package_detail,
    }),
    displayDeliverLogs() {
      const start =
        (this.timelinePagination.currentPage - 1) *
        this.timelinePagination.itemsPerPage
      return this.package_detail.deliver_logs.slice(
        start,
        start + this.timelinePagination.itemsPerPage
      )
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
      return this.package_detail.extra_fee.reduce((accu, curr) => ({
        amount: accu.amount + curr.amount,
      })).amount
    },
    sumFee() {
      return this.package_detail.package.shipping_fee + this.sumExtraFee
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
  },
  created() {
    this.packageID = parseInt(this.$route.params.id, 10)
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('package', [FETCH_PACKAGE_DETAIL, FETCH_LIST_SERVICE]),
    ...mapActions('setting', [LIST_SENDER]),
    async init() {
      this.isFetching = true
      await this.fetchPackage(this.packageID)
      // await this.listSender({})
      await this[FETCH_LIST_SERVICE]()
      this.isFetching = false
    },
    changeDisplayDeliverDetail() {
      this.displayDeliverDetail = !this.displayDeliverDetail
    },
    handleModal() {
      this.isVisibleModal = true
    },
    previousTimeLinePage() {
      this.timelinePagination.currentPage <= 1
        ? (this.timelinePagination.currentPage = 1)
        : (this.timelinePagination.currentPage -= 1)
    },
    nextTimeLinePage() {
      this.timelinePagination.currentPage =
        this.timelinePagination.currentPage >=
        this.timelinePagination.numberPage
          ? this.timelinePagination.numberPage
          : this.timelinePagination.currentPage + 1
    },
    previousAuditLogPage() {
      this.auditPagination.currentPage <= 1
        ? (this.auditPagination.currentPage = 1)
        : (this.auditPagination.currentPage -= 1)
    },
    nextAuditLogPage() {
      this.auditPagination.currentPage =
        this.auditPagination.currentPage >= this.auditPagination.numberPage
          ? this.auditPagination.numberPage
          : this.auditPagination.currentPage + 1
    },
    showPopupMoreExtraFee() {
      this.isVisiblePopupMoreExtraFee = true
    },
    hiddenPopupMoreExtraFee() {
      this.isVisiblePopupMoreExtraFee = false
    },
  },

  watch: {
    package_detail: {
      handler: function(val) {
        if (val.deliver_logs && val.deliver_logs.length > 0) {
          this.timelinePagination.numberPage = Math.ceil(
            val.deliver_logs.length / this.timelinePagination.itemsPerPage
          )
        }
        if (val.audit_logs && val.audit_logs.length > 0) {
          this.auditPagination.numberPage = Math.ceil(
            val.audit_logs.length / this.auditPagination.itemsPerPage
          )
        }
      },
      deep: true,
    },
  },
}
</script>
