import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { sha256 } from 'js-sha256'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // alert(store.getters.token)
    console.log(config)
    if (getToken()) {
      if (config.method === 'get') {
        config.params.token = getToken()
      } else {
        config.data.token = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      }
    }
    config.headers['Encrypt-Sign'] = set_header(config.data)
    config.data = JSON.stringify(config.data)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 1000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 1205:非法的token; 1207:其他客户端登录了;
      if (res.code === 1205 || res.code === 1207) {
        MessageBox.confirm(
          'You have been logged out',
          'Confirm logout',
          {
            confirmButtonText: 'Re login',
            cancelButtonText: 'cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
function set_header(data = {}) {
  var arys = typeof (data) === 'string' ? JSON.parse(data) : data
  var jsonnew = objKeySort(arys) // 函数执行
  var params = ''
  for (var key in jsonnew) {
    if (typeof (jsonnew[key]) === 'object') {
      params += key + '=' + JSON.stringify(jsonnew[key]) + '&'
    } else {
      params += key + '=' + jsonnew[key] + '&'
    }
  }
  params = params.substring(0, params.length - 1)
  return sha256(params)
  // var newstr=str3+extra_str;
  // 打印结果==> "ac"="acac"&"ba"="baba"&"bb"="bbbb"&"cc"="cccc"12345678901234561234567890123456"
  // 排序的函数
  function objKeySort(arys) {
    // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var temp = JSON.parse(JSON.stringify(arys))
    temp.extra_str = 'be01S%3eMa#0b15a?8y@zX'
    var newkey = Object.keys(temp).sort()
    var newObj = {} // 创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {
      // 遍历newkey数组
      newObj[newkey[i].toLowerCase()] = temp[newkey[i]]
      // 向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj // 返回排好序的新对象
  }
}

export default service
