<template>
  <div class="setting list-sender pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header_title header-2">Danh sách người gửi</div>
      </div>
      <div class="page-content">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <p-input
                placeholder="Tìm theo mã hoặc tên người gửi ..."
                prefixIcon="search"
                class="mb-2"
                :value="filter.search"
                @keyup.enter="handleSearch"
                type="search"
              >
              </p-input>
              <a
                href="#"
                class="btn btn-primary"
                @click.prevent="visibleModalAddSender"
              >
                <span>Thêm người gửi</span>
              </a>
            </div>
            <vcl-table class=" md-20" v-if="isFetching"></vcl-table>
            <template v-else-if="displaySenders.length > 0">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Tên</th>
                      <th>Số điện thoại</th>
                      <th>Địa chỉ</th>
                      <th>Tỉnh/Thành phố</th>
                      <th>Quận/Huyện</th>
                      <th>Phường/Xã</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, i) in displaySenders" :key="i">
                      <td>
                        {{ item.id }}
                      </td>
                      <td>
                        {{ item.name }}
                        <i
                          v-if="item.is_default"
                          style="color: #075027"
                          class="icon md-check-circle"
                        ></i>
                      </td>
                      <td>{{ item.phone_number }}</td>
                      <td>
                        <p-tooltip
                          :label="item.address"
                          size="large"
                          position="top"
                          type="dark"
                          :active="item.address.length > 20"
                        >
                          {{ truncate(item.address || '-'[0], 20) }}
                        </p-tooltip>
                      </td>
                      <td>{{ item.city }}</td>
                      <td>{{ item.district }}</td>
                      <td>{{ item.wards }}</td>
                      <td
                        ><span
                          @click="showModalEditSender(item.id)"
                          class="edit-sender"
                          ><img src="~@/assets/img/EditSquare.svg" alt="" />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
            <EmptySearchResult v-else title=""></EmptySearchResult>
          </div>
        </div>
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
    <modal-add-sender
      :visible.sync="isVisibleModalAddSender"
      :title="titleModal"
      :sender="selectedSender"
      :cities="addresses"
      @saveSender="saveSender"
      @close="closeModal"
    >
    </modal-add-sender>
  </div>
</template>

<script>
import EmptySearchResult from '../../../components/shared/EmptySearchResult'
import { mapState, mapActions } from 'vuex'
import { LIST_SENDER, CREATE_SENDER, UPDATE_SENDER } from '../store/index'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { truncate } from '@core/utils/string'
import ModalAddSender from '../components/ModalAddSender'
import { FETCH_ADDRESSES } from '@/packages/shared/store'
import { cloneDeep } from '@core/utils'
export default {
  name: 'ListSender',
  mixins: [mixinRoute, mixinTable],
  components: {
    EmptySearchResult,
    ModalAddSender,
  },
  data() {
    return {
      isFetching: true,
      isVisibleModalAddSender: false,
      selectedSender: {},
      titleModal: '',
      filter: {
        limit: 50,
        search: '',
      },
      cityCode: '',
      districtCode: '',
      wardsCode: '',
    }
  },
  computed: {
    ...mapState('setting', {
      senders: (state) => state.senders,
      count_senders: (state) => state.count_sender,
    }),
    ...mapState('shared', {
      addresses: (state) => state.addresses,
    }),
    displaySenders() {
      return cloneDeep(this.senders)
    },
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  mounted() {
    this.fetchAddresses()
    this.init()
  },
  methods: {
    ...mapActions('setting', [LIST_SENDER, CREATE_SENDER, UPDATE_SENDER]),
    ...mapActions('shared', [FETCH_ADDRESSES]),
    truncate,
    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      this.result = await this.listSender(this.filter)
      this.isFetching = false
    },

    closeModal() {
      this.init()
    },

    visibleModalAddSender() {
      this.isVisibleModalAddSender = true
      this.titleModal = 'Thêm người gửi'
      this.selectedSender = {}
    },
    showModalEditSender(sender_id) {
      this.isVisibleModalAddSender = true
      this.selectedSender = this.displaySenders.find((e) => e.id === sender_id)
      this.titleModal = 'Cập nhật thông tin người gửi'
    },
    async saveSender(sender) {
      let params = {
        id: sender.id,
        body: {
          ...sender,
        },
      }

      let result
      if (!params.id) {
        result = await this.createSender(params)
      } else {
        result = await this.updateSender(params)
      }

      if (!result || !result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
        return
      }
      if (!params.id) {
        this.$toast.open({
          type: 'success',
          message: 'Tạo người gửi thành công',
          duration: 3000,
        })
      } else {
        this.$toast.open({
          type: 'success',
          message: 'Cập nhật thành công',
          duration: 3000,
        })
      }
      await this.init()
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

<style>
.list-sender .btn {
  min-width: 150px;
  margin-left: 10px;
}
.edit-sender {
  cursor: pointer;
}
</style>
