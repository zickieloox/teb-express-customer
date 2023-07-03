import crypto from 'crypto'
import { guid } from '../utils/hash'

const SECRET_KEY = '66ae68d4-8fdf-45f4-9fb2-3678e538a92b'

function signEmail(email) {
  return crypto
    .createHmac('sha256', SECRET_KEY)
    .update(email)
    .digest('hex')
}

export default {
  /* eslint-disable */
  init(userId) {
    return

    window.$crisp = []
    window.CRISP_WEBSITE_ID = process.env.VUE_APP_CRISP_WEBSITE_ID
    if (userId) {
      window.CRISP_TOKEN_ID = `LIONBAY-USER-${userId}`
    } else {
      window.CRISP_TOKEN_ID = `LIONBAY-USER-guest-${guid()}`
    }

    ;(function() {
      const d = document
      const s = d.createElement('script')
      s.src = 'https://client.crisp.chat/l.js'
      s.async = 1
      d.getElementsByTagName('head')[0].appendChild(s)
    })()
  },
  setup({ email, full_name, phone_number }) {
    if (!window || !window.$crisp) return

    const signature = signEmail(email)
    if (email) {
      window.$crisp.push(['set', 'user:email', [email, signature]])
    }

    if (full_name) {
      window.$crisp.push(['set', 'user:nickname', [full_name]])
    }

    if (phone_number) {
      window.$crisp.push(['set', 'user:phone', [phone_number]])
    }
  },
  logout() {
    if (!window || !window.$crisp) return
  },
  hide() {
    if (window.$crisp) {
      window.$crisp.push(['do', 'chat:hide'])
    }
  },
}
