<template>
  <p-modal
    class="modal-reply-ticket"
    :active="visible"
    title="Reply"
    @close="handleClose"
  >
    <div class="content-page">
      <div class="page-content">
        <div class="menu_content ">
          <div class="page-content_drag card2">
            <div class="form-group">
              <label class="text-bold"
                >Nội dung<span class="text-danger">*</span></label
              >
              <span class="countText" :class="[countText(message)]"
                >{{ this.TicketNote }}/1000</span
              >
              <textarea
                class="form-control"
                v-model="message"
                v-validate="'required'"
                data-vv-as="Nội dung"
                name="message"
                key="message"
                :class="{
                  'error-color': errors.has('message'),
                  require: lengthContent,
                }"
                :required="true"
              ></textarea>
              <span class="err-span" v-if="errors.has('message')">{{
                errors.first('message')
              }}</span>
            </div>
            <div class="upload_file">
              <upload
                class="file-uploader"
                :action="uploadFileEndpoint"
                drag
                list-type="picture"
                :headers="uploadHeaders"
                @e-change="listenChange"
                :on-change="handleChangeFile"
                multiple
                :auto-upload="false"
                :max-file-size="100000000"
              >
                <div class="el-upload__text">
                  Thả tệp, hình ảnh hoặc <em>file</em> để tải lên
                </div>
              </upload>

              <div class="rule">
                Chúng tôi chỉ chấp nhận file dưới 5Mb và có các định dạng: CSV,
                PNG, JPG, JPEG
              </div>

              <div v-if="fileErrors.length > 0" class="design-error-lg">
                <div class="design-error-title">
                  <img
                    src="~@/assets/img/alert.svg"
                    alt=""
                    class="design-error-icon"
                  />
                  <span>This media couldn’t be added:</span>
                </div>
                <ul
                  class="design-error-list"
                  v-for="(item, i) in fileErrors"
                  :key="i"
                >
                  <li class="design-error-item"> {{ item }}</li>
                </ul>
              </div>
              <div v-if="files != null" class="mt-3">
                <div
                  class="el-before-upload__filename d-flex justify-content-start"
                  v-for="(item, i) in files"
                  :key="i"
                >
                  <div class="filename mr-3">{{ item.name }}</div>
                  <div :class="{ isUpload: isUploading }" class="remove-file">
                    <img
                      src="~@/assets/img/x-sm.svg"
                      alt=""
                      class="icon-remove"
                      @click.prevent="actionDeletefile(item)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template slot="footer">
      <div>
        <img
          style="margin-bottom: 2px"
          src="~@/assets/img/InfoCircle.svg"
          alt=""
        />
        <b>Lưu ý:</b> (<span>*</span>) <i>Là các trường bắt buộc nhập.</i>
      </div>
      <div class="d-flex">
        <div>
          <p-button @click="handleClose" type="default">
            Bỏ qua
          </p-button>
        </div>
        <div class="ml-7">
          <p-button type="primary" @click="handleUpdate" :loading="isUploading">
            Tạo khiếu nại
          </p-button>
        </div>
      </div>
    </template>
  </p-modal>
</template>

<script>
import mixinUpload from '@core/mixins/upload'
import { Upload } from '@kit'
import { mapActions } from 'vuex'
import { UPDATE_FILE_TICKET, PUSH_MESSAGE } from '@/packages/claim/store'

export default {
  name: 'ModalReply',
  mixins: [mixinUpload],
  components: { Upload },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    claim: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      allowedTypes: [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'text/csv',
        'text/plain',
        'text/x-csv',
        'application/csv',
        'application/x-csv',
        'text/comma-separated-values',
        'text/x-comma-separated-values',
        'text/tab-separated-values',
      ],
      allowedExtensions: /(\.jpg|\.jpeg|\.png|\.csv)$/i,
      files: [],
      fileErrors: [],
      message: '',
      validErrors: {},
      isUploading: false,
      TicketNote: 0,
      lengthContent: false,
    }
  },
  methods: {
    ...mapActions('claim', {
      ticketUpload: UPDATE_FILE_TICKET,
      reply: PUSH_MESSAGE,
    }),
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleAction() {
      this.$emit('action')
    },
    listenChange() {
      this.fileErrors = []
    },
    handleChangeFile(file) {
      if (!this.validateSizeFile(file)) {
        this.fileErrors.push(`"${file.name}" is less than 5Mb.`)
        this.fileErrors = [...new Set(this.fileErrors)]
        return
      }

      if (!this.validateTypeFile(file)) {
        this.fileErrors.push(
          `"${
            file.name
          }" is not a supported file type. File must be type *CSV, *PNG, *JPG, *JPEG.`
        )
        this.fileErrors = [...new Set(this.fileErrors)]
        return
      }

      this.handleUploadfile(file)
    },
    async handleUploadfile(file) {
      let body = { file: file.raw }

      this.isUploading = true
      const res = await this.ticketUpload(body)
      this.isUploading = false

      if (res.error) {
        this.fileErrors.push(res.message)
        return
      }

      this.files.push({
        url: res.urls,
        uid: file.uid,
        name: file.name,
      })
    },
    validateTypeFile(file) {
      if (this.allowedExtensions.exec(file.name)) {
        return true
      }

      if (this.allowedTypes.includes(file.raw.type)) {
        return true
      }

      return false
    },
    validateSizeFile(file) {
      if (file.size > 5000000) {
        return false
      }

      return true
    },
    actionDeletefile(file) {
      this.$dialog.confirm({
        title: `Remove file "${file.name}"`,
        message: 'Are you sure you want to remove this attach file?',
        onConfirm: () => {
          this.files = this.files.filter(({ uid }) => uid != file.uid)
        },
      })
    },
    async handleUpdate() {
      if (this.isUploading) return
      const validate = await this.$validator.validateAll()
      if (!validate) {
        return
      }
      if (this.lengthContent) return

      const urls = this.files.map(({ url }) => url)
      const form = {
        ticket_id: this.claim.id,
        content: this.message,
        urls: urls || [],
      }

      this.isUploading = true
      const res = await this.reply(form)
      this.isUploading = false

      if (!res.success) {
        this.$toast.open({ type: 'error', message: res.message })
        return
      }

      this.$toast.open({ type: 'success', message: 'Reply claim success' })
      this.files = []
      this.message = ''
      this.fileErrors = []
      this.$emit('success', res.reply)
      this.handleClose()
    },

    countText(val) {
      var len = val.length
      if (len > 1000) {
        this.TicketNote = len
        this.lengthContent = true
        return 'note_danger'
      } else {
        this.TicketNote = len
        this.lengthContent = false
        return 'note_success'
      }
    },
  },
}
</script>
