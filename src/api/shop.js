import request from '@/utils/request'

// export function login(obj) {
//   return request({
//     url: 'pop/user/login',
//     method: 'post',
//     data: obj
//   })
// }
//
// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export default {
  createShop(obj = {}) {
    return request({
      url: 'pop/store/create',
      method: 'post',
      data: obj
    })
  },
  // 店铺state
  state(data = {}) {
    return request({
      url: '/admin/store/addPage',
      method: 'get',
      params: data
    })
  },
  getGoodsType(obj = {}) { // 获得分类
    return request({
      url: 'pop/search/searchOption',
      method: 'post',
      data: obj
    })
  },
  getGoodsList(obj = {}) { // 搜索分类获得商品
    return request({
      url: 'pop/search/Search',
      method: 'post',
      data: obj
    })
  },
  pubgoods(obj = {}) { // 添加选择的商品到店铺
    return request({
      url: 'pop/product/addSpuToStore',
      method: 'post',
      data: obj
    })
  }

}

