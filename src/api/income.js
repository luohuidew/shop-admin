import request from '@/utils/request'
export default {
  storeStatistics(obj = {}) { // 获取收益
    return request({
      url: 'pop/store/storeStatistics',
      method: 'post',
      data: obj
    })
  },
  storeSettle(obj = {}) { // 申请结算
    return request({
      url: 'pop/store/storeSettle',
      method: 'post',
      data: obj
    })
  },
  AddPayMethod(obj = {}) { // 添加账户
    return request({
      url: 'pop/store/AddPayMethod',
      method: 'post',
      data: obj
    })
  },
  updatePayMethod(obj = {}) { // 修改账户
    return request({
      url: 'pop/store/updatePayMethod',
      method: 'post',
      data: obj
    })
  }
}

