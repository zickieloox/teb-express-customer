<template>
  <div class="modal__edit-order">
    <p-modal :active="visible" @close="handleClose" :title="`Sửa đơn`">
      <template>
        <div class="modal__edit-order-header">
          <img src="@/assets/img/InfoCircle.svg" alt="" />
          <b>Lưu ý:</b> <i>(<span>*</span>) Là các trường bắt buộc nhập.</i>
        </div>
        <div class="modal__edit-order-content">
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
                      <input
                        placeholder="vd. Nguyen Van A"
                        type="fullname"
                        validate="on"
                        v-model="fullname"
                        :input="fullname"
                        class="form-control"
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
                <div class="card__w-content"> </div>
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
              <div class="card__w">
                <div class="card__w-header">
                  Dịch vụ gửi
                </div>
                <div class="card__w-content">
                  <div class="card__w-item">
                    <div class="card__w-input">
                      <multiselect
                        class="multiselect-custom dropdown-reason"
                        v-model="order"
                        :options="orders"
                        placeholder="Chọn dịch vụ gửi "
                        @select="handleSelect"
                        :custom-label="customLabel"
                      ></multiselect>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__edit-order-footer">
          <div class="total-title">
            Tổng cước: <span class="total-number">$299.69</span>
          </div>
          <div class="divider">
            <div class="notch"></div>
            <div class="notch-bt"></div>
          </div>
          <div class="total-action">
            <a href="#" class="btn btn-default">Hủy bỏ</a>
            <a href="#" class="btn  btn-primary ">Cập nhật</a>
          </div>
        </div>
      </template>
    </p-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'ModalEditOrder',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    info_user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState('package', {
      package_detail: (state) => state.package_detail,
    }),
  },
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
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.fullname = this.package_detail.package.recipient
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    customLabel(item) {
      return item.name
    },
    handleSelect(value) {
      this.sender = value
    },
  },
  watch: {
    visible: function() {
      this.init()
    },
  },
}
</script>
