import http from './http'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'
import configFirebase from '../config/firebase.json'

const app = initializeApp(configFirebase.config)
async function fetchToken() {
  try {
    const messaging = getMessaging(app)
    return await getToken(messaging, { vapidKey: configFirebase.vapidKey })
  } catch (error) {
    return ''
  }
}

export async function setup() {
  const token = await fetchToken()
  if (!token) return

  try {
    http.post('/users/firebase', { token })
  } catch (error) {
    console.log(error)
  }
}
