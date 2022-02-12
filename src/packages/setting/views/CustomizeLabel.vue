<template>
  <div class="customize-label pages">
    <div class="container">
      <div class="page-content">
        <div class="row">
          <div class="card" id="setting_label">
            <div class="row">
              <div class="col-12">
                <div class="label">
                  <span class="pull-left"> Ship from:</span>
                  <i class="pull-right">{{ shipFrom.length }}</i>
                  <div class="clear-fix"></div>
                </div>
                <p-input
                  type="text"
                  @mouseleave="generatePreviewLabelHandler"
                  v-model="shipFrom"
                  :input="shipFrom"
                  placeholder="Nhập ship from ..."
                />
              </div>
              <div class="col-12 mt-24">
                <div class="label">
                  <span>Logo</span>
                </div>
                <FileUpload :logo-url="logoUrl" @preview="previewLogoLabel" />
                <div class="notice_upload">
                  <p>
                    <img src="~@/assets/img/notice_2.svg" />
                    Chấp nhận các tệp có định dạng:<br />
                    * PNG, * JPG, * JPEG và kích thước dưới 1Mb.
                  </p>
                </div>
                <hr />
              </div>
              <div class="col-12 mt-6">
                <div class="save">
                  <a
                    @click="saveSettingLabelHandler"
                    href="javascript:void(0)"
                    class="btn btn-lb-secondary"
                    :class="{ active: isChange }"
                  >
                    <span>Lưu lại</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="card" id="preview_label">
            <vcl-table class="mt-20" v-if="isLoadingPreview"></vcl-table>
            <img
              src=""
              id="lbn_preview"
              :class="{ hidden: isLoadingPreview || !this.logoUrl }"
              alt="Preview label"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FileUpload from '../components/FileUpload'
import {
  FETCH_SETTING_LABEL,
  GENERATE_PREVIEW_LABEL,
  SAVE_SETTING_LABEL,
} from '../store'
import api from '../api'
export default {
  name: 'customize-label',
  components: {
    FileUpload,
  },
  data() {
    return {
      isFetching: false,
      isChange: false,
      logoUrl: '',
      previewUrl: '',
      shipFrom: '',
      isLoadingPreview: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('setting', [
      GENERATE_PREVIEW_LABEL,
      FETCH_SETTING_LABEL,
      SAVE_SETTING_LABEL,
    ]),
    async init() {
      this.isFetching = true
      const result = await this.fetchSettingLabel()
      this.isFetching = false
      if (!result.success) {
        this.$toast.open({ message: result.message, type: 'error' })
        return
      }
      if (result.setting) {
        let setting = JSON.parse(result.setting.value)
        this.logoUrl = setting.logo_url
        this.previewUrl = setting.preview_url
        this.shipFrom = setting.ship_from
        await this.fetchPreviewLabel()
      }
    },
    async generatePreviewLabelHandler() {
      if (this.shipFrom === '' || this.logoUrl === '') {
        this.isChange = false
        return
      }
      this.isFetching = true
      const body = {
        ship_from: this.shipFrom,
        url: this.logoUrl,
      }
      const result = await this[GENERATE_PREVIEW_LABEL](body)
      this.isFetching = false
      if (!result.success) {
        this.$toast.open({ message: result.message, type: 'error' })
        return
      }
      this.previewUrl = result.url
      this.isChange = true
      await this.fetchPreviewLabel()
    },
    async fetchPreviewLabel() {
      this.isLoadingPreview = true
      const res = await api.fetchLabelFile({
        url: this.previewUrl,
        type: 'labels',
      })
      this.isLoadingPreview = false
      if (!res && res.error) {
        this.$toast.open({
          type: 'error',
          message: res.errorMessage,
          duration: 3000,
        })
        return
      }
      let URL = window.URL || window.webkitURL
      document.querySelector('#lbn_preview').src = URL.createObjectURL(res)
    },
    async saveSettingLabelHandler() {
      if (this.shipFrom === '' || this.logoUrl === '') {
        return
      }
      this.isFetching = true
      const body = {
        logo_url: this.logoUrl,
        preview_url: this.previewUrl,
        ship_from: this.shipFrom,
      }
      const result = await this[SAVE_SETTING_LABEL](body)
      this.isFetching = false
      if (!result.success) {
        this.$toast.open({
          message: result.message,
          type: 'error',
        })
        return
      }
      this.$toast.open({
        message: 'Lưu setting label thành công',
        type: 'success',
      })
    },
    previewLogoLabel(url) {
      this.setLogoUrl(url)
      this.generatePreviewLabelHandler()
    },
    setLogoUrl(url) {
      this.logoUrl = url
    },
  },
}
</script>
<style>
#customize-label .btn-lb-secondary {
  color: #a9e0de;
  background-color: #f9fdfe;
}
.label {
  margin-bottom: 6px;
}
.label span {
  font-weight: bold;
}
.label i {
  font-size: 12px;
  color: #898a8a;
}
#setting_label {
  margin-top: 30px;
  margin-right: 24px;
  width: 592px;
  padding: 24px 24px 16px;
}
#setting_label .p-input {
  border-radius: 4px !important;
}
#preview_label {
  margin-top: 30px;
  width: 416px;
  padding: 24px 24px 16px;
}
.mt-6 {
  margin-top: 6px;
}
.notice_upload {
  color: #898a8a;
  font-size: 12px;
  padding-bottom: 82px;
}
.save .active {
  background-color: #00978c !important;
  color: #fff !important;
}
</style>
