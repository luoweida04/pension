// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  onShow(options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  gotoDevelop(){
    wx.navigateTo({
      url: '/pages/develop/index',
    })
  },
  gotoIndex() {
    wx.navigateTo({
      url: '/pages/index/index?noToHome=1',
    })
  },
  gotoEdit(){
    wx.navigateTo({
      url: '/pages/my/edit/index',
    })
  }
})