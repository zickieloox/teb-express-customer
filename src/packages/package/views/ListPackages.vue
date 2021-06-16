<template>
  <div class="list-packages pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header__title header-2">Quản lý vận đơn</div>
      </div>
      <div class="page-content">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <p-input
                placeholder="Tìm theo đơn hàng..."
                suffixIcon="search"
                class="mb-2"
                type="search"
              >
              </p-input>
              <div> </div>
              <p-datepicker
                class="date birthday p-input-group input-group"
                id="date-search"
                :format="'dd/mm/yyyy'"
                :label="label"
                :single-date-picker="true"
                :showDropdowns="true"
                :autoApply="true"
              >
              </p-datepicker>
            </div>
            <package-status-tab :status="statusTab" />
            <div class="table-responsive">
              <table class="table table-hover" id="tbl-packages">
                <thead>
                  <tr>
                    <th width="40">
                      <p-checkbox></p-checkbox>
                    </th>
                    <th>Mã vận đơn</th>
                    <th>Mã đơn hàng</th>
                    <th>Người gửi</th>
                    <th>Người nhận</th>
                    <th>Hàng hóa</th>
                    <th>Item Name</th>
                    <th>SKU</th>
                    <th>Full name</th>
                    <th>Country</th>
                    <th>Quantity</th>
                    <th>Shipping method</th>
                    <th>Design</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="40">
                      <p-checkbox></p-checkbox>
                    </td>
                    <td>1</td>
                    <td>abcxzy</td>
                    <td>
                      bacsd1
                    </td>
                    <td>dsadsa</td>
                    <td>dasd</td>
                    <td>dsa</td>
                    <td>dsa</td>
                    <td>dsa</td>
                    <td>{dsad</td>
                    <td>{dsad</td>
                    <td>
                      dsads
                    </td>
                    <td>
                      dsadas
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="d-flex justify-content-between align-items-center mb-16"
              v-if="count_senders > 0"
            >
              <p-pagination
                :total="count_senders"
                :perPage.sync="filter.limit"
                :current.sync="filter.page"
                size="sm"
              ></p-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PackageStatusTab from '@/packages/package/views/components/PackageStatusTab'
import { PACKAGE_STATUS_TAB } from '@/packages/package/constants'
export default {
  name: 'ListPackages',
  components: { PackageStatusTab },
  data() {
    return {
      filter: {
        limit: 50,
        search: '',
      },
    }
  },
  computed: {
    ...mapState('package', {
      package_detail: (state) => state.package_detail,
    }),
    count_senders() {
      return 155
    },
    statusTab() {
      return PACKAGE_STATUS_TAB
    },
  },
}
</script>

<style></style>
