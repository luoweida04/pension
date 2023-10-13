// pages/discuss/answers/index.js
import { formatter } from '../../../utils/core'

Page({

  data: {
    questionId: null,
    answerList: [],
    question: {},
    showWriteAns: false,
    writeAns: ''
  },

  onLoad(options) {
    this.setData({
      questionId: options.id
    })
    if (options.post === 'true') {
      this.writeAnswer()
    }
    wx.cloud.callFunction({
      name: 'QA',
      data: {
        action: 'getQuestionDetail',
        params: {
          questionId: options.id
        }
      }
    }).then(res => {
      res.result.data.time = formatter(res.result.data._createTime)
      this.setData({
        question: res.result.data
      })
    })
    this.getAnswerList()
  },

  onReachBottom() {
    console.log(123);
    this.getAnswerList()
  },

  getAnswerList() {
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'QA',
      data: {
        action: 'getQuestionAnswers',
        params: {
          questionId: this.data.questionId,
          limit: this.data.answerList.length + 10
        }
      }
    }).then(res => {
      wx.hideLoading()
      if (res.result.data.length === this.data.answerList.length && this.data.answerList.length > 0)
        wx.showToast({
          title: '没有更多回答了',
          icon: 'none'
        })
      this.setData({
        answerList: res.result.data.map(ans => Object.assign(ans, { user: ans.userId.substring(0, 5) }))
      })
    })
  },

  gotoDetail(e) {
    wx.navigateTo({
      url: `/pages/discuss/details/index?questionId=${this.data.questionId}&answerId=${e.currentTarget.dataset.id}`,
    })
  },

  onInputWriteAns(e) {
    this.setData({
      writeAns: e.detail.value
    })
  },

  cancel() {
    this.setData({
      showWriteAns: !this.data.showWriteAns,
      writeAns: ""
    })
  },

  post() {
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: "QA",
      data: {
        action: "makeAnswer",
        params: {
          questionId: this.data.questionId,
          content: this.data.writeAns
        }
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '发表成功',
      })
      this.getAnswerList()
      this.setData({
        showWriteAns: false,
        'question.answerCount': this.data.question.answerCount + 1
      })
    })
  },

  writeAnswer() {
    this.setData({
      showWriteAns: true,
      writeAns: ""
    })
  }
})