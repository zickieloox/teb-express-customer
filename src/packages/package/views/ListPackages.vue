<template>
  <div class="list-packages pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header__title">
          <span class="pull-left">Quản lý vận đơn</span>
          <button class="pull-right btn-excel btn-import" @click="handleImport">
            <img src="~@/assets/img/import-excel.svg" />
            <span>Nhập Excel</span>
          </button>
          <button class="pull-right btn-excel btn-export" @click="handleExport">
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
                placeholder="Tìm theo đơn hàng..."
                suffixIcon="search"
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
                :label="`Tìm theo ngày`"
                id="date-search"
                :value="{
                  start_date: filter.start_date,
                  end_date: filter.end_date,
                }"
              ></p-datepicker>
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
                        <p-button class="bulk-actions__selection-status"
                          >Vận đơn</p-button
                        >
                        <p-button class="bulk-actions__selection-status"
                          >In đơn</p-button
                        >
                        <p-button class="bulk-actions__selection-status"
                          >Hủy đơn</p-button
                        >
                      </div>
                    </div>
                    <tr>
                      <th width="40">
                        <p-checkbox
                          :class="{ checkAll: totalSelected > 0 }"
                          :style="totalSelected > 0 && { width: 0 }"
                          :value="isAllChecked"
                          @change.native="toggleSelectAll"
                          :indeterminate="isIndeterminate"
                        ></p-checkbox>
                      </th>
                      <template>
                        <th :class="{ hidden: hiddenClass }">Mã vận đơn</th>
                        <th :class="{ hidden: hiddenClass }">Mã hàng hoá</th>
                        <th :class="{ hidden: hiddenClass }">Người gửi</th>
                        <th :class="{ hidden: hiddenClass }">Người nhận</th>
                        <th :class="{ hidden: hiddenClass }">Hàng hóa</th>
                        <th :class="{ hidden: hiddenClass }">Ngày tạo </th>
                        <th :class="{ hidden: hiddenClass }">Trạng thái</th>
                        <th :class="{ hidden: hiddenClass }">Tổng cước</th>
                      </template>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in packages" :key="i">
                      <td width="40">
                        <p-checkbox
                          v-model="action.selected"
                          :native-value="item"
                        ></p-checkbox>
                      </td>
                      <td>
                        <router-link
                          :to="{
                            name: 'package-detail',
                            params: {
                              id: item.id,
                            },
                          }"
                        >
                          {{ item.code }}
                        </router-link>
                      </td>
                      <td>{{ item.sku }}</td>
                      <td>
                        {{
                          item.sender ? item.sender.name : item.sender_full_name
                        }}
                      </td>
                      <td>
                        {{ item.recipient }}
                      </td>
                      <td>{{ item.items }}</td>
                      <td>{{ item.created_at | date('dd/MM/yyyy') }}</td>
                      <td>{{ mapStatus[item.status].value }}</td>
                      <td>{{ item.shipping_fee }} $</td>
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
      @close="handleCloseImportFile"
      @selected="handleImportPackage"
      v-if="isVisibleImport"
    >
    </modal-import>
    <modal-import-preview-package
      :visible.sync="isVisiblePreview"
      :import-errors="resultImport.errors"
      :import-sucess="resultImport.import_sucess"
      :total="resultImport.total"
      :importing="isImporting"
      @import="handleImportFile"
      v-if="isVisiblePreview"
    ></modal-import-preview-package>
    <modal-export :visible="isVisibleExport"> </modal-export>
  </div>
</template>
<script>
import ModalExport from './components/ModalExport'
import PackageStatusTab from './components/PackageStatusTab'
import ModalImportPreviewPackage from './components/ModalImportPreviewPackage'
import ModalImport from '@components/shared/modal/ModalImport'
import { mapState, mapActions } from 'vuex'
import mixinDownload from '@/packages/shared/mixins/download'
import {
  PACKAGE_STATUS_TAB,
  MAP_NAME_STATUS_PACKAGE,
} from '@/packages/package/constants'
import {
  FETCH_LIST_PACKAGES,
  IMPORT_PACKAGE,
  EXPORT_PACKAGE,
} from '@/packages/package/store'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { date } from '@core/utils/datetime'
export default {
  name: 'ListPackages',
  mixins: [mixinRoute, mixinTable, mixinDownload],
  components: {
    ModalImport,
    ModalImportPreviewPackage,
    EmptySearchResult,
    PackageStatusTab,
    ModalExport,
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
      isUploading: false,
      isImporting: false,
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
    }
  },
  created() {
    this.filter = this.getRouteQuery()
    this.searchCode = this.filter.code
    this.init()
  },
  computed: {
    ...mapState('package', {
      packages: (state) => state.packages,
      count: (state) => state.countPackages,
      count_status: (state) => state.count_status,
      hiddenClass() {
        return this.action.selected.length > 0 || this.isAllChecked
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
    ]),
    async init() {
      this.isFetching = true
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
      this.$set(this.filter, 'code', this.searchCode.trim())
    },
    handleImport() {
      this.isVisibleImport = true
    },
    async handleImportPackage(file) {
      this.importData.file = file
      this.isUploading = true
      this.resultImport = await this[IMPORT_PACKAGE]({
        file: this.importData.file.raw,
      })
      this.isUploading = false
      this.isVisibleImport = false
      this.isVisiblePreview = true

      if (this.resultImport && this.resultImport.success) {
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
    handleCloseImportFile() {},
    handleImportFile() {},
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
