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
              <!--              <div class="card__w">-->
              <!--                <div class="card__w-header">-->
              <!--                  Người gửi-->
              <!--                </div>-->
              <!--                <div class="card__w-content">-->
              <!--                  <div class="card__w-item">-->
              <!--                    <label class="card__w-label">-->
              <!--                      Họ và tên: <span>*</span>-->
              <!--                    </label>-->
              <!--                    <div class="card__w-input">-->
              <!--                      <multiselect-->
              <!--                        class="multiselect-custom dropdown-reason"-->
              <!--                        v-model="sender"-->
              <!--                        :options="senders"-->
              <!--                        placeholder="Chọn một "-->
              <!--                        @select="handleSelect"-->
              <!--                        :custom-label="customLabel"-->
              <!--                      ></multiselect>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->

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
                      <input
                        placeholder="Nhập số điện thoại"
                        type="phonenumber"
                        ref="email"
                        v-model="phone"
                        :input="phone"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Thành phố: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập thành phố"
                        type="text"
                        v-model="city"
                        :input="city"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Mã vùng<br />
                      (state): <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập mã vùng"
                        type="text"
                        v-model="state"
                        :input="state"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Mã bưu điện: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập mã bưu điện"
                        type="text"
                        v-model="postcode"
                        :input="postcode"
                        class="form-control"
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
                    v-model="note"
                    :input="note"
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
                        v-model="products"
                        :options="products"
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
                      <input
                        placeholder="Nhập  loại hàng"
                        type="text"
                        class="form-control"
                        v-model="items"
                        :input="items"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Tên hàng: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập  tên hàng"
                        type="text"
                        class="form-control"
                        v-model="name"
                        :input="name"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Tên hàng: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập Tên hàng"
                        type="text"
                        class="form-control"
                        v-model="items"
                        :input="items"
                      />
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Trọng lượng: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập trọng lượng"
                        type="text"
                        class="form-control"
                        v-model="weight"
                        :input="weight"
                      />
                      <div class="card__w-unit">gram</div>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label"> Dài: <span>*</span> </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập chiều dài "
                        type="text"
                        class="form-control"
                        v-model="length"
                        :input="length"
                      />
                      <div class="card__w-unit">cm</div>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label"> Rộng: <span>*</span> </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập chiều rộng "
                        type="text"
                        class="form-control"
                        v-model="width"
                        :input="width"
                      />
                      <div class="card__w-unit">cm</div>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label"> Cao: <span>*</span> </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập chiều cao "
                        type="text"
                        v-model="height"
                        :input="height"
                        class="form-control"
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
// import {GET_SENDER, LIST_SENDER} from "../../../setting/store";

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
      products: (state) => state.products,
    }),
    // ...mapGetters('setting',{
    //   senders:GET_SENDER
    // })
  },
  data() {
    return {
      order: null,
      sender: null,
      fullname: '',
      phone: '',
      city: '',
      state: '',
      postcode: '',
      note: '',
      code: '',
      items: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      name: '',
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.fullname = this.package_detail.package.recipient
      this.phone = this.package_detail.package.phone_number
      this.city = this.package_detail.package.city
      this.state = this.package_detail.package.state_code
      this.postcode = this.package_detail.package.zipcode
      this.note = this.package_detail.package.note || 'Không có yêu cầu'
      this.code = this.package_detail.package.code
      this.items = this.package_detail.package.items
      this.weight = this.package_detail.package.weight
      this.length = this.package_detail.package.length
      this.width = this.package_detail.package.width
      this.height = this.package_detail.package.height
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
