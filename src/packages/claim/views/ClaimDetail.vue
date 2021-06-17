<template>
  <div class="claim-detail-page pages">
    <div class="container">
      <div class="content-page">
        <div class="page-header">
          <div class="page-header_back">
            <img
              src="@/assets/img/Arrow - Left Square 24px.png"
              class="page-header_back_icon"
            />
            <router-link :to="{ name: 'list-claim' }" class="text">
              Đơn hàng khiếu nại
            </router-link>
          </div>
          <div class="page-header-group">
            <div class="page-header_title header-2">
              <span style="font-weight: bold">Khách chưa nhận được hàng</span>
              <!-- <span
                v-if="claim.status == 1"
                class="edit-ticket"
                @click="showTicketModal"
              >
                <img src="~@/assets/img/edit-2.svg" alt="edit" />
              </span> -->
            </div>
            <div
              class="page-header-group-actions__right"
              v-if="claim.status != 2"
            >
              <a href="#" class="btn btn-primary" @click="showModalReply">
                <span>Trả lời</span>
              </a>
            </div>
          </div>
        </div>
        <div class="page-content">
          <div class="page-content_note">
            <div class="card" :style="styleInfoObject" ref="claimInfo">
              <div class="note-content">
                <ul class="list-note">
                  <li class="item-note">
                    <span class="item-title">Trạng thái:</span>
                    <span
                      style="margin-left: 10px"
                      v-status:status="formatStatus(claim.status)"
                    ></span>
                  </li>
                  <li class="item-note">
                    <span class="item-title">Lý do: </span>
                    {{ formatReason(claim.category) }}
                  </li>
                  <li class="item-note">
                    <span class="item-title">Mã đơn hàng: </span>
                    <router-link
                      v-if="claim.order_number"
                      :to="{
                        name: 'list-order-items',
                        params: { id: claim.object_id },
                      }"
                    >
                      {{ claim.object_id }}
                    </router-link>
                  </li>
                  <li class="item-note">
                    <span class="item-title">Ngày tạo: </span>
                    {{ claim.created_at | datetime('dd-MM-yyyy HH:mm:ss') }}
                  </li>
                  <li class="item-note">
                    <span class="item-title">Ngày cập nhật gần nhất: </span>
                    {{ claim.updated_at | datetime('dd-MM-yyyy HH:mm:ss') }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="menu_content">
            <div class="page-content_drag claim-messages" ref="messages">
              <div
                class="user-content card main-claim"
                :style="styleObject"
                ref="mainClaim"
              >
                <div
                  class="user-title d-flex justify-content-between align-items-center"
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
                    {{ claim.created_at | datetime('dd-MM-yyyy HH:mm:ss') }}
                  </div>
                </div>
                <div class="user-text">
                  {{ claim.content }}
                </div>
                <div class="gallery ticket-attach-files" v-if="hasFiles">
                  <div class="list-item">
                    <div
                      class="item"
                      v-for="(file, i) in claim.attach_files"
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
    </div>
    <!-- <modal-edit-ticket
      @success="toggleShowTicket"
      :visible.sync="isTicketOpen"
      v-if="isTicketOpen"
    >
    </modal-edit-ticket> -->
    <modal-reply
      :claim="claim"
      :visible.sync="isVisibleModalReply"
      v-if="isVisibleModalReply"
      @success="replySuccess"
    ></modal-reply>
  </div>
</template>

<script>
import mixinUpload from '@core/mixins/upload'
import mixinRoute from '@core/mixins/route'
import File from '../components/File'
import Browser from '@core/helpers/browser'
import ModalReply from '../components/ModalReply'
import { mapActions, mapState, mapMutations } from 'vuex'
import Message from '../components/Message'
import {
  UPDATE_TICKET,
  UPDATE_FILE_TICKET,
  CANCEL_TICKET,
  FETCH_MESSAGE,
  GET_FILE_TICKET,
} from '../store'
import { FETCH_TICKET } from '@/packages/claim/store'

export default {
  name: 'ClaimDetail',
  mixins: [mixinUpload, mixinRoute],
  components: {
    File,
    ModalReply,
    Message,
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
    description: {
      type: String,
      default: '',
    },
    actionConfirm: {
      type: String,
    },
    type: {
      type: String,
      default: 'primary',
    },
  },
  data() {
    return {
      isVisibleCancelClaim: false,
      content: '',
      reply: '',
      reason: null,
      errMessage: [],
      files: [],
      isUploading: false,
      requiredTitle: false,
      requiredContent: false,
      title: '',
      urls: [],
      requiredReason: false,
      selectReason: false,
      solution: null,
      isVisibleConfirmDelete: false,
      deleteFile: null,
      orderId: null,
      validTitle: false,
      requiredOrder: false,
      correctOrderid: false,
      isTicketOpen: false,
      attach_files: [],
      isVisibleModalReply: false,
      messages: [],
      isMessageLoading: false,
      isNextpage: 0,
      filter: {
        limit: 20,
      },
      styleObject: {},
      styleInfoObject: {},
    }
  },
  computed: {
    ...mapState('claim', {
      claim: (state) => state.ticket,
      count: (state) => state.countMess,
    }),
  },
  created() {
    ;(this.filter = this.getRouteQuery()), this.init()
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
    ]),
    ...mapMutations(['updateTicketMessage']),
    async init() {
      this.handleUpdateRouteQuery()
      window.scrollTo(0, 0)
      const { id } = this.$route.params
      await this[FETCH_TICKET](id)
      await this.handlerFetchTicketMessages()
      this.reason = this.claim.category
      this.orderId = this.claim.object_id
      this.title = this.claim.subject
      this.content = this.claim.content
      this.solution = this.claim.solution
      this.reply = this.claim.reply
      if (this.claim.attach_files != null) {
        this.claim.attach_files.forEach((x) =>
          this.files.push({ name: x, url: x })
        )
      }
    },

    scrollHandle() {
      let eMain = null
      let eMessage = null
      let eInfo = null
      window.onscroll = () => {
        if (!eMain) {
          eMain = this.$refs.mainClaim
        }

        if (!eInfo) {
          eInfo = this.$refs.claimInfo
        }

        if (!eMessage) {
          eMessage = this.$refs.messages
        }

        if (!eMain || !eMessage) return
        const { height } = eMain.getBoundingClientRect()
        const { top, left, width } = eMessage.getBoundingClientRect()
        const rectInfo = eInfo.getBoundingClientRect()

        if (top - 56 < 0) {
          if (this.classMainClaim === 'fixed') return

          this.styleObject = {
            top: '56px',
            left,
            width: width + 'px',
            position: 'fixed',
            'z-index': 999,
          }

          this.styleInfoObject = {
            top: '56px',
            left: rectInfo.left,
            width: rectInfo.width + 'px',
            position: 'fixed',
            'z-index': 999,
          }

          let hh = height + 12
          eMessage.style.paddingTop = hh + 'px'
        } else {
          if (this.classMainClaim === '') return

          this.styleObject = {}
          this.styleInfoObject = {}
          eMessage.style.paddingTop = 0
        }
      }
    },

    adjustIconsInTextarea() {
      this.requiredContent = false
    },

    showTicketModal() {
      this.isTicketOpen = !this.isTicketOpen
    },
    toggleShowTicket() {
      this.isTicketOpen = !this.isTicketOpen
      this.init()
    },
    hasFiles() {
      return this.claim.attach_files && this.claims.attach_files.length
    },
    hasFilesMes() {
      return this.message.attach_files && this.message.attach_files.length
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
    async getTicketFile(url, isFile) {
      let result = ''

      this.isFetching = true
      try {
        const payload = {
          url: url,
          type: 'tickets',
        }
        result = await this.getFileTicket(payload)

        if (!result.success) {
          this.$toast.open({ type: 'error', message: `Download failed ! ` })
          return false
        }
      } catch (e) {
        this.$toast.open({ type: 'error', message: `Download failed !` })
      }
      this.isFetching = false

      if (isFile) {
        Browser.downloadBlob(result.blob, url.split('/').pop())
      } else {
        return window.URL.createObjectURL(result.blob)
      }
    },
    getTicketFiles() {
      if (!this.attach_files.length) return false

      this.attach_files.forEach(async (el, i) => {
        if (this.isImage(el)) {
          let result = this.getTicketFile(el, false)
          result.then((response) => {
            this.$set(this.attach_files, i, {
              url: el,
              blob: response,
            })
          })
        }
      })
    },
    async handlerFetchTicketMessages() {
      this.isMessageLoading = true
      const res = await this[FETCH_MESSAGE](this.filter)
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
          return 'Chất lượng đơn hàng'
        case 3:
          return 'Phí hóa đơn'
        case 4:
          return 'Không cập nhật trạng thái'
        case 5:
          return 'Khác'
      }
    },
    formatStatus(status) {
      switch (status) {
        case 1:
          return 'pending'
        case 2:
          return 'resolved'
      }
    },

    showModalReply() {
      this.isVisibleModalReply = true
    },
    replySuccess(reply) {
      const { id } = this.$route.params
      this[FETCH_TICKET](id)
      this.messages.unshift(reply)
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
