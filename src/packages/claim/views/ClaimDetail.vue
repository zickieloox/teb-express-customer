<template>
  <div class="claim-detail-page pages">
    <div class="claim-content-page">
      <div class="page-header">
        <div class="page-header_back">
          <router-link :to="{ name: 'claims' }" class="text">
            <img
              src="@/assets/img/Arrow - Left Square 24px.png"
              class="page-header_back_icon"
            />

            Đơn hàng khiếu nại
          </router-link>
        </div>
        <div class="page-header-group mb-12">
          <div class="page-header_title header-2">
            <p-tooltip
              :label="claim.title"
              size="large"
              position="bottom"
              type="dark"
              v-if="claim.title"
              :active="claim.title.length > 43"
            >
              {{ truncate(claim.title, 43) }}
            </p-tooltip>
          </div>
        </div>
        <div class="note-content">
          <span v-if="claim.package">
            LionBay tracking:
            <router-link
              class="text-no-underline"
              :to="{
                name: 'package-detail',
                params: {
                  id: claim.package.id,
                },
              }"
            >
              {{
                claim.package.package_code
                  ? claim.package.package_code.code
                  : ''
              }}
            </router-link>
          </span>
          <span>
            Ngày tạo: {{ claim.created_at | datetime('dd/MM/yyyy') }} -
            {{ claim.created_at | datetime('HH:mm') }}
          </span>
          <span> Lý do: {{ formatReason(claim.category) }} </span>
          <span> Trạng thái: {{ formatStatus(claim.status) }} </span>
        </div>
      </div>
      <div class="page-content">
        <div class="menu_content">
          <div class="reply mb-24" v-if="claim.status != claimStatusProcessed">
            <textarea
              class="form-control mb-16"
              v-model="message"
              v-validate="'required'"
              data-vv-as="Nội dung"
              name="message"
              key="message"
              placeholder="Nhập lời nhắn ..."
              :class="{
                'error-color': errors.has('message'),
                require: lengthContent,
              }"
              maxlength="1000"
            ></textarea>
            <span class="err-span" v-if="errors.has('message')">{{
              errors.first('message')
            }}</span>
            <div v-if="fileErrors.length > 0" class="ticket__error mb-16">
              <div class="ticket__error-title">
                <img
                  src="~@/assets/img/alert.svg"
                  alt=""
                  class="ticket__error-icon"
                />
                <span>Tệp tin chưa được thêm vào:</span>
              </div>
              <ul class="ticket__error-list">
                <li
                  v-for="(item, i) in fileErrors"
                  :key="i"
                  class="ticket__error-item"
                >
                  {{ item }}</li
                >
              </ul>
            </div>

            <div v-if="this.validateSize" class="ticket__error mb-16">
              <div class="ticket__error-title">
                <img
                  src="~@/assets/img/alert.svg"
                  alt=""
                  class="ticket__error-icon"
                />
                <span>Tệp tin chưa được thêm vào:</span>
              </div>
              <ul class="ticket__error-list">
                <li class="ticket__error-item">
                  {{ this.name }} đang lớn hơn 5Mb.Vui lòng chọn tệp nhỏ
                  hơn.</li
                >
              </ul>
            </div>

            <div v-if="files != null" class="ticket__reply-files mb-16">
              <div
                class="el-before-upload__filename d-flex"
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
            <div class="group-btn d-flex jc-sb">
              <div class="btn-reply d-flex">
                <p-button
                  type="primary"
                  @click.prevent="handleReply"
                  :loading="isUploading"
                  >Gửi trả lời</p-button
                >
                <div class="upload">
                  <p-tooltip
                    :label="'Đính kèm file'"
                    size="large"
                    position="top"
                    type="dark"
                    :active="true"
                  >
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
                      :on-max-size="errorMaximum"
                      :max-file-size="maximumSize"
                    >
                      <img src="@assets/img/upload_file.png" alt="" />
                    </upload>
                  </p-tooltip>
                </div>
              </div>
              <a
                href="#"
                class="btn btn-close d-flex"
                @click="handleCancelTicket()"
              >
                <img src="@assets/img/close_claim.png" alt="" />
                <span>Đóng khiếu nại</span>
              </a>
            </div>
          </div>

          <div class="page-content_drag claim-messages" ref="messages">
            <div
              class="user-content card main-claim"
              ref="mainClaim"
              :style="styleObject"
            >
              <img class="bookmark" src="@assets/img/Bookmark.svg" alt="" />

              <div
                class="
                user-title
                d-flex
                justify-content-between
                align-items-center
              "
              >
                <div class="info-user">
                  <img
                    src="~@/assets/img/avatar.png"
                    alt="avatar"
                    class="avatar-user"
                  />
                  <span v-if="claim.user" class="user-name">{{
                    claim.user.full_name || claim.user.email
                  }}</span>
                </div>
                <div class="user-time">
                  {{ claim.created_at | datetime('dd/MM/yyyy HH:mm:ss') }}
                </div>
              </div>
              <div class="user-text">
                {{ claim.content }}
              </div>
              <div class="gallery ticket-attach-files" v-if="hasFiles">
                <div class="list-item">
                  <div
                    class="item"
                    v-for="(file, i) in claim.attachment"
                    :key="i"
                  >
                    <div
                      class="gallery-item"
                      :class="{ 'ticket-file': isImage(file) }"
                    >
                      <file :src="file" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Message v-for="(mes, i) in messages" :key="i" :current="mes" />
            <div
              class="d-flex justify-content-between align-items-center mb-16"
              v-if="count > 0"
            >
              <p-pagination
                :total="count"
                :perPage.sync="filter.limit"
                :current.sync="filter.page"
                size="sm"
              ></p-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-confirm
      :visible.sync="isVisibleConfirmDelete"
      v-if="isVisibleConfirmDelete"
      :actionConfirm="actions.delete.button"
      :description="actions.delete.Description"
      :title="actions.delete.title"
      :type="actions.delete.type"
      @action="handleDeletefile(deleteFile)"
    >
    </modal-confirm>
  </div>
