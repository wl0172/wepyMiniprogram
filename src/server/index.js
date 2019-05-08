import 'wepy-async-function'
import {doPost} from '../lib/request'
import config from '../config/index'

/**
 * 测试
 * @param {*} param
 */
function test(param) {
  return new Promise((resolve, reject) => {
    doPost(config.host + '/index', param, false).then(res => {
      resolve(res)
    })
  })
}

export {
  test
}
