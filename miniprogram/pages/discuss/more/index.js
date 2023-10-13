// pages/discuss/more/index.js
Page({
  data: {
    questionList: [],
    my: false,
    first: true
  },

  onLoad(options) {
    if (options.my) {
      wx.setNavigationBarTitle({
        title: '我的问题',
      })
      this.setData({
        my: true
      })
    }
  },

  onShow() {
    this.getQuestion()
    this.setData({
      first: true
    })
  },

  onReachBottom() {
    if (!this.data.showSearch) {
      this.getQuestion()
    }
  },

  getQuestion() {
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'QA',
      data: {
        action: this.data.my ? 'getUserQuestion' : 'waitAnswerQuestion',
        params: {
          limit: this.data.questionList.length + 10
        }
      }
    }).then(res => {
      wx.hideLoading()
      if (res.result.data.length === this.data.questionList.length) {
        if (!this.data.first) {
          wx.showToast({
            title: '没有更多问题了',
            icon: 'none'
          })
        } else this.setData({
          first: false
        })
      }
      this.setData({
        questionList: res.result.data
      })
    })
  },

  details(e) {
    wx.navigateTo({
      url: `/pages/discuss/answers/index?id=${e.currentTarget.dataset.id}&post=${encodeURIComponent(e.currentTarget.dataset.post)}`
    })
  },
})