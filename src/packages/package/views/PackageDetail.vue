<template>
  <div class="package-detail pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header__title header-2">Chi tiet</div>
        <div class="page-header__subtitle">
          <div class="page-header__info">
            <div>
              <div>Mã vận đơn</div>
              <div>{{ package_detail.package.code }}</div>
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
              <div>Đang vận chuyển</div>
            </div>
          </div>
          <div class="page-header__action">
            <a href="#" class="btn btn-danger">
              <span>Hủy đơn</span>
            </a>
            <a href="#" class="btn btn-default ml-7">
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
                    <div class="card-title">Người gửi</div>
                  </div>
                  <div class="card-content">
                    <div class="row">
                      <div class="col-4 mb-8">Họ và tên:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.sender_full_name')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Điện thoại:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate(
                            'package_detail.package.sender_phone_number'
                          )
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4 mb-8">Địa chỉ:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.sender_address')
                        }}</div></div
                      >
                    </div>
                  </div>
                </div>
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
                      <div class="col-4">Mã bưu điện:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.zipcode')
                        }}</div></div
                      >
                    </div>
                  </div>
                </div>
                <div class="card-block">
                  <div class="card-header">
                    <div class="card-title">Yêu cầu khi giao</div>
                  </div>
                  <div class="card-content">
                    {{
                      $evaluate('package_detail.package.note') ||
                        'Không có yêu cầu'
                    }}
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
                          <div class="col-4 mb-8">Tên hàng:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.phone_number')
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
                              $evaluate('package_detail.package.code')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-8 mb-8">Phí phát sinh:</div>
                          <div class="col-4"
                            ><div>{{
                              $evaluate('package_detail.package.phone_number')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-8 mb-8">Khuyến mãi:</div>
                          <div class="col-4"
                            ><div>{{
                              $evaluate('package_detail.package.weight')
                            }}</div></div
                          >
                        </div>
                      </div>
                      <div class="card-footer">
                        <div class="card-title">Tổng cước:</div>
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
                      <div class="card-content"> </div>
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
</template>

<style>
.deliver-log ul:before {
  position: absolute;
  content: ' ';
  background: #d4d9df;
  display: inline-block;
  left: 25.8px;
  width: 4px;
  height: 100%;
  z-index: 400;
  border-radius: 20px;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  margin-top: 7px;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_PACKAGE_DETAIL } from '../store/index'
import mixinChaining from '@/packages/shared/mixins/chaining'

export default {
  name: 'PackageDetail',
  mixins: [mixinChaining],
  data() {
    return {
      isFetching: true,
      packageID: 0,
      displayDeliverDetail: false,
      timelinePagination: {
        numberPage: 0,
        itemsPerPage: 5,
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
  },
  created() {
    this.packageID = parseInt(this.$route.params.id, 10)
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('package', [FETCH_PACKAGE_DETAIL]),
    async init() {
      this.isFetching = true
      await this.fetchPackage(this.packageID)
      this.isFetching = false
    },
    changeDisplayDeliverDetail() {
      this.displayDeliverDetail = !this.displayDeliverDetail
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
  },

  watch: {
    package_detail: {
      handler: function(val) {
        if (val.deliver_logs && val.deliver_logs.length > 0) {
          this.timelinePagination.numberPage = Math.ceil(
            val.deliver_logs.length / this.timelinePagination.itemsPerPage
          )
        }
      },
      deep: true,
    },
  },
}
</script>
