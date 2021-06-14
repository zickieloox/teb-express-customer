<template>
  <div class="pages list__claim">
    <div class="page-header">
      <div class="page-header_title header-2">Danh sách khiếu nại</div>
    </div>
    <div class="page-content">
      <div class="card">
        <div class="card-body">
          <div class="d-flex list__claim-search">
            <p-input
              placeholder="Tìm kiếm theo đơn hàng"
              prefixIcon="search"
              class="mb-2"
              type="search"
            >
            </p-input>
            <a href="#" class="btn btn-primary ml-10" @click="handleModal">
              <span>Tạo khiếu nại</span>
            </a>
          </div>
          <div class="list__claim-list">
            <status-tab v-model="filter.status" :status="claimStatus" />
            <vcl-table class=" md-20" v-if="isFetching"></vcl-table>
            <template v-else-if="claim.length > 0">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr class="list__claim-title">
                      <th>MÃ KHIẾU NẠI</th>
                      <th>MÃ VẬN ĐƠN </th>
                      <th>TIÊU ĐỀ</th>
                      <th>NGÀY TẠO</th>
                      <th>NGÀY CẬP NHẬT GẦN NHẤT</th>
                      <th>TRẠNG THÁI </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, i) in claim" :key="i">
                      <td>{{ item.id }}</td>
                      <td>{{ item.code }}</td>
                      <td width="235">
                        <p-tooltip
                          :label="item.title"
                          size="large"
                          position="top"
                          type="dark"
                          :active="item.title.length > 15"
                        >
                          {{ truncate(item.title, 15) }}
                        </p-tooltip>
                      </td>
                      <td>{{ item.created_at }}</td>
                      <td>{{ item.updated_at }}</td>
                      <td>{{ item.status }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
            <EmptySearchResult v-else></EmptySearchResult>
          </div>
        </div>
      </div>
    </div>
    <div
      class="d-flex justify-content-between align-items-center mb-16"
      v-if="claim.length > 0"
    >
      <p-pagination
        :total="3"
        :perPage.sync="filter.limit"
        :current.sync="filter.page"
        size="sm"
      ></p-pagination>
    </div>
    <modal-add-claim :visible.sync="visibleModal" :title="`Khiếu nại`">
    </modal-add-claim>
  </div>
</template>
<script>
import EmptySearchResult from '../../../components/shared/EmptySearchResult'
import { CLAIM_STATUS } from '../constants'
import { truncate } from '@core/utils/string'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import ModalAddClaim from '../components/ModalAddClaim'
export default {
  name: 'ListClaim',
  mixins: [mixinRoute, mixinTable],
  components: {
    EmptySearchResult,
    ModalAddClaim,
  },
  data() {
    return {
      filter: {
        limit: 1,
        search: '',
        status: '',
      },
      visibleModal: false,
      isFetching: false,
      claimStatus: CLAIM_STATUS,
      claim: [
        {
          id: 'MKN123456',
          code: 'MVD012345',
          title: 'Giao hàng chậm',
          created_at: '29/5/2021',
          updated_at: '29/5/2021',
          status: 'Đang xử lý',
        },
        {
          id: 'MKN123456',
          code: 'MVD012345',
          title: 'Giao hàng chậm',
          created_at: '29/5/2021',
          updated_at: '29/5/2021',
          status: 'Đang xử lý',
        },
        {
          id: 'MKN123456',
          code: 'MVD012345',
          title: 'Giao hàng chậm',
          created_at: '29/5/2021',
          updated_at: '29/5/2021',
          status: 'Đang xử lý',
        },
      ],
    }
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  mounted() {
    this.init()
  },
  methods: {
    truncate,
    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      this.isFetching = false
    },
    handleModal() {
      this.visibleModal = true
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
