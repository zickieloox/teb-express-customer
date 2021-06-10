<template>
  <div class="setting setting-account pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header_back">
          <router-link :to="{ name: 'setting' }" class="text">
            <img
              src="@/assets/img/chevron-left.svg"
              alt=""
              class="page-header_back_icon"
            />
            <span>Setting</span>
          </router-link>
        </div>
        <div class="page-header_title header-2"> Thông tin tài khoản </div>
      </div>
      <div class="page-body">
        <div class="account">
          <div class="title">tài khoản</div>
          <div class="form row">
            <div class="col-6 left">
              <label class="font-weight-600 color-newtral-10"
                >Họ và tên: <span class="required">*</span></label
              >
              <p-input
                placeholder="Nhập họ tên"
                type="fullname"
                validate="on"
                v-model="user.full_name"
                :input="user.full_name"
                @input="onQueryChange"
                @status="checkUsername($event)"
                :required="requiredUsername"
              />
            </div>
            <div class="col-6 right">
              <label class="font-weight-600 color-newtral-10">Ngày sinh:</label>
              <div style="display: flex">
                <p-datepicker
                  class="date birthday p-input-group input-group"
                  :format="'dd/mm/yyyy'"
                  :label="label"
                  @update="selectDate"
                  :single-date-picker="true"
                >
                </p-datepicker>
                <p-button
                  class="clear ml-2"
                  type="default"
                  icon="close"
                  v-if="user.birthday"
                  @click="clearDate"
              /></div>
            </div>
          </div>
        </div>
        <div class="account">
          <div class="title">Thay đổi mật khẩu</div>
          <div class="form row">
            <div class="col-6 left">
              <label class="font-weight-600 color-newtral-10"
                >Mật khẩu hiện tại: <span class="required">*</span></label
              >
              <p-input
                placeholder="Nhập mật khẩu hiện tại"
                hiddenPass="on"
                type="password"
                validate="on"
                v-model="user.current_password"
                :input="user.current_password"
                @input="onQueryChange"
                :required="requiredPassword"
                @status="checkPassword($event)"
              />
            </div>
            <div class="col-6 right">
              <label class="font-weight-600 color-newtral-10"
                >Mật khẩu mới: <span class="required">*</span></label
              >
              <p-input
                placeholder="Nhập mật khẩu mới"
                hiddenPass="on"
                type="password"
                validate="on"
                v-model="user.new_password"
                :input="user.new_password"
                @input="onQueryChange"
                :required="requiredPassword"
                @status="checkPassword($event)"
              />
            </div>
          </div>
        </div>
        <div class="note">
          <img src="@/assets/img/note.svg" alt="" />
          <p
            ><b>Lưu ý: </b
            ><span class="text"
              >(<span class="required">*</span>) Là các trường bắt buộc
              nhập.</span
            ></p
          >
        </div>
        <div class="save">
          <a href="javascript:void(0)" class="btn btn-primary">
            <span>Lưu</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
import { date } from '@core/utils/datetime'

export default {
  data() {
    return {
      user: {
        full_name: '',
        current_password: '',
        new_password: '',
        birthday: '',
      },
      isLoading: false,
      label: 'dd/mm/yyyy',
      requiredPassword: false,
      requiredUsername: false,
    }
  },
  created() {},

  methods: {
    checkRequired() {
      let result = true
      if (this.user.full_name == '') {
        this.requiredUsername = true
        result = false
      } else {
        this.requiredUsername = false
      }

      if (this.user.current_password == '' || this.user.new_password == '') {
        this.requiredPassword = true
        result = false
      } else {
        this.requiredPassword = false
      }

      return result
    },
    checkUsername(e) {
      if (e) {
        return (this.correctUsername = true)
      }
      return (this.correctUsername = false)
    },
    checkPassword(e) {
      if (e) {
        return (this.correctPassword = true)
      }
      return (this.correctPassword = false)
    },
    selectDate(v) {
      this.user.birthday = date(v.startDate, 'yyyy-MM-dd')
      if (this.user.birthday == '') {
        return (this.label = 'dd/mm/yyyy')
      }
      this.label = this.user.birthday
    },
    onQueryChange() {
      this.checkRequired()
    },
    clearDate() {
      this.user.birthday = ''
      this.label = 'dd/mm/yyyy'
    },
  },
}
</script>
