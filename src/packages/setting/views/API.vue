<template>
  <div class="setting setting-api pages">
    <div class="page-content">
      <div class="setting-section card" id="user-token">
        <div class="card-header">API</div>
        <div class="user-token-input card-content">
          <label class="lbn-input-setting">Token</label>
          <div
            class="input-setting"
            :class="{
              'hidden-password': !isShowToken,
            }"
          >
            <p-input
              :value="
                isShowToken
                  ? user_token
                  : '***********************************************'
              "
              type="search"
            >
            </p-input>
            <p-tooltip
              :class="`tooltip-copy`"
              :label="`Copy`"
              position="top"
              type="dark"
            >
              <span class="copy" @click.prevent="copy">
                <img src="@assets/img/copy.svg" />
                <span class="tooltip-text" id="myTooltip"></span>
              </span>
            </p-tooltip>
            <p-tooltip
              v-if="isShowToken"
              :class="`tooltip-token`"
              :label="`Show token`"
              position="top"
              type="dark"
            >
              <inline-svg
                :src="require('@assets/img/show_token.svg')"
                @click.prevent="showUserToken"
              ></inline-svg>
            </p-tooltip>
            <p-tooltip
              v-else
              :class="`tooltip-token`"
              class="tooltip-token"
              :label="`Hide token`"
              position="top"
              type="dark"
            >
              <inline-svg
                :src="require('@assets/img/hide_token.svg')"
                @click.prevent="showUserToken"
              ></inline-svg>
            </p-tooltip>
          </div>
          <a
            href="#"
            id="btn_rs_token"
            class="btn btn-danger"
            @click.prevent="showModalConfirmReset"
          >
            <span>Reset token</span>
          </a>
        </div>
        <div class="user-token-note">
          The authorization header must be base64 encoded. For example, if the
          the credential user:username as the username and token as the then the
          field’s value is the base64-encoding of username:token
        </div>
      </div>
      <div class="setting-section card" id="webhook-url">
        <div class="card-header">Webhook</div>
        <div class="webhook-url-input card-content">
          <label class="lbn-input-setting">URL</label>
          <div class="input-setting">
            <p-input
              type="text"
              v-model="webhookUrl"
              :input="webhookUrl"
              :placeholder="`Nhập url`"
            >
            </p-input>
          </div>
          <p-button
            :loading="isSaving"
            :type="`default`"
            class="btn-lb-secondary"
            @click="hanleSaveSettingWebhook"
          >
            Save webhook
          </p-button>
        </div>
      </div>
    </div>
    <modal-confirm
      :visible.sync="isVisibleResetToken"
      :actionConfirm="'Reset'"
      :title="'Reset token'"
      :type="'danger'"
      @action="resetToken()"
    >
    </modal-confirm>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  GET_USER_TOKEN,
  RESET_USER_TOKEN,
  SAVE_SETTING_WEBHOOK,
  FETCH_SETTING_WEBHOOK,
} from '../store/index'
import ModalConfirm from '@components/shared/modal/ModalConfirm'
import { cloneDeep } from '@core/utils'
export default {
  name: 'API',
  components: {
    ModalConfirm,
  },
  computed: {
    ...mapState('setting', {
      user_token: (state) => state.user_token,
    }),
    urlDocument() {
      return `${process.env.VUE_APP_DOC_API_URL}`
    },
  },
  data() {
    return {
      isShowToken: false,
      isVisibleResetToken: false,
      webhookUrl: '',
      isSaving: false,
      isFetching: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('setting', [
      GET_USER_TOKEN,
      RESET_USER_TOKEN,
      SAVE_SETTING_WEBHOOK,
      FETCH_SETTING_WEBHOOK,
    ]),

    async init() {
      this.isShowToken = false
      this.isVisibleResetToken = false
      this.isFetching = true
      const [r1, r2] = await Promise.all([
        this.getUserToken(),
        this.fetchSettingWebhook(),
      ])
      this.isFetching = false
      if (!r1.success || !r2.success) {
        this.$toast.open({ message: r1.message || r2.message, type: 'error' })
      }
      this.webhookUrl = cloneDeep(this.$store.state.setting.webhook_url)
    },

    showUserToken() {
      this.isShowToken = !this.isShowToken
    },

    showModalConfirmReset() {
      this.isVisibleResetToken = !this.isVisibleResetToken
    },

    async resetToken() {
      let result = await this.resetUserToken()
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
        })
      } else {
        this.$toast.open({
          type: 'success',
          message: 'Reset token thành công.',
        })
        await this.init()
      }
    },
    async hanleSaveSettingWebhook() {
      this.isSaving = true
      const body = {
        webhook_url: this.webhookUrl,
      }

      const result = await this[SAVE_SETTING_WEBHOOK](body)
      this.isSaving = false
      if (!result.success) {
        this.$toast.open({
          message: result.message,
          type: 'error',
        })
        return
      }
      this.$toast.open({
        message: 'Lưu cài đặt webhook thành công',
        type: 'success',
      })
    },
    copy() {
      let copyText = this.user_token
      let textArea = document.createElement('textarea')
      textArea.value = copyText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('Copy')
      textArea.remove()

      let tooltip = document.getElementById('myTooltip')
      tooltip.innerHTML = 'Đã sao chép!'
      setTimeout(() => (tooltip.innerHTML = ''), 1000)
    },
  },
}
</script>