</template>

<script>
import mixinUpload from '@core/mixins/upload'
import mixinRoute from '@core/mixins/route'
import File from '../components/File'
import { mapActions, mapState, mapMutations } from 'vuex'
import Message from '../components/Message'
import {
  UPDATE_TICKET,
  UPDATE_FILE_TICKET,
  CANCEL_TICKET,
  FETCH_MESSAGE,
  GET_FILE_TICKET,
  PUSH_MESSAGE,
} from '../store'
import { FETCH_TICKET } from '@/packages/claim/store'
import {
  CLAIM_STATUS,
  CLAIM_STATUS_PENDING,
  CLAIM_STATUS_PROCESSED,
} from '../constants'
import { truncate } from '@core/utils/string'
import { Upload } from '@kit'
import { MAXIMUM_SIZE } from '../constants'
import ModalConfirm from '@components/shared/modal/ModalConfirm'
import evenBus from '../../../core/utils/evenBus'

export default {
  name: 'ClaimDetail',
  mixins: [mixinUpload, mixinRoute],
  components: {
    File,
    Message,
    Upload,
    ModalConfirm,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      files: [],
      isUploading: false,
      urls: [],
      isVisibleConfirmDelete: false,
      deleteFile: null,
      attach_files: [],
      messages: [],
      isMessageLoading: false,
      filter: {
        limit: 20,
      },
      claimStatus: CLAIM_STATUS,
      claimStatusPending: CLAIM_STATUS_PENDING,
      claimStatusProcessed: CLAIM_STATUS_PROCESSED,
      message: '',
      lengthContent: false,
      fileErrors: [],
      maximumSize: MAXIMUM_SIZE * 2 ** 20,
      allowedTypes: [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ],
      allowedExtensions: /(\.jpg|\.jpeg|\.png|\.xlsx|\.xls)$/i,
      validateSize: false,
      actions: {
        delete: {
          title: 'Xóa files',
          button: 'Xóa',
          Description: `Bạn có thực sự muốn xóa file này ?`,
          type: 'danger',
        },
      },
      number: 0,
      styleObject: {},
    }
  },
  computed: {
    ...mapState('claim', {
      claim: (state) => state.ticket,
      count: (state) => state.countMess,
    }),
  },
  destroyed() {
    evenBus.$on('my', this.handleF)
  },
  created() {
    this.filter = this.getRouteQuery()
    evenBus.$on('my', this.handleF)
  },
  mounted() {
    this.scrollHandle()
  },
  methods: {
    ...mapActions('claim', [
      FETCH_TICKET,
      UPDATE_FILE_TICKET,
      UPDATE_TICKET,
      CANCEL_TICKET,
      FETCH_MESSAGE,
      GET_FILE_TICKET,
      PUSH_MESSAGE,
    ]),
    ...mapMutations(['updateTicketMessage']),
    truncate,
    async init() {
      this.handleUpdateRouteQuery()
      window.scrollTo(0, 0)
      const { id } = this.$route.params
      await this[FETCH_TICKET](id)
      await this.handlerFetchTicketMessages(id)
      if (this.claim.attach_files != null) {
        this.claim.attach_files.forEach((x) =>
          this.files.push({ name: x, url: x })
        )
      }
    },
    handleF(e) {
      this.number += e
    },
    hasFiles() {
      return this.claim.attachment && this.claims.attachment.length
    },
    extenionFileUrl(val) {
      const rex = /(?:\.([^.]+))?$/
      const ext = rex.exec(val)[1]
      if (ext === undefined) {
        return ''
      }

      return ext
    },
    isImage(url) {
      const ext = this.extenionFileUrl(url)
      if (['png', 'jpg', 'jpeg'].indexOf(ext) !== -1) {
        return true
      }
      return false
    },

    scrollHandle() {
      let eMain = null
      let eMessage = null
      window.onscroll = () => {
        if (!eMain) {
          eMain = this.$refs.mainClaim
        }

        if (!eMessage) {
          eMessage = this.$refs.messages
        }

        if (!eMain || !eMessage) return
        const { height } = eMain.getBoundingClientRect()
        const { top } = eMessage.getBoundingClientRect()

        if (top - 56 < 0) {
          this.styleObject = {
            top: '56px',
            width: '1080px',
            position: 'fixed',
            'z-index': 999,
          }

          let hh = height + 24
          eMessage.style.paddingTop = hh + 'px'
        } else {
          this.styleObject = {}
          eMessage.style.paddingTop = 0
        }
      }
    },

    async handlerFetchTicketMessages(id) {
      this.isMessageLoading = true
      let payload = this.filter
      payload.ticket_id = id
      const res = await this[FETCH_MESSAGE](payload)
      this.isMessageLoading = false

      if (!res || res.error) {
        this.$toast.open({ type: 'error', message: res.message })
        return
      }

      this.messages = res.messages
    },

    formatReason(reason) {
      switch (reason) {
        case 1:
          return 'Sửa đơn'
        case 2:
          return 'Phí hóa đơn'
        case 3:
          return 'Không cập nhật trạng thái'
        case 4:
          return 'Khác'
      }
    },

    formatStatus(status) {
      for (const [key, value] of Object.entries(this.claimStatus)) {
        if (status == value) {
          return key
        }
      }
    },

    listenChange() {
      this.fileErrors = []
    },

    handleChangeFile(file) {
      this.validateSize = false
      const index = this.files.findIndex(({ uid }) => uid === file.uid)
      if (index != -1) {
        this.$set(this.files, index, file)
      }

      if (!this.validateTypeFile(file)) {
        this.number = this.number - 1
        this.fileErrors.push(
          `"${file.name}" định dạng không đúng.Tệp phải có định dạng:  *XLSX, *PNG, *JPG, *JPEG.`
        )
        this.fileErrors = [...new Set(this.fileErrors)]
        return
      }

      this.handleUploadfile(file)
    },
    async handleUploadfile(file) {
      let body = { file: file.raw }

      this.isUploading = true
      const res = await this[UPDATE_FILE_TICKET](body)

      if (res.error) {
        this.isUploading = false
        this.fileErrors.push(res.message)
        return
      }

      this.files.push({
        url: res.urls,
        uid: file.uid,
        name: file.name,
      })
      if (this.files.length == this.number) {
        this.isUploading = false
      }
    },

    async handleReply() {
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
      const res = await this[PUSH_MESSAGE](form)
      this.isUploading = false

      if (!res.success) {
        this.$toast.open({ type: 'error', message: res.message })
        return
      }

      location.reload()
      this.$toast.open({ type: 'success', message: 'Trả lời thành công' })
    },

    actionDeletefile(file) {
      this.isVisibleConfirmDelete = true
      this.deleteFile = file
    },

    handleDeletefile(file) {
      this.number = this.number - 1
      this.isVisibleConfirmDelete = false
      this.files = this.files.filter(({ uid }) => uid != file.uid)
    },

    async handleCancelTicket() {
      let payload = {
        id: this.claim.id,
      }
      const result = await this[CANCEL_TICKET](payload)
      if (result.error) {
        this.$toast.open({
          type: 'error',
          message: result.message,
        })
        return
      }
      this.$toast.open({
        type: 'success',
        message: 'Thành công',
      })
      this.files = []
      this.init()
    },

    errorMaximum({ name }) {
      this.number = this.number - 1
      this.validateSize = true
      this.name = name
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
  },
  watch: {
    filter: {
      handler: function() {
        this.init()
      },
      deep: true,
    },
  },
}
</script>
