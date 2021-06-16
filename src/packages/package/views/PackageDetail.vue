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
              <div>26/05/2021 - 19:34:30</div>
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
                      <div class="col-4">Họ và tên:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.sender_full_name')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4">Điện thoại:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate(
                            'package_detail.package.sender_phone_number'
                          )
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4">Địa chỉ:</div>
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
                      <div class="col-4">Họ và tên:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.recipient')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4">Điện thoại:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.phone_number')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4">Địa chỉ:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.address_1')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4">Thành phố:</div>
                      <div class="col-8"
                        ><div>{{
                          $evaluate('package_detail.package.city')
                        }}</div></div
                      >
                    </div>
                    <div class="row">
                      <div class="col-4">Mã vùng:</div>
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
                          <div class="col-4">Mã đơn hàng:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.code')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4">Tên hàng:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.phone_number')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4">Trọng lượng:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.weight')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4">Dài:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.length')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4">Rộng:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.width')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4">Cao:</div>
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
                          <div class="col-4">Phí giao hàng:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.code')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4">Phí phát sinh:</div>
                          <div class="col-8"
                            ><div>{{
                              $evaluate('package_detail.package.phone_number')
                            }}</div></div
                          >
                        </div>
                        <div class="row">
                          <div class="col-4">Khuyến mãi:</div>
                          <div class="col-8"
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
                          <div class="timeline-item">
                            <div class="timeline-item__left">
                              <div>Apr 28, 2021</div>
                              <div>03:05 pm</div>
                            </div>
                            <div class="timeline-item__right">
                              <div>Hàng đến kho</div>
                            </div>
                          </div>
                          <div class="timeline-item">
                            <div class="timeline-item__left">
                              <div>Apr 28, 2021</div>
                              <div>03:05 pm</div>
                            </div>
                            <div class="timeline-item__right">
                              <div>Nhận hàng</div>
                            </div>
                          </div>
                          <div class="timeline-item">
                            <div class="timeline-item__left">
                              <div>Apr 28, 2021</div>
                              <div>03:05 pm</div>
                            </div>
                            <div class="timeline-item__right">
                              <div>Tiếp nhận đơn hàng</div>
                            </div>
                          </div>
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
    }
  },
  computed: {
    ...mapState('package', {
      package_detail: (state) => state.package_detail,
    }),
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
  },
}
</script>
