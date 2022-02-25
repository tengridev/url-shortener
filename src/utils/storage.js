import { settings } from '../data/settings'
import ls from 'localstorage-slim'
import encUTF8 from 'crypto-js/enc-utf8'
import AES from 'crypto-js/aes'

ls.config.encrypt = settings.localStorage.encrypt
ls.config.secret = settings.localStorage.secret
ls.config.ttl = settings.localStorage.ttl

ls.config.encrypter = (data, secret) =>
  AES.encrypt(JSON.stringify(data), secret).toString()

ls.config.decrypter = (data, secret) => {
  try {
    return JSON.parse(AES.decrypt(data, secret).toString(encUTF8))
  } catch (e) {
    return data
  }
}

export const storage = {
  set: (key, value, config = {}) => {
    ls.set(key, value, config)
  },
  get: (key, config = {}) => {
    return ls.get(key, config)
  },
  flush: (force = false) => {
    ls.flush(force)
  },
  remove: (key) => {
    return ls.remove(key)
  },
  clear: () => {
    return ls.clear()
  }
}
