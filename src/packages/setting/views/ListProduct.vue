<!--<template>-->
<!--  <div class="pages list__product">-->
<!--    <div class="page-header">-->
<!--      <div class="page-header_title header-2">Danh sách hàng hóa</div>-->
<!--    </div>-->
<!--    <div class="page-content">-->
<!--      <div class="card">-->
<!--        <div class="card-body">-->
<!--          <div class="d-flex list__product-search">-->
<!--            <p-input-->
<!--              placeholder="Tìm kiếm theo mã hàng hóa hoặc tên hàng hóa"-->
<!--              prefixIcon="search"-->
<!--              class="mb-2"-->
<!--              type="search"-->
<!--              :value="filter.search"-->
<!--              @keyup.enter="handleSearch"-->
<!--            >-->
<!--            </p-input>-->
<!--            <a href="#" class="btn btn-primary ml-10" @click="handleModal">-->
<!--              <span>Thêm mới</span>-->
<!--            </a>-->
<!--          </div>-->
<!--          <div class="list__product-list">-->
<!--            <vcl-table class=" md-20" v-if="isFetching"></vcl-table>-->
<!--            <template v-else-if="listproduct.length > 0">-->
<!--              <div class="table-responsive">-->
<!--                <table class="table table-hover">-->
<!--                  <thead>-->
<!--                  <tr class="list__product-title">-->
<!--                    <th>Mã</th>-->
<!--                    <th>Tên hàng</th>-->
<!--                    <th>Trọng lượng (g)</th>-->
<!--                    <th>Dài x Rộng x Cao (cm)</th>-->
<!--                    <th></th>-->
<!--                  </tr>-->
<!--                  </thead>-->

<!--                  <tbody>-->
<!--                  <tr v-for="(item, i) in listproduct" :key="i">-->
<!--                    <td>-->
<!--                      <router-link-->
<!--                        class="text-no-underline"-->
<!--                        :to="{-->
<!--                            name: 'claim-detail',-->
<!--                            params: { id: item.id },-->
<!--                          }"-->
<!--                      >-->
<!--                        {{ item.code }}-->
<!--                      </router-link>-->
<!--                    </td>-->
<!--                    <td>{{ item.name }}</td>-->
<!--                    <td width="300">-->
<!--                      <p-tooltip-->
<!--                        :label="item.title"-->
<!--                        size="large"-->
<!--                        position="top"-->
<!--                        type="dark"-->
<!--                        :active="item.title.length > 15"-->
<!--                      >-->
<!--                        {{ truncate(item.title, 15) }}-->
<!--                      </p-tooltip>-->
<!--                    </td>-->
<!--                    <td>{{ item.created_at | datetime('dd/MM/yyyy') }}</td>-->
<!--                    <td>{{ item.updated_at | datetime('dd/MM/yyyy') }}</td>-->
<!--                    <td>{{ converStatus(item.status) }}</td>-->
<!--                  </tr>-->
<!--                  </tbody>-->
<!--                </table>-->
<!--              </div>-->
<!--            </template>-->
<!--            <EmptySearchResult v-else></EmptySearchResult>-->
<!--          </div>-->
<!--          <div-->
<!--            class="d-flex justify-content-between align-items-center mb-16"-->
<!--            v-if="count > 0"-->
<!--          >-->
<!--            <p-pagination-->
<!--              :total="count"-->
<!--              :perPage.sync="filter.limit"-->
<!--              :current.sync="filter.page"-->
<!--              size="sm"-->
<!--            ></p-pagination>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--&lt;!&ndash;    <modal-add-claim&ndash;&gt;-->
<!--&lt;!&ndash;      :visible.sync="visibleModal"&ndash;&gt;-->
<!--&lt;!&ndash;      :title="`Khiếu nại`"&ndash;&gt;-->
<!--&lt;!&ndash;      @create="init"&ndash;&gt;-->
<!--&lt;!&ndash;    >&ndash;&gt;-->
<!--&lt;!&ndash;    </modal-add-claim>&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import EmptySearchResult from '../../../components/shared/EmptySearchResult'-->
<!--import { CLAIM_STATUS } from '../constants'-->
<!--import { truncate } from '@core/utils/string'-->
<!--import mixinRoute from '@core/mixins/route'-->
<!--import mixinTable from '@core/mixins/table'-->
<!--import { mapActions, mapState } from 'vuex'-->

<!--export default {-->
<!--  name: 'ListProduct',-->
<!--  mixins: [mixinRoute, mixinTable],-->
<!--  components: {-->
<!--    EmptySearchResult,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      filter: {-->
<!--        limit: 20,-->
<!--        search: '',-->
<!--        status: '',-->
<!--      },-->
<!--      visibleModal: false,-->
<!--      isFetching: false,-->
<!--      listproduct:[{-->
<!--        code:'xnxx',-->
<!--        name:'2D Casual Zipper Hoodie',-->
<!--        weight:'1230',-->
<!--        info:'12x9x6',-->
<!--      }]-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.filter = this.getRouteQuery()-->
<!--  },-->
<!--  mounted() {-->
<!--    this.init()-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapState('claim', {-->
<!--      count: (state) => state.count,-->
<!--      listclaim: (state) => state.claims,-->
<!--      totalCount: (state) => state.totalCount,-->
<!--    }),-->
<!--  },-->
<!--  methods: {-->
<!--    ...mapActions('claim', [FETCH_CLAIMS]),-->
<!--    truncate,-->
<!--    async init() {-->
<!--      this.isFetching = true-->
<!--      this.handleUpdateRouteQuery()-->
<!--      let result = await this[FETCH_CLAIMS](this.filter)-->
<!--      if (result.error) {-->
<!--        this.$toast.open({ type: 'danger', message: result.message })-->
<!--        return-->
<!--      }-->
<!--      this.isFetching = false-->
<!--    },-->
<!--    handleModal() {-->
<!--      this.visibleModal = true-->
<!--    },-->
<!--    handleSearch(e) {-->
<!--      // Default result after search in page 1-->
<!--      this.filter.page = 1-->
<!--      this.$set(this.filter, 'search', e.target.value.trim())-->
<!--    },-->
<!--    converStatus(status) {-->
<!--      switch (status) {-->
<!--        case 1:-->
<!--          return 'Đang xử lý'-->
<!--        case 2:-->
<!--          return 'Đã xử lý'-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--  watch: {-->
<!--    filter: {-->
<!--      handler: function() {-->
<!--        this.init()-->
<!--      },-->
<!--      deep: true,-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->
