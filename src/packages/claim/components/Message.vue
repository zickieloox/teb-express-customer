<template>
  <div class="message" :class="{ me: isMeReply }">
    <div class="user">
      <div class="avatar">
        <img
          src="~@/assets/img/avatar-dark.svg"
          alt="avatar"
          class="avatar-user"
        />
      </div>
      <div class="info">
        <p class="user-name">
          <span>{{ displayName }}</span>
          <span class="user-role" v-show="roleName">{{ roleName }}</span>
        </p>
        <time class="post-time">{{ current.datetime }}</time>
      </div>
    </div>
    <div class="message-content">
      <div class="message-text" v-for="(item, i) in current.items" :key="i">
        <div class="w-text">
          <p v-html="formatText(item)"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from '@core/services/auth'
import { ROLE_ADMIN, ROLE_SUPPORT, ROLE_ACCOUNTANT } from '@core/constants'

const ROLE_LIONBAY = [ROLE_ADMIN, ROLE_SUPPORT, ROLE_ACCOUNTANT]

export default {
  name: 'TicketMessage',
  props: {
    current: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    files() {
      return this.current.attachment || []
    },
    messageId() {
      return this.current.id || 0
    },
    hasFiles() {
      return this.files.length
    },
    displayName() {
      if (this.current.user_id == this.authId) {
        return this.current.full_name || 'Me'
      }

      if (ROLE_LIONBAY.includes(this.current.role)) {
        return this.current.full_name || 'Support'
      }

      return this.current.user_name || 'Undefined'
    },
    roleName() {
      if (ROLE_LIONBAY.includes(this.current.role)) {
        return 'CSKH'
      }

      return ''
    },
    isMeReply() {
      return this.current.user_id == this.authId
    },
    authId() {
      return AuthService.getId()
    },
  },

  methods: {
    classImage(url) {
      const re = /(?:.jpg|.png|.jpeg)$/i
      if (re.test(url)) {
        return 'gallery-item ticket-file'
      }

      return 'gallery-item'
    },
    formatText(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g
      return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>'
      })
    },
  },
}
</script>
