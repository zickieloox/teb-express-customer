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
                        validate="on"
                        v-model="fullname"
                        :input="fullname"
                        class="form-control"
                        v-validate="'required|fullName'"
                        name="name"
                        data-vv-as="Tên"
                        :class="{ 'error-color': errors.has('name') }"
                      />
                      <span class="err-span" v-if="errors.has('name')">{{
                        errors.first('name')
                      }}</span>
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
                        v-validate="'required|max:20|phoneAddress'"
                        name="phone"
                        data-vv-as="Số điện thoại"
                        :class="{ 'error-color': errors.has('phone') }"
                      />
                      <span class="err-span" v-if="errors.has('phone')">{{
                        errors.first('phone')
                      }}</span>
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
                        v-validate="'required|city'"
                        name="city"
                        data-vv-as="Thành phố"
                        :class="{ 'error-color': errors.has('city') }"
                      />
                      <span class="err-span" v-if="errors.has('city')">{{
                        errors.first('city')
                      }}</span>
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
                        class="form-control"
                        v-model="state"
                        :input="state"
                        v-validate="'required|state'"
                        name="state"
                        data-vv-as="Mã vùng"
                        :class="{ 'error-color': errors.has('state') }"
                      />
                      <span class="err-span" v-if="errors.has('state')">{{
                        errors.first('state')
                      }}</span>
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
                        v-validate="'required|postcode'"
                        name="postcode"
                        data-vv-as="Mã bưu điện"
                        :class="{ 'error-color': errors.has('postcode') }"
                      />
                      <span class="err-span" v-if="errors.has('postcode')">{{
                        errors.first('postcode')
                      }}</span>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Mã quốc gia: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập mã quốc gia"
                        type="text"
                        v-model="countrycode"
                        :input="countrycode"
                        class="form-control"
                        v-validate="'required|countrycode'"
                        name="countrycode"
                        data-vv-as="Mã quốc gia"
                        :class="{ 'error-color': errors.has('countrycode') }"
                      />
                      <span class="err-span" v-if="errors.has('countrycode')">{{
                        errors.first('countrycode')
                      }}</span>
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
                    v-validate="'note'"
                    name="note"
                    data-vv-as="Ghi chú"
                    :class="{ 'error-color': errors.has('note') }"
                  ></textarea>
                  <span class="err-span" v-if="errors.has('note')">{{
                    errors.first('note')
                  }}</span>
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
                        v-model="item"
                        :options="products"
                        placeholder="Chọn một "
                        @select="handleSelect"
                        :custom-label="customLabel"
                      ></multiselect>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label">
                      Chi tiết : <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập chi tiết hàng hóa"
                        type="text"
                        v-model="detail"
                        :input="detail"
                        class="form-control"
                        v-validate="'required|detail'"
                        name="detail"
                        data-vv-as="Loại hàng"
                        :class="{ 'error-color': errors.has('detail') }"
                      />
                      <span class="err-span" v-if="errors.has('detail')">{{
                        errors.first('detail')
                      }}</span>
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
                        v-model="weight"
                        :input="weight"
                        class="form-control"
                        v-validate="'required|weight'"
                        name="weight"
                        data-vv-as="Trọng lượng"
                        :class="{ 'error-color': errors.has('weight') }"
                      />
                      <span class="err-span" v-if="errors.has('weight')">{{
                        errors.first('weight')
                      }}</span>
                      <div class="card__w-unit">gram</div>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label"> Dài: <span>*</span> </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập chiều dài "
                        type="text"
                        v-model="length"
                        :input="length"
                        class="form-control"
                        v-validate="'required|length'"
                        name="length"
                        data-vv-as="Chiều dài"
                        :class="{ 'error-color': errors.has('length') }"
                      />
                      <span class="err-span" v-if="errors.has('length')">{{
                        errors.first('length')
                      }}</span>
                      <div class="card__w-unit">cm</div>
                    </div>
                  </div>
                  <div class="card__w-item">
                    <label class="card__w-label"> Rộng: <span>*</span> </label>
                    <div class="card__w-input">
                      <input
                        placeholder="Nhập chiều rộng "
                        type="text"
                        v-model="width"
                        :input="width"
                        class="form-control"
                        v-validate="'required|width'"
                        name="width"
                        data-vv-as="Chiều rộng"
                        :class="{ 'error-color': errors.has('width') }"
                      />
                      <span class="err-span" v-if="errors.has('width')">{{
                        errors.first('width')
                      }}</span>
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
                        v-validate="'required|height'"
                        name="unit"
                        data-vv-as="Chiều cao"
                        :class="{ 'error-color': errors.has('height') }"
                      />
                      <span class="err-span" v-if="errors.has('height')">{{
                        errors.first('height')
                      }}</span>
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
                    <label class="card__w-label">
                      Dịch vụ gửi: <span>*</span>
                    </label>
                    <div class="card__w-input">
                      <multiselect
                        class="multiselect-custom dropdown-reason"
                        v-model="service"
                        :options="services"
                        placeholder="Chọn một "
                        :allow-empty="false"
                        @select="handleSelectService"
                        :custom-label="customLabel"
                      ></multiselect>
                      <span class="err-span" v-if="errors.has('height')">{{
                        errors.first('height')
                      }}</span>
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
            <a href="#" class="btn  btn-primary  " @click="handleUpdate"
              >Cập nhật</a
            >
          </div>
        </div>
      </template>
    </p-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { FETCH_LIST_PRODUCTS, UPDATE_PACKAGE } from '../../store'
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
      services: (state) => state.service,
    }),
    // ...mapGetters('setting',{
    //   senders:GET_SENDER
    // })
  },
  data() {
    return {
      item: null,
      sender: null,
      service: null,
      fullname: '',
      phone: '',
      city: '',
      state: '',
      postcode: '',
      note: '',
      code: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      countrycode: '',
      detail: '',
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('package', [FETCH_LIST_PRODUCTS, UPDATE_PACKAGE]),
    async init() {
      await this[FETCH_LIST_PRODUCTS]()
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
      this.countrycode = this.package_detail.package.country_code
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
    handleSelectService(value) {
      this.service = value
    },
    handleUpdate() {
      const { id } = this.$route.params
      const params = {
        id: id,
        recipient: this.fullname,
        phone_number: this.phone,
        address_1: '',
        city: this.city,
        state_code: this.state,
        zipcode: this.postcode,
        country_code: this.countrycode,
        items: this.item,
        detail: this.detail,
        weight: this.weight,
        width: this.width,
        length: this.length,
        height: this.height,
        service: this.service.id,
      }
      console.log(params)
    },
  },
  watch: {
    visible: function() {
      this.init()
    },
  },
}
</script>
