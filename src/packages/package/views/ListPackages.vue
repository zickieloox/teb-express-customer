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
                        <th :class="{ hidden: hiddenClass }">Mã vận đơn</th>
                        <th :class="{ hidden: hiddenClass }">Mã đơn hàng</th>
                        <th :class="{ hidden: hiddenClass }">Tracking</th>
                        <th :class="{ hidden: hiddenClass }">Người nhận</th>
                        <th :class="{ hidden: hiddenClass }">Dịch vụ</th>
                        <th width="100" :class="{ hidden: hiddenClass }"
                          >Ngày tạo
                        </th>
                        <th width="100" :class="{ hidden: hiddenClass }"
                          >Trạng thái</th
                        >
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
                      :class="{ hover: isChecked(item) }"
                    >
                      <td width="40">
                        <p-checkbox
                          v-model="action.selected"
                          :native-value="item"
                          @input="handleValue($event)"
                        ></p-checkbox>
                      </td>
                      <td>
                        <router-link
                          class="text-no-underline"
                          :to="{
                            name: 'package-detail',
                            params: {
                              id: item.id,
                            },
                          }"
                        >
                          {{ item.package_code ? item.package_code.code : '' }}
                        </router-link>

                        <span
                          @click="showContent(item)"
                          v-if="item.label"
                          class="page-header__barcode"
                        >
                          <img
                            src="@/assets/img/Vector-barcode.png"
                            style="margin-left: 10px;margin-bottom: 3px;"
                          />
                        </span>
                      </td>
                      <td>{{ item.order_number }}</td>
                      <td>
                        <a
                          target="_blank"
                          v-if="item.tracking && item"
                          :href="
                            `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${item.tracking.tracking_number}`
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
                      <td v-if="!item.service">
                        N/A
                      </td>
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
} from '../constants'
import {
  FETCH_LIST_PACKAGES,
  IMPORT_PACKAGE,
  EXPORT_PACKAGE,
  PROCESS_PACKAGE,
  CANCEL_PACKAGES,
  PENDING_PICKUP_PACKAGES,
} from '@/packages/package/store'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { date } from '@core/utils/datetime'
import { truncate } from '@core/utils/string'
import { printImage } from '@core/utils/print'
import api from '../api'

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
  },
  data() {
    return {
      filter: {
        limit: 50,
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
      },
      isVisibleConfirmWayBill: false,
      visibleConfirmCancel: false,
      visibleConfirmReturn: false,
      selected: [],
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
    async handleImportPackage(file) {
      this.importData.file = file
      this.isUploading = true
      this.resultImport = await this[IMPORT_PACKAGE]({
        file: this.importData.file.raw,
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
      this.actions.cancelPackage.Description = `Tổng số đơn hàng đang chọn là ${this.selectedIds.length}. Bạn có chắc chắn muốn hủy đơn?`
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
      this.actions.returnPackage.Description = `Tổng số đơn hàng đang chọn là ${this.selectedIds.length}. Bạn có chắc chắn muốn chuyển lại hàng ?`
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
      this.actions.wayBill.Description = `Tổng số đơn hàng đang chọn là ${this.selected.length}. Bạn có chắc chắn muốn vận đơn?`
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

<style></style>
