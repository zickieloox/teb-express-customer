import http from './http'
import { initializeApp } from 'firebase/app'
import {
  getMessaging,
  getToken,
  deleteToken,
  onMessage,
} from 'firebase/messaging'
import configFirebase from '../config/firebase.json'

const firebase = {
  app: null,
  messaging: null,

  setup: async () => {
    if (!firebase.app) {
      firebase.app = initializeApp(configFirebase.config)
    }

    if (!firebase.messaging) {
      firebase.messaging = getMessaging(firebase.app)
    }

    try {
      const token = await getToken(firebase.messaging, {
        vapidKey: configFirebase.vapidKey,
      })
      if (!token) return

      const res = await http.post('/users/firebase', { token })
      if (!res || res.error) return

      onMessage(firebase.messaging, (payload) => {
        firebase.display(payload)
      })
    } catch (error) {
      console.log(error)
    }
  },

  display(payload) {
    if (Notification.permission !== 'granted') Notification.requestPermission()
    else {
      const {
        notification: { title, body, image },
      } = payload

      new Notification(title, {
        icon: image,
        body,
      })
    }
  },

  unsubscribe: async () => {
    if (!firebase.messaging) return

    try {
      await deleteToken(firebase.messaging)
    } catch (error) {
      console.log(error)
    }
  },
}

export default firebase