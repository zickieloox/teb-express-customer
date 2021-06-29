<template>
  <div class="setting setting-account pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header_title header-2">API</div>
      </div>
      <div class="page-body">
        <div class="row">
          <div class="col-6">
            <div class="title">Token</div>
            <div class="user-token">
              <div class="user-token-input">
                <p-input
                  :value="
                    isShowToken
                      ? user_token
                      : '**************************************************'
                  "
                  type="search"
                >
                </p-input>
                <a
                  href="#"
                  class="btn btn-default"
                  @click.prevent="showUserToken"
                >
                  <span>Show</span>
                </a>
              </div>
              <a
                href="#"
                class="btn btn-danger"
                @click.prevent="showModalConfirmReset"
              >
                <span>Reset token</span>
              </a>
            </div>

            <div class="title mt-40">API</div>
            <a style="color:#20bfca" href="#">Danh sách API</a>

            <br />
            <div class="user-token-note">
              The authorization header must be base64 encoded. For example, if
              the the credential user:username as the username and token as the
              then the field’s value is the base64-encoding of username:token
            </div>
          </div>
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
import { GET_USER_TOKEN, RESET_USER_TOKEN } from '../store/index'
import ModalConfirm from '@components/shared/modal/ModalConfirm'

export default {
  name: 'API',
  components: {
    ModalConfirm,
  },
  computed: {
    ...mapState('setting', {
      user_token: (state) => state.user_token,
    }),
  },
  data() {
    return {
      isShowToken: false,
      isVisibleResetToken: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('setting', [GET_USER_TOKEN, RESET_USER_TOKEN]),

    async init() {
      this.isShowToken = false
      this.isVisibleResetToken = false
      this.isFetching = true
      this.result = await this.getUserToken()
      this.isFetching = false
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
  },
}
</script>
