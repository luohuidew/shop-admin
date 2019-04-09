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
  getStates(obj = {}) { // 获取州市地址
    return request({
      url: 'pop/store/addPage',
      method: 'post',
      data: obj
    })
  },
  createShop(obj = {}) {
    return request({
      url: 'pop/store/create',
      method: 'post',
      data: obj
    })
  },
  // 获取店铺信息
  getData(obj = {}) {
    return request({
      url: '/pop/store/edit',
      method: 'post',
      data: obj
    })
  },
  updateShop(obj = {}) {
    return request({
      url: 'pop/store/update',
      method: 'post',
      data: obj
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
  },
  getShopgoods(obj = {}) { // 获取店铺商品
    return request({
      url: 'pop/product/storeProductList',
      method: 'post',
      data: obj
    })
  },
  setGoodTop(obj = {}) { // 商品置顶
    return request({
      url: 'pop/product/spuOfstick',
      method: 'post',
      data: obj
    })
  },
  deleteGood(obj = {}) { // 商品下架
    return request({
      url: 'pop/product/deleteSpu',
      method: 'post',
      data: obj
    })
  },
  releaseStore(obj = {}) { // 发布店铺及商品
    return request({
      url: 'pop/store/releaseStore',
      method: 'post',
      data: obj
    })
  },
  closeStore(obj = {}) { // 关闭店铺
    return request({
      url: 'pop/store/closeStore',
      method: 'post',
      data: obj
    })
  },
  getStoreInfo(obj = {}) { // 店铺预览
    return request({
      url: 'pop/store/getStoreInfo',
      method: 'post',
      data: obj
    })
  }
}

