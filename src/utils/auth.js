import Cookies from 'js-cookie'
import { sha256 } from 'js-sha256'

const TokenKey = 'vue_admin_template_token'
const StoreId = 'StoreId'
const StoreState = 'StoreState'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function hash(str) {
  return sha256(str)
}

export function setStoreId(id) {
  Cookies.set(StoreId, id)
}

export function getStoreId(id) {
  return Cookies.get(StoreId)
}

export function getStoreState() {
  return Cookies.get(StoreState)
}

export function setStoreState(id) {
  Cookies.set(StoreState, id)
}
