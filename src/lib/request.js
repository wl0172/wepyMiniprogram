import wepy from 'wepy'
import wxsystem from './wx-system'
import utils from '../lib/utils'

/**
 * @description POST请求
 * @author Songjp
 * @augments fullUrl 请求地址
 * @augments param 请求参数
 * @augments token 默认带token
 */
function doPost(fullUrl, param, token = true) {
  return new Promise(function (resolve, reject) {
    let _params = {}
    if (token) {
      _params = {
        openId: wxsystem.getToken() || '',
        clientType: wxsystem.getClientType() || '',
        clientId: utils.getUUIDFromSession()
      }
    }
    _params = Object.assign(_params, param)
    console.log(`请求地址：${fullUrl}，请求参数：`)
    console.log(_params)
    wx.request({
      url: fullUrl,
      data: _params,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.statusCode === 200) {
          if (res.data.code === '0') {
            resolve(res.data)
          } else if ((res.data.code !== '0') && res.data.message) {
            wepy.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            })
          } else {
            wepy.showToast({
              title: '发生未知错误，请联系客服!',
              icon: 'none',
              duration: 1500
            })
          }
        } else if (res.statusCode === 401) {
          wepy.showToast({
            title: '未授权 ，登录失败！',
            icon: 'none',
            duration: 1500
          })
        } else if (res.statusCode === 404) {
          wepy.showToast({
            title: '服务器找不到您所请求的文件或脚本！',
            icon: 'none',
            duration: 1500
          })
        } else if (res.statusCode === 500) {
          wepy.showToast({
            title: '服务器发生未知错误！',
            icon: 'none',
            duration: 1500
          })
        } else {
          wepy.showToast({
            title: '生未知错误！',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function () {
        wepy.showToast({
          title: '网络超时，请重新操作！',
          icon: 'none',
          duration: 1500
        })
      }
    })
  })
}

/**
 * @description GET请求
 * @author Songjp
 * @augments fullUrl 请求地址
 * @augments param 请求参数
 * @augments token 默认带token
 */
function doGet(fullUrl, param, token = true) {
  return new Promise(function (resolve, reject) {
    let _params = {}
    if (token) {
      _params = {
        openId: wxsystem.getToken() || '',
        clientType: wxsystem.getClientType() || '',
        clientId: utils.getUUIDFromSession()
      }
    }
    _params = Object.assign(_params, param)
    console.log(`请求地址：${fullUrl}，请求参数：`)
    console.log(_params)
    wx.request({
      url: fullUrl,
      data: _params,
      method: 'GET',
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data.code === '0') {
            resolve(res.data)
          } else if (res.data.code === '2002') {
            resolve({ code: '2002' })
          } else if ((res.data.code !== '0') && res.data.message) {
            wepy.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            })
          } else {
            wepy.showToast({
              title: '发生未知错误，请联系客服!',
              icon: 'none',
              duration: 1500
            })
          }
        } else if (res.statusCode === 401) {
          wepy.showToast({
            title: '未授权 ，登录失败！',
            icon: 'none',
            duration: 1500
          })
        } else if (res.statusCode === 404) {
          wepy.showToast({
            title: '服务器找不到您所请求的文件或脚本！',
            icon: 'none',
            duration: 1500
          })
        } else if (res.statusCode === 500) {
          wepy.showToast({
            title: '服务器发生未知错误！',
            icon: 'none',
            duration: 1500
          })
        } else {
          wepy.showToast({
            title: '生未知错误！',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  })
}


export {
  doPost,
  doGet
}
