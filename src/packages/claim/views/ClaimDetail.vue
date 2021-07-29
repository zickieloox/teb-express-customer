<template>
  <div class="claim-detail-page pages">
    <div class="claim-content-page">
      <div class="page-header" id="header">
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
          <!-- <div
              class="page-header-group-actions__right"
              v-if="claim.status != claimStatusProcessed"
            >
              <a href="#" class="btn btn-primary" @click="showModalReply">
                <span>Trả lời</span>
              </a>
              <a
                href="#"
                class="btn btn-danger ml-10"
                @click="handleCancelTicket()"
              >
                <span>Đóng</span>
              </a>
            </div> -->
        </div>
        <div class="note-content">
          <span v-if="claim.package"> Mã đơn: {{ claim.package.code }} </span>
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
          <div class="user-content card main-claim" id="mainClaim">
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

            <div
              class="button-reply"
              v-if="claim.status != claimStatusProcessed"
              @click="showModalReply"
            >
              <img src="@assets/img/chat.png" alt="" />
              <span>Trả lời</span>
            </div>
          </div>
          <div class="page-content_drag claim-messages" id="messages">
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
import {
  CLAIM_STATUS,
  CLAIM_STATUS_PENDING,
  CLAIM_STATUS_PROCESSED,
} from '../constants'
import { truncate } from '@core/utils/string'

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
  },
  data() {
    return {
      content: '',
      reply: '',
      reason: null,
      files: [],
      isUploading: false,
      title: '',
      urls: [],
      requiredReason: false,
      selectReason: false,
      solution: null,
      isVisibleConfirmDelete: false,
      deleteFile: null,
      validTitle: false,
      isTicketOpen: false,
      attach_files: [],
      isVisibleModalReply: false,
      messages: [],
      isMessageLoading: false,
      filter: {
        limit: 20,
      },
      claimStatus: CLAIM_STATUS,
      claimStatusPending: CLAIM_STATUS_PENDING,
      claimStatusProcessed: CLAIM_STATUS_PROCESSED,
    }
  },
  computed: {
    ...mapState('claim', {
      claim: (state) => state.ticket,
      count: (state) => state.countMess,
    }),
  },
  created() {
    this.filter = this.getRouteQuery()
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
    truncate,
    async init() {
      this.handleUpdateRouteQuery()
      window.scrollTo(0, 0)
      const { id } = this.$route.params
      await this[FETCH_TICKET](id)
      await this.handlerFetchTicketMessages(id)
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
      this.positionMessage()
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

    positionMessage() {
      var headerHeight = document.getElementById('header').offsetHeight
      var mainClaimHeight = document.getElementById('mainClaim').offsetHeight
      document.getElementById('messages').style.paddingTop =
        headerHeight + mainClaimHeight + 6 + 'px'
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

    showModalReply() {
      this.isVisibleModalReply = true
    },
    replySuccess(reply) {
      const { id } = this.$route.params
      this[FETCH_TICKET](id)
      this.messages.unshift(reply)
      this.init()
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
