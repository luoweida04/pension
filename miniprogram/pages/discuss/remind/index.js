// pages/discuss/remind/index.js
const { formatter } = require('../../../utils/core')

Page({

  data: {
    remindList: []
  },

  onLoad() {
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'QA',
      data: {
        action: 'getNoticeAnswerList'
      }
    }).then(res => {
      Promise.all(res.result.data.map(item => {
        return new Promise((resolve, reject) => {
          wx.cloud.callFunction({
            name: 'QA',
            data: {
              action: 'getAnswerDetail',
              params: {
                answerId: item.answerId
              }
            }
          }).then(res1 => {
            let { userId, content, questionId, _createTime: time } = res1.result.data
            userId = userId.substring(0, 5)
            resolve(Object.assign(item, { userId, content, questionId, time: formatter(time) }))
          })
        })
      })).then(list => {
        wx.hideLoading()
        this.setData({
          remindList: this.data.remindList.concat(list)
        })
      })
    })
    wx.cloud.callFunction({
      name: 'QA',
      data: {
        action: 'getNoticeCommentList'
      }
    }).then(res => {
      // 还要获取评论内容。。。
      Promise.all(res.result.data.map(item => {
        return new Promise((resolve, reject) => {
          wx.cloud.callFunction({
            name: 'QA',
            data: {
              action: 'getCommentDetail',
              params: {
                commentId: item.commentId
              }
            }
          }).then(res1 => {
            let { userId, content, answerId, _createTime: time } = res1.result.data
            userId = userId.substring(0, 5)
            resolve(Object.assign(item, { userId, content, answerId, time: formatter(time) }))
          })
        })
      })).then(list => {
        this.setData({
          remindList: this.data.remindList.concat(list)
        })
      })
    })
  },

  readRemind(e) {
    const { index, questionid, answerid } = e.currentTarget.dataset
    const remindList = this.data.remindList
    wx.navigateTo({
      url: `/pages/discuss/details/index?questionId=${questionid}&answerId=${answerid}`,
    })
    if (questionid) {
      wx.cloud.callFunction({
        name: 'QA',
        data: {
          action: 'readNoticeAnswer',
          params: {
            noticeId: this.data.remindList[index]._id
          }
        }
      })
      remindList.splice(index, 1)
      this.setData({
        remindList
      })
    } else {
      wx.cloud.callFunction({
        name: 'QA',
        data: {
          action: 'readNoticeComment',
          params: {
            noticeId: this.data.remindList[index]._id
          }
        }
      })
      remindList.splice(index, 1)
      this.setData({
        remindList
      })
    }

  }
})