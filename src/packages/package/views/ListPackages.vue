<template>
  <div class="list-packages pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header__title">
          <span class="pull-left">Quản lý đơn hàng</span>
          <button class="pull-right btn-excel btn-import" @click="handleImport">
            <img src="~@/assets/img/import-excel.svg" />
            <span>Nhập Excel</span>
          </button>
          <button
            class="pull-right btn-excel btn-export"
            @click="handleExport"
            :disabled="!hiddenClass"
          >
            <img src="~@/assets/img/export-excel.svg" />
            <span>Xuất Excel</span>
          </button>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="page-content">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <p-input
                placeholder="Tìm theo mã vận đơn hoặc mã đơn hàng, tracking number..."
                prefixIcon="search"
                type="search"
                v-model="searchCode"
                :suffix-func="handleSearchCode"
                @keyup.enter="handleSearchCode"
              >
              </p-input>
              <div class="d-flex date-search">
                <p-datepicker
                  :format="'dd/mm/yyyy'"
                  class="p-input-group input-group"
                  @update="selectDate"
                  :label="labelDate"
                  id="date-search"
                  :value="{
                    startDate: filter.start_date,
                    endDate: filter.end_date,
                  }"
                ></p-datepicker>
                <p-button
                  class="close ml-2"
                  type="default"
                  icon="close"
                  @click="clearSearchDate"
                  v-if="filter.start_date && filter.end_date"
                />
              </div>
            </div>
            <package-status-tab
              :has-all="false"
              :status="statusTab"
              v-model="filter.status"
              :count-status="count_status"
            />
            <VclTable class="mt-20" v-if="isFetching"></VclTable>
            <template v-else-if="packages.length">
              <div class="table-responsive">
                <table class="table table-hover" id="tbl-packages">
                  <thead>
                    <div
                      class="bulk-actions d-flex align-items-center"
                      v-if="totalSelected > 0"
                    >
                      <div class="bulk-actions__main-bar">
                        <span class="bulk-actions__selection-count">{{
                          selectionCountText
                        }}</span>
                        <p-button
                          :disabled="createOrder(filter.status)"
                          class="bulk-actions__selection-status"
                          @click="handleWayBill"
                          >Vận đơn</p-button
                        >
                        <p-button
                          :disabled="cancelOrder(filter.status)"
                          class="bulk-actions__selection-status"
                          @click="handlerCancelPackages"
                          >Hủy đơn</p-button
                        >
                        <p-button
                          v-if="isReturnTab()"
                          class="bulk-actions__selection-status"
                          @click="handlerReturnPackages"
                          >Chuyển lại hàng</p-button
                        >
                        <p-button
                          class="bulk-actions__selection-status"
                          @click="handlerDownloadLables"
                          >Tải label</p-button
                        >
                      </div>
                    </div>
                    <tr>
                      <th width="40">
                        <p-checkbox
                          class="order-select-checkbox"
                          :class="{ checkAll: totalSelected > 0 }"
                          :style="totalSelected > 0 && { width: 0 }"
                          :value="isAllChecked"
                          @change.native="toggleSelectAll"
                          :indeterminate="isIndeterminate"
                        ></p-checkbox>
                      </th>
                      <template>
                        <th width="300" :class="{ hidden: hiddenClass }"
                          >Mã vận đơn</th
                        >
                        <th :class="{ hidden: hiddenClass }">Mã đơn hàng</th>
                        <th :class="{ hidden: hiddenClass }">Tracking</th>
                        <th :class="{ hidden: hiddenClass }">Người nhận</th>
                        <th :class="{ hidden: hiddenClass }">Dịch vụ</th>
                        <th :class="{ hidden: hiddenClass }">Ngày tạo </th>
                        <th :class="{ hidden: hiddenClass }">Trạng thái</th>
                        <th
                          style="text-align: right"
                          :class="{ hidden: hiddenClass }"
                          >Tổng cước</th
                        >
                      </template>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in packages"
                      :key="i"
                      :class="{
                        hover: isChecked(item),
                        deactive:
                          item.package_code &&
                          item.package_code.status == PackageStatusDeactive,
                      }"
                    >
                      <td width="40">
                        <p-checkbox
                          v-model="action.selected"
                          :native-value="item"
                          @input="handleValue($event)"
                        ></p-checkbox>
                      </td>
                      <td width="300" class="action">
                        <span class="code">
                          <p-tooltip
                            :label="
                              item.package_code ? item.package_code.code : ''
                            "
                            v-if="item.package_code"
                            size="large"
                            position="top"
                            type="dark"
                            :active="item.package_code.code.length > 18"
                          >
                            <router-link
                              class="text-no-underline"
                              :to="{
                                name: 'package-detail',
                                params: {
                                  id: item.id,
                                },
                              }"
                            >
                              {{
                                truncate(
                                  item.package_code
                                    ? item.package_code.code
                                    : '',
                                  18
                                )
                              }}
                            </router-link>
                          </p-tooltip>

                          <span
                            v-if="!item.validate_address"
                            @click="handleValidateAddress(item.id)"
                            class="
                            list-warning
                            badge badge-round badge-warning-order
                          "
                          >
                            <p-tooltip
                              class="item_name"
                              :label="
                                `Địa chỉ không hợp lệ \n Kích vào đây để xác nhận rằng địa chỉ hiện tại chắc chắn hợp lệ`
                              "
                              position="top"
                              type="dark"
                            >
                              <i aria-hidden="true"
                                ><img src="@assets/img/warning.svg" />
                              </i>
                            </p-tooltip>
                          </span>
                        </span>

                        <span class="link" style="float: right">
                          <span class="svg">
                            <p-tooltip
                              class="item_name"
                              :label="` Copy `"
                              position="top"
                              type="dark"
                            >
                              <copy
                                :value="
                                  item.package_code
                                    ? item.package_code.code
                                    : ''
                                "
                              >
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="16" cy="16" r="16" fill="none" />

                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M21.9823 11.3982H20.6372V10.0531C20.6372 8.92035 19.7168 8 18.6195 8H10.0531C8.92035 8 8 8.92035 8 10.0531V18.6195C8 19.7168 8.92035 20.6372 10.0531 20.6372H11.3982V21.9823C11.3982 23.115 12.2832 24 13.4159 24H21.9823C23.115 24 24 23.115 24 21.9823V13.4159C24 12.2832 23.115 11.3982 21.9823 11.3982ZM18.9735 11.3982H13.4159C12.2832 11.3982 11.3982 12.2832 11.3982 13.4159V18.9735H10.0531C9.9469 18.9735 9.84071 18.9381 9.80531 18.8673C9.73451 18.7965 9.69912 18.7257 9.69912 18.6195V10.0531C9.69912 9.9469 9.73451 9.84071 9.80531 9.80531C9.84071 9.73451 9.9469 9.69912 10.0531 9.69912H18.6195C18.7257 9.69912 18.7965 9.73451 18.8673 9.80531C18.9381 9.84071 18.9735 9.9469 18.9735 10.0531V11.3982Z"
                                    fill="#313232"
                                  />
                                </svg>
                              </copy>
                            </p-tooltip>
                          </span>

                          <span
                            @click="showContent(item)"
                            v-if="item.label"
                            class="svg"
                          >
                            <p-tooltip
                              class="item_name"
                              :label="` Print `"
                              position="top"
                              type="dark"
                            >
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="16" cy="16" r="16" fill="none" />

                                <path
                                  d="M21.7143 9.14286C21.7143 8.512 21.2023 8 20.5714 8H11.4286C10.7977 8 10.2857 8.512 10.2857 9.14286V10.2857H21.7143V9.14286Z"
                                  fill="#313232"
                                />
                                <path
                                  d="M22.8571 11.4286H9.14286C8.512 11.4286 8 11.9406 8 12.5714V19.4286C8 20.0594 8.512 20.5714 9.14286 20.5714H10.2857V22.8572C10.2857 23.488 10.7977 24 11.4286 24H20.5714C21.2023 24 21.7143 23.488 21.7143 22.8572V20.5714H22.8571C23.488 20.5714 24 20.0594 24 19.4286V12.5714C24 11.9406 23.488 11.4286 22.8571 11.4286ZM20.5714 22.8572H11.4286V17.1429H20.5714V22.8572ZM21.7143 14.8572H19.4286V13.7143H21.7143V14.8572Z"
                                  fill="#313232"
                                />
                                <path
                                  d="M16 20.5714H12.5714V21.7143H16V20.5714Z"
                                  fill="#313232"
                                />
                                <path
                                  d="M19.4286 18.2857H12.5714V19.4286H19.4286V18.2857Z"
                                  fill="#313232"
                                />
                              </svg>
                            </p-tooltip>
                          </span>

                          <span class="svg">
                            <p-tooltip
                              class="item_name"
                              :label="` Track `"
                              position="top"
                              type="dark"
                            >
                              <a
                                target="_blank"
                                :href="
                                  `https://t.17track.net/en#nums=${
                                    item.package_code
                                      ? item.package_code.code
                                      : ''
                                  }`
                                "
                              >
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="16" cy="16" r="16" fill="none" />
                                  <g clip-path="url(#clip0_382_4459)">
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M12.0682 18.9542L8.14707 17.6451C7.95102 17.5204 7.95102 17.3957 8.14707 17.2711L23.4723 8.04502C23.6356 7.95151 23.701 8.01385 23.7337 8.13853L23.9951 22.5074C24.0278 22.7568 23.8971 22.8815 23.6356 22.7568L18.2114 20.9802L16.4795 23.9101C16.4142 24.0347 16.2508 24.0347 16.2508 23.8789L15.7607 20.0763L21.7404 11.5671L14.8784 18.2373C14.1268 18.9542 13.2119 19.2035 12.0682 18.9542Z"
                                      fill="#313232"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_382_4459">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                        transform="translate(8 8)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </a>
                            </p-tooltip>
                          </span>
                        </span>
                      </td>
                      <td>{{ item.order_number }}</td>
                      <td>
                        <a
                          target="_blank"
                          v-if="item.tracking && item"
                          :href="
                            `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${
                              item.tracking.tracking_number
                            }`
                          "
                        >
                          {{ item.tracking.tracking_number }}
                        </a>
                      </td>
                      <td>
                        {{ item.recipient }}
                      </td>
                      <td v-if="item.service">
                        {{ item.service.name }}
                      </td>
                      <td v-if="!item.service"> N/A </td>
                      <td>{{ item.created_at | date('dd/MM/yyyy') }}</td>
                      <td>
                        <span
                          v-status:status="mapStatus[item.status_string].value"
                        ></span>
                      </td>
                      <td style="text-align: right">{{
                        item.shipping_fee | formatPrice
                      }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-16"
                v-if="count > 0"
              >
                <p-pagination
                  :total="count"
                  :perPage.sync="filter.limit"
                  :current.sync="filter.page"
                  size="sm"
                ></p-pagination>
              </div>
            </template>
            <empty-search-result v-else></empty-search-result>
          </div>
        </div>
      </div>
    </div>
    <modal-import
      :visible.sync="isVisibleImport"
      :uploading="isUploading"
      accept=".csv"
      title="Nhập Excel"
      @selected="handleImportPackage"
      v-if="isVisibleImport"
    >
    </modal-import>
    <modal-import-preview-package
      :visible.sync="isVisiblePreview"
      :import-errors="resultImport.errors"
      :import-sucess="resultImport.import_sucess"
      :total="resultImport.total"
      v-if="isVisiblePreview"
      @close="handleClosePreview"
    ></modal-import-preview-package>
    <modal-export :visible="isVisibleExport"> </modal-export>
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
      @action="cancelPackagesAction"
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
      @action="pendingPickupPackagesAction"
    ></modal-confirm>
    <modal-confirm
      :visible.sync="visibleConfirmValidate"
      v-if="visibleConfirmValidate"
      :actionConfirm="actions.validateAddress.button"
      :cancel="actions.validateAddress.cancel"
      :description="actions.validateAddress.Description"
      :title="actions.validateAddress.title"
      :type="actions.validateAddress.type"
      :disabled="actions.validateAddress.disabled"
      :loading="actions.validateAddress.loading"
      @action="validateAddressPackage"
    ></modal-confirm>
  </div>
</template>
<script>
import ModalExport from './components/ModalExport'
import PackageStatusTab from './components/PackageStatusTab'
import ModalImportPreviewPackage from './components/ModalImportPreviewPackage'
import ModalImport from '@components/shared/modal/ModalImport'
import { mapState, mapActions } from 'vuex'
import mixinDownload from '@/packages/shared/mixins/download'
import evenBus from '../../../core/utils/evenBus'
import ModalConfirm from '@components/shared/modal/ModalConfirm'
import mixinChaining from '@/packages/shared/mixins/chaining'
import {
  PACKAGE_STATUS_TAB,
  PackageStatusCreatedText,
  PackageStatusReturnText,
  MAP_NAME_STATUS_PACKAGE,
  PackageStatusDeactive,
} from '../constants'
import {
  FETCH_LIST_PACKAGES,
  IMPORT_PACKAGE,
  EXPORT_PACKAGE,
  PROCESS_PACKAGE,
  CANCEL_PACKAGES,
  PENDING_PICKUP_PACKAGES,
  VALIDATE_ADDRESS,
} from '@/packages/package/store'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { date } from '@core/utils/datetime'
import { truncate } from '@core/utils/string'
import { printImage } from '@core/utils/print'
import api from '../api'

import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { SET_LOADING } from '../store'
import Copy from '../../bill/components/Copy.vue'

export default {
  name: 'ListPackages',
  mixins: [mixinRoute, mixinTable, mixinDownload, mixinChaining],
  components: {
    ModalImport,
    ModalImportPreviewPackage,
    EmptySearchResult,
    PackageStatusTab,
    ModalExport,
    ModalConfirm,
    Copy,
  },
  data() {
    return {
      filter: {
        limit: 25,
        status: '',
        search: '',
        start_date: '',
        end_date: '',
        code: '',
      },
      labelDate: `Tìm theo ngày`,
      isUploading: false,
      isVisibleExport: false,
      isVisiblePreview: false,
      isVisibleImport: false,
      importData: {
        file: null,
      },
      importDataErrors: {},
      resultImport: {},
      searchCode: '',
      allowSearch: true,
      isFetching: false,
      actions: {
        wayBill: {
          type: 'primary',
          title: 'Xác nhận vận đơn',
          button: 'Vận đơn',
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
        validateAddress: {
          type: 'primary',
          title: 'Kiểm tra lại địa chỉ',
          button: 'Xác nhận',
          cancel: 'Bỏ qua',
          Description: '',
          disabled: false,
          loading: false,
        },
      },
      isVisibleConfirmWayBill: false,
      visibleConfirmCancel: false,
      visibleConfirmReturn: false,
      visibleConfirmValidate: false,
      selected: [],
      idSelected: 0,
      PackageStatusDeactive: PackageStatusDeactive,
    }
  },
  created() {
    evenBus.$on('code', this.updateQuery)
    this.filter = this.getRouteQuery()
    this.searchCode = this.filter.code
  },
  computed: {
    ...mapState('package', {
      packages: (state) => state.packages,
      count: (state) => state.countPackages,
      count_status: (state) => state.count_status,
      hiddenClass() {
        return this.action.selected.length > 0 || this.isAllChecked
      },
      isFilterInitTab() {
        return this.filter.status_string === PackageStatusCreatedText
      },
      items() {
        return this.packages
      },
    }),
    statusTab() {
      return PACKAGE_STATUS_TAB
    },
    mapStatus() {
      return MAP_NAME_STATUS_PACKAGE
    },
  },
  methods: {
    ...mapActions('package', [
      FETCH_LIST_PACKAGES,
      IMPORT_PACKAGE,
      EXPORT_PACKAGE,
      PROCESS_PACKAGE,
      CANCEL_PACKAGES,
      PENDING_PICKUP_PACKAGES,
      VALIDATE_ADDRESS,
      SET_LOADING,
    ]),
    truncate,
    async init() {
      this.isFetching = true
      this.action.selected = []
      this.handleUpdateRouteQuery()
      const result = await this.fetchListPackages(this.filter)
      this.isFetching = false
      if (!result.success) {
        this.$toast.open({ message: result.message, type: 'error' })
      }
    },
    selectDate(v) {
      this.filter.start_date = date(v.startDate, 'yyyy-MM-dd')
      this.filter.end_date = date(v.endDate, 'yyyy-MM-dd')
    },
    handleSearchCode() {
      this.filter.page = 1
      this.searchCode = this.searchCode.trim()
      this.$set(this.filter, 'code', this.searchCode)
    },
    updateQuery(e) {
      this.filter.page = 1
      this.searchCode = e
      this.$set(this.filter, 'code', this.searchCode)
    },
    handleClosePreview() {
      this.filter = {
        limit: 20,
        status: '',
        search: '',
        start_date: '',
        end_date: '',
        code: '',
      }
      this.init()
    },
    handleImport() {
      this.isVisibleImport = true
    },
    clearSearchDate() {
      this.filter.end_date = ''
      this.filter.start_date = ''
      this.filter.page = 1
    },
    async handleImportPackage(file, template) {
      this.importData.file = file
      this.isUploading = true
      this.resultImport = await this[IMPORT_PACKAGE]({
        file: this.importData.file.raw,
        template_id: template.id,
      })
      this.isUploading = false
      this.isVisibleImport = false

      if (this.resultImport && this.resultImport.success) {
        this.isVisiblePreview = true
        return
      }

      this.$toast.open({
        type: 'error',
        message: this.resultImport.message || 'File không đúng định dạng',
      })
    },
    async handleExport() {
      this.isVisibleExport = true
      const result = await this[EXPORT_PACKAGE]({
        ids: this.selectedIds,
      })
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 3000,
        })
        this.isVisibleExport = false
        return
      }
      this.downloadFile(
        result.url,
        'packages',
        result.url.split('/'),
        'danh_sach_van_don_'
      )
      this.isVisibleExport = false
    },
    isReturnTab() {
      return this.filter.status === PackageStatusReturnText
    },
    createOrder(value) {
      switch (value) {
        case 'created':
          return false
        case 'pending-pickup':
          return true
        case 'processing':
          return true
        case 'in-transit':
          return true
        case 'delivered':
          return true
        case 'return':
          return true
        case 'cancelled':
          return true
        default:
          return false
      }
    },

    cancelOrder(status) {
      switch (status) {
        case 'created':
          return false
        case 'pending-pickup':
          return true
        case 'processing':
          return true
        case 'in-transit':
          return true
        case 'delivered':
          return true
        case 'return':
          return true
        case 'cancelled':
          return true
        default:
          return false
      }
    },
    handleValue(e) {
      this.selected = JSON.parse(JSON.stringify(e))
    },
    handlerCancelPackages() {
      const selectedInvalid = this.selected.filter(
        (ele) => ele.status_string !== PackageStatusCreatedText
      )
      if (selectedInvalid.length > 0) {
        let codeSelectedInvalid = selectedInvalid.map((ele) => ele.code)
        if (codeSelectedInvalid.length > 3) {
          codeSelectedInvalid = [...codeSelectedInvalid.slice(0, 3), '...']
        }
        return this.$toast.open({
          type: 'error',
          message: `Đơn hàng ${codeSelectedInvalid.join(
            ', '
          )} không thể hủy đơn.`,
          duration: 5000,
        })
      }
      this.actions.cancelPackage.Description = `Tổng số đơn hàng đang chọn là ${
        this.selectedIds.length
      }. Bạn có chắc chắn muốn hủy đơn?`
      this.visibleConfirmCancel = true
    },
    handlerReturnPackages() {
      const selectedInvalid = this.selected.filter(
        (ele) => ele.status_string !== PackageStatusReturnText
      )

      if (selectedInvalid.length > 0) {
        let codeSelectedInvalid = selectedInvalid.map((ele) => ele.code)
        if (codeSelectedInvalid.length > 3) {
          codeSelectedInvalid = [...codeSelectedInvalid.slice(0, 3), '...']
        }
        return this.$toast.open({
          type: 'error',
          message: `Đơn hàng ${codeSelectedInvalid.join(
            ', '
          )} không thể chuyển lại hàng.`,
          duration: 5000,
        })
      }
      this.actions.returnPackage.Description = `Tổng số đơn hàng đang chọn là ${
        this.selectedIds.length
      }. Bạn có chắc chắn muốn chuyển lại hàng ?`
      this.visibleConfirmReturn = true
    },
    async pendingPickupPackagesAction() {
      const payload = {
        ids: this.selectedIds,
      }
      this.actions.returnPackage.loading = true
      const result = await this[PENDING_PICKUP_PACKAGES](payload)
      this.visibleConfirmReturn = false
      this.actions.returnPackage.loading = false
      if (!result || !result.success) {
        return this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 3000,
        })
      }
      this.init()
      this.$toast.open({
        type: 'success',
        message: 'Chuyển lại hàng thành công',
        duration: 3000,
      })
    },
    async cancelPackagesAction() {
      const payload = {
        ids: this.selectedIds,
      }
      this.actions.cancelPackage.loading = true
      const result = await this[CANCEL_PACKAGES](payload)
      this.visibleConfirmCancel = false
      this.actions.cancelPackage.loading = false
      if (!result || !result.success) {
        return this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 3000,
        })
      }
      this.init()
      this.$toast.open({
        type: 'success',
        message: 'Hủy đơn thành công',
        duration: 3000,
      })
    },
    handleWayBill() {
      let selectedInvalid = this.selected.filter(
        (ele) => ele.status_string !== PackageStatusCreatedText
      )
      if (selectedInvalid.length > 0) {
        let codeSelectedInvalid = selectedInvalid.map(
          (ele) => ele.package_code.code
        )
        if (codeSelectedInvalid.length > 3) {
          codeSelectedInvalid = [...codeSelectedInvalid.slice(0, 3), '...']
        }
        return this.$toast.open({
          type: 'error',
          message: `Đơn hàng ${codeSelectedInvalid.join(
            ', '
          )} không thể vận đơn.`,
          duration: 5000,
        })
      }
      this.actions.wayBill.Description = `Tổng số đơn hàng đang chọn là ${
        this.selected.length
      }. Bạn có chắc chắn muốn vận đơn?`
      this.isVisibleConfirmWayBill = true
    },
    async handleActionWayBill() {
      let ids
      ids = this.selected.map((item) => item.id)

      let params = {
        ids: ids,
      }

      this.actions.wayBill.loading = true
      this.result = await this.processPackage(params)
      this.isVisibleConfirmWayBill = false
      this.actions.wayBill.loading = false

      if (!this.result || !this.result.success) {
        return this.$toast.open({
          type: 'error',
          message: this.result.message,
          duration: 3000,
        })
      }

      this.init()
      this.$toast.open({
        type: 'success',
        message: 'Vận đơn thành công',
        duration: 3000,
      })
    },

    async showContent(item) {
      document.activeElement && document.activeElement.blur()

      const res = await api.fetchBarcodeFile({
        url: item.label,
        type: 'labels',
      })
      if (!res && res.error) {
        this.$toast.open({
          type: 'error',
          message: res.errorMessage,
          duration: 3000,
        })
        return
      }

      try {
        let blob = (window.webkitURL || window.URL).createObjectURL(res)
        printImage(blob)
      } catch (error) {
        this.$toast.error('File error !!!')
      }
    },

    handleValidateAddress(id) {
      this.idSelected = id
      this.actions.validateAddress.Description = `Bạn chắc chắn đây là địa chỉ hợp lệ? Xin vui lòng xác nhận!`
      this.visibleConfirmValidate = true
    },
    async validateAddressPackage() {
      this.actions.validateAddress.loading = true
      const payload = {
        ids: [this.idSelected],
      }
      const result = await this[VALIDATE_ADDRESS](payload)
      if (!result || !result.success) {
        this.visibleConfirmValidate = false
        this.actions.validateAddress.loading = false
        return this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 3000,
        })
      }
      setTimeout(() => {
        this.actions.validateAddress.loading = false
        this.visibleConfirmValidate = false
        this.init()
      }, 1500)
    },

    async handlerDownloadLables() {
      this[SET_LOADING](true)
      var files = []
      var selected = this.selected.map((x) => {
        return {
          order_number: x.order_number,
          code: x.package_code.code,
          url: x.label,
        }
      })
      for (const item of selected) {
        const res = await api.fetchBarcodeFile({
          url: item.url,
          type: 'labels',
        })
        if (!res && res.error) {
          this.$toast.open({
            type: 'error',
            message: res.errorMessage,
            duration: 3000,
          })
          continue
        }
        res['name'] = item.order_number + '_' + item.code + '.png'
        files.push(res)
      }

      this[SET_LOADING](false)

      var zip = new JSZip()
      Array.from(files).forEach((file) => {
        zip.file(file.name, file)
      })
      zip.generateAsync({ type: 'blob' }).then(function(content) {
        // see FileSaver.js
        saveAs(content, 'label.zip')
      })
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

<style scoped lang="scss">
.p-tooltip::after {
  width: auto !important;
  white-space: pre;
}
.deactive {
  td {
    opacity: 0.6;
  }
}
</style>
