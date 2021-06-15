<template>
  <div class="package-detail pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header__title header-2">Chi tiet</div>
        <div class="page-header__subtitle">
          <div class="page-header__info">
            <div>
              <div>Mã vận đơn</div>
              <div>LNN012345</div>
            </div>
            <div>
              <div>Dịch vụ </div>
              <div>USPS</div>
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
            <div class="card-block">
              <div class="card-header">
                <div class="card-title">Người gửi</div>
              </div>
              <div class="card-content">
                <div class="row">
                  <div class="col-4">Họ và tên:</div>
                  <div class="col-8">Nguyễn Văn A</div>
                </div>
                <div class="row">
                  <div class="col-4">Điện thoại:</div>
                  <div class="col-8"> </div>
                </div>
                <div class="row">
                  <div class="col-4">Địa chỉ:</div>
                  <div class="col-8"> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'PackageDetail',
  data() {
    return {}
  },
  computed: {
    ...mapState('package', {
      package: (state) => state.package,
    }),
  },
}
</script>
