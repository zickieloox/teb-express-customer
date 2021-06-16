<template>
  <div class="create__package pages">
    <div class="page-header">
      <div class="page-header_title header-2">Tạo đơn lẻ</div>
    </div>
    <div class="page-content">
      <div class="card">
        <div class="card-body">
          <div class="row sm-gutters  flex-nowrap">
            <div class="col-lg-6 col-xl-6 item-gutters ">
              <div class="card__w">
                <div class="card__w-header">
                  Người gửi
                </div>
                <div class="card__w-content">
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Họ và tên: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <multiselect
                        class="multiselect-custom dropdown-reason"
                        v-model="sender"
                        :options="senders"
                        placeholder="Chọn một "
                        @select="handleSelect"
                        :custom-label="customLabel"
                      ></multiselect>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card__w">
                <div class="card__w-header">
                  Người nhận
                </div>
                <div class="card__w-content">
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Họ và tên: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="vd. Nguyen Van A"
                        type="fullname"
                        validate="on"
                        v-model="fullname"
                        :input="fullname"
                        :required="requiredUsername"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Điện thoại: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="Nhập số điện thoại"
                        type="phonenumber"
                        validate="on"
                        ref="email"
                        v-model="phone"
                        :input="phone"
                        :required="requiredPhone"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Thành phố: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="Nhập thành phố"
                        type="text"
                        validate="on"
                        v-model="city"
                        :input="city"
                        :required="requiredCity"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Mã vùng<br />
                      (state): <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="Nhập mã vùng"
                        type="text"
                        validate="on"
                        v-model="state"
                        :input="state"
                        :required="requiredState"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Mã bưu điện: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="Nhập mã bưu điện"
                        type="text"
                        validate="on"
                        v-model="postcode"
                        :input="postcode"
                        :required="requiredCity"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="card__w">
                <div class="card__w-header">
                  Yêu cầu
                </div>
                <div class="card__w-content">
                  <textarea
                    class="card__w-area"
                    placeholder="Nhập yêu cầu khi giao ..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-xl-6 item-gutters">
              <div class="card__w">
                <div class="card__w-header">
                  Thông tin hàng hóa
                </div>
                <div class="card__w-content">
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Danh sách đơn hàng: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <multiselect
                        class="multiselect-custom dropdown-reason"
                        v-model="order"
                        :options="orders"
                        placeholder="Chọn một "
                        @select="handleSelect"
                        :custom-label="customLabel"
                      ></multiselect>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Loại hàng: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="Nhập  loại hàng"
                        type="text"
                        validate="on"
                        v-model="city"
                        :input="city"
                        :required="requiredCity"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Tên hàng: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="Nhập Tên hàng"
                        type="text"
                        validate="on"
                        v-model="state"
                        :input="state"
                        :required="requiredState"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Trọng lượng: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="Nhập trọng lượng"
                        type="text"
                        validate="on"
                        v-model="postcode"
                        :input="postcode"
                        :required="requiredCity"
                      />
                      <div class="card__w-unit">gram</div>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label"> Dài: <span>*</span> </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="Nhập chiều dài "
                        type="text"
                        validate="on"
                        v-model="postcode"
                        :input="postcode"
                        :required="requiredCity"
                      />
                      <div class="card__w-unit">cm</div>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label"> Rộng: <span>*</span> </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="Nhập chiều rộng "
                        type="text"
                        validate="on"
                        v-model="postcode"
                        :input="postcode"
                        :required="requiredCity"
                      />
                      <div class="card__w-unit">cm</div>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label"> Cao: <span>*</span> </label>
                    <div class="card__w-input">
                      <p-input
                        placeholder="Nhập chiều cao "
                        type="text"
                        validate="on"
                        v-model="postcode"
                        :input="postcode"
                        :required="requiredCity"
                      />
                      <div class="card__w-unit">cm</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="no-gutter create__package-footer">
            <div class="create__package-price d-flex">
              <div class="price-title">
                <div class="price-title-item">Phí giao hàng:</div>
                <div class="price-title-item">Phí phát sinh:</div>
                <div class="price-title-item">Khuyến mãi:</div>
              </div>
              <div class="price-price">
                <div class="price-price-item">$32.80</div>
                <div class="price-price-item">$115.99</div>
                <div class="price-price-item">$87.00</div>
              </div>
            </div>
            <div class="create__package-divider">
              <div class="create__package-notch"></div>
            </div>
            <div class="create__package-total">
              <div class="total-title mb-10">
                Tổng cước:
                <span class="total-number">$299.69</span>
              </div>
              <div class="rule">
                <p-checkbox class="total-checkbox" v-model="accept">
                  <span class="rule-text"
                    >Tôi đã đọc và đồng ý với
                    <a class="rule-link">điều khoản quy định.</a>
                  </span>
                </p-checkbox>
              </div>
              <a href="#" class="btn btn-primary">Tạo mới</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer"> </div>
  </div>
</template>
<script>
export default {
  name: 'CreatePackage',
  data() {
    return {
      senders: [
        {
          key: 1,
          name: 'xxxx',
        },
        {
          key: 2,
          name: 'xxxxx',
        },
      ],
      orders: [
        {
          key: 1,
          name: 'xxxx',
        },
        {
          key: 2,
          name: 'xxxxx',
        },
      ],
      order: null,
      sender: null,
      requiredUsername: false,
      requiredPhone: false,
      requiredCity: false,
      requiredState: false,
      fullname: '',
      phone: '',
      city: '',
      state: '',
      postcode: '',
      accept: false,
    }
  },
  methods: {
    customLabel(item) {
      return item.name
    },
    handleSelect(value) {
      this.sender = value
    },
  },
}
</script>
