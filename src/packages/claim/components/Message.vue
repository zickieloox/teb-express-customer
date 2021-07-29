<template>
  <div class="message" :class="{ 'cs-reply': roleName }">
    <div class="user-content card">
      <div class="user-title d-flex justify-content-between align-items-center">
        <div class="info-user">
          <img
            src="~@/assets/img/avatar-dark.svg"
            alt="avatar"
            class="avatar-user"
          />
          <span class="user-name">{{ displayName }}</span>
          <span class="role-user" v-show="roleName">{{ roleName }}</span>
        </div>
        <div class="user-time">
          {{ current.created_at | datetime('dd/MM/yyyy HH:mm:ss') }}
        </div>
      </div>
      <div class="user-text">
        <span v-html="formatText(current.content)"></span>
      </div>
      <div class="gallery ticket-attach-files" v-if="hasFiles">
        <div class="list-item">
          <div class="item" v-for="(file, i) in files" :key="i">
            <div :class="classImage(file)">
              <File :src="file" :id="messageId" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import File from './File'
import AuthService from '@core/services/auth'
import { ROLE_ADMIN, ROLE_SUPPORT, ROLE_ACCOUNTANT } from '@core/constants'

export default {
  name: 'TicketMessage',
  components: { File },
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

      if (
        this.current.role === ROLE_ADMIN ||
        this.current.role === ROLE_SUPPORT ||
        this.current.role === ROLE_ACCOUNTANT
      ) {
        return this.current.full_name || 'Support'
      }

      return this.current.user_name || 'Undefined'
    },
    roleName() {
      if (
        this.current.role == ROLE_ADMIN ||
        this.current.role === ROLE_SUPPORT ||
        this.current.role === ROLE_ACCOUNTANT
      ) {
        return 'CSKH'
      }

      return ''
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
        return '<a href="' + url + '">' + url + '</a>'
      })
    },
  },
}
</script>
