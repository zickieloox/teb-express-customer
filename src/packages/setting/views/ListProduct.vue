<template>
  <div class="pages list__product">
    <div class="page-header d-flex">
      <div class="col-6">
        <p-input
          placeholder="Tìm kiếm theo tên sản phẩm hoặc sku"
          prefixIcon="search"
          class="mb-2"
          type="search"
          :value="filter.search"
          @keyup.enter="handleSearch"
        >
        </p-input>
      </div>
      <div class="col-6 btn-add">
        <p-button type="primary" @click="handleModal(null)">
          <inline-svg
            :src="require('../../../assets/img/Plus 16px.svg')"
          ></inline-svg>
          Thêm sản phẩm
        </p-button>
      </div>
    </div>
    <div class="page-content">
      <div class="card">
        <div class="card-body">
          <vcl-table class="md-20" v-if="isFetching"></vcl-table>
          <template v-else-if="listProducts.length > 0">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr class="list__product-title">
                    <th>TÊN SẢN PHẨM</th>
                    <th>SKU</th>
                    <th>LOẠI SẢN PHẨM</th>
                    <th>CHẤT LIỆU SẢN PHẨM</th>
                    <th class="text-center">TRỌNG LƯỢNG (GRAM)</th>
                    <th class="text-center">KÍCH THƯỚC (CM)</th>
                    <th>QUỐC GIA</th>
                    <th width="100"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(item, i) in listProducts" :key="i">
                    <td>{{ item.name }}</td>
                    <td>
                      {{ item.sku }}
                    </td>
                    <td>{{ item.detail }}</td>
                    <td>{{ item.material }}</td>
                    <td class="text-center">{{ item.weight }}</td>
                    <td class="text-center">{{ size(item) }}</td>
                    <td class="text-center">{{ item.country }}</td>
                    <td>
                      <a href="javascript:void(0)" @click="handleModal(item)">
                        <inline-svg
                          :src="require('../../../assets/img/edit_product.svg')"
                        ></inline-svg>
                      </a>
                      <a
                        class="ml-18"
                        href="javascript:void(0)"
                        @click="confirmDelete(item)"
                      >
                        <inline-svg
                          :src="
                            require('../../../assets/img/delete_product.svg')
                          "
                        ></inline-svg>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <EmptySearchResult v-else></EmptySearchResult>
        </div>
      </div>
      <div
        class="d-flex justify-content-between align-items-center mb-80 paginate"
        v-if="count > 0"
      >
        <p-pagination
          :total="count"
          :perPage.sync="filter.limit"
          :current.sync="filter.page"
          size="sm"
        ></p-pagination>
      </div>
    </div>
    <modal-product
      :visible.sync="visibleModal"
      :title="title"
      :product="product"
      @saveProduct="saveProduct"
    >
    </modal-product>
    <modal-confirm
      :visible.sync="visibleModalDelete"
      v-if="visibleModalDelete"
      :actionConfirm="'Xóa'"
      :description="description"
      :title="'Xóa sản phẩm'"
      @action="handleDelete(item)"
    >
    </modal-confirm>
  </div>
</template>
<script>
import EmptySearchResult from '../../../components/shared/EmptySearchResult'
import { truncate } from '@core/utils/string'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { mapActions, mapState } from 'vuex'
import {
  LIST_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../store/index'
import ModalProduct from '../components/ModalProduct'
import ModalConfirm from '@components/shared/modal/ModalConfirm'

export default {
  name: 'ListProduct',
  mixins: [mixinRoute, mixinTable],
  components: {
    EmptySearchResult,
    ModalProduct,
    ModalConfirm,
  },
  data() {
    return {
      filter: {
        limit: 25,
        search: '',
        status: '',
      },
      visibleModal: false,
      visibleModalDelete: false,
      isFetching: false,
      product: {},
      title: '',
      description: '',
    }
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  mounted() {
    this.init()
  },
  computed: {
    ...mapState('setting', {
      count: (state) => state.count_product,
      listProducts: (state) => state.products,
    }),
  },
  methods: {
    ...mapActions('setting', [
      LIST_PRODUCT,
      CREATE_PRODUCT,
      UPDATE_PRODUCT,
      DELETE_PRODUCT,
    ]),
    truncate,
    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      let result = await this.listProduct(this.filter)
      if (!result.success) {
        this.$toast.open({ type: 'danger', message: result.message })
        return
      }
      this.isFetching = false
    },

    handleModal(item) {
      if (item) {
        this.title = 'Cập nhật sản phẩm'
        this.product = item
      } else {
        this.title = 'Thêm mới sản phẩm'
        this.product = {}
      }
      this.visibleModal = true
    },

    confirmDelete(item) {
      this.description = `Bạn có chắc chắn muốn xóa <b>${item.name}</b> ?`
      this.visibleModalDelete = true
      this.item = item
    },

    async handleDelete(item) {
      let result = await this.deleteProduct(item)
      this.visibleModalDelete = false

      if (!result || !result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 3000,
        })
        return
      }

      this.$toast.open({
        type: 'success',
        message: 'Cập nhật thành công',
        duration: 3000,
      })

      await this.init()
    },

    size(item) {
      return `${item.length}x${item.width}x${item.height}`
    },

    async saveProduct(product) {
      let params = {
        ...product,
      }

      let result
      if (!params.id) {
        result = await this.createProduct(params)
      } else {
        result = await this.updateProduct(params)
      }

      if (!result || !result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 3000,
        })
        return
      }
      this.visibleModal = false

      this.$toast.open({
        type: 'success',
        message: !params.id ? 'Tạo thành công' : 'Cập nhật thành công',
        duration: 3000,
      })
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
