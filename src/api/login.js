import request from '@/utils/request'

export function login(obj) {
  return request({
    url: 'pop/user/login',
    method: 'post',
    data: obj
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(obj = {}) {
  return request({
    url: '/pop/user/LogOut',
    method: 'post',
    data: obj
  })
}

export default {
  getStoreState(obj = {}) {
    return request({
      url: 'pop/user/storeState',
      method: 'post',
      data: obj
    })
  }
}

