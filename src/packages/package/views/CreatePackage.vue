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
                        v-model="order"
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
import { mapState, mapActions, mapGetters } from 'vuex'
import { FETCH_LIST_PRODUCTS } from '../store/index'
import { GET_SENDER, LIST_SENDER } from '../../setting/store'
export default {
  name: 'CreatePackage',
  data() {
    return {
      order: null,
      sender: null,
      fullname: '',
      phone: '',
      city: '',
      state: '',
      postcode: '',
      accept: false,
      countrycode: '',
      detail: '',
      weight: '',
      length: '',
      width: '',
      height: '',
    }
  },
  computed: {
    ...mapState('package', {
      products: (state) => state.products,
    }),
    ...mapGetters('setting', {
      senders: GET_SENDER,
    }),
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('package', [FETCH_LIST_PRODUCTS]),
    ...mapActions('setting', [LIST_SENDER]),
    async init() {
      await this.listSender({})
      await this[FETCH_LIST_PRODUCTS]()
    },
    customLabel(item) {
      return item.name
    },
    handleSelect(value) {
      this.sender = value
    },
  },
}
</script>
