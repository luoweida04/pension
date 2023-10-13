// pages/discuss/details/index.js
import { formatter } from '../../../utils/core'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionId: "",
    answerId: "",
    answerId: "",
    ansDetail: Object,
    writeCom: "",
    showWriteCom: false,
    comments: [],
    question: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      questionId: options.questionId,
      answerId: options.answerId
    })
    if (options.post === 'true') {
      this.comment()
    }

    this.getAnswerComments(false)
    wx.cloud.callFunction({
      name: "QA",
      data: {
        action: "getAnswerDetail",
        params: {
          answerId: this.data.answerId
        }
      }
    }).then(res => {
      wx.cloud.callFunction({
        name: 'QA',
        data: {
          action: 'getQuestionDetail',
          params: {
            questionId: res.result.data.questionId
          }
        }
      }).then(res1 => {
        res1.result.data.time = formatter(res1.result.data._createTime)
        this.setData({
          question: res1.result.data,
          ansDetail: res.result.data,
        })
      })
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getAnswerComments(false)
  },
  getAnswerComments(newCom) {
    // 若不是10的整数倍, 表示后面已经没有更多数据了
    if (this.data.comments.length % 10 != 0 && !newCom) return;
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "QA",
      data: {
        action: "getAnswerComments",
        params: {
          // openId: "oQe4W4-OuD2451I0M_Em1JoQFeIo",
          answerId: this.data.answerId,
          limit: this.data.comments.length + 10
        }
      }
    }).then(res => {
      this.setData({
        comments: res.result.data.comments.map((item) => {
          return {
            name: "",
            date: this.fromatter(item._updateTime),
            support: item.isLike ? 'red' : 'grey',
            supportNum: item.likeCount,
            content: item.content,
            _id: item._id
          }
        })
      })
      wx.hideLoading()
    })
  },
  fromatter(time) {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let sdate = ("0" + date.getDate()).slice(-2)
    let temp = `${year}-${month}-${sdate}`
    return temp;
  },
  tap(e) {
    console.log(e.currentTarget.dataset);
    let i = e.currentTarget.dataset.index
    let support = e.currentTarget.dataset.support
    let temp = this.data.comments[i]
    if (support == "grey") {
      temp.support = "red"
      temp.supportNum++
      wx.cloud.callFunction({
        name: "QA",
        data: {
          action: "likeComment",
          params: {
            // openId: "oQe4W4-OuD2451I0M_Em1JoQFeIo",
            commentId: e.currentTarget.dataset.id
          }
        }
      })
    } else {
      temp.support = "grey"
      temp.supportNum--
      wx.cloud.callFunction({
        name: "QA",
        data: {
          action: "unlikeComment",
          params: {
            // openId: "oQe4W4-OuD2451I0M_Em1JoQFeIo",
            commentId: e.currentTarget.dataset.id
          }
        }
      })
    }
    this.setData({
      [`comments[${i}].support`]: temp.support,
      [`comments[${i}].supportNum`]: temp.supportNum
    })
  },
  comment() {
    this.setData({
      showWriteCom: !this.data.showWriteCom
    })
  },
  agreeAnswer() {
    let temp = this.data.ansDetail
    if (temp.isLike == true) return
    temp.likeCount++;
    temp.isLike = true
    wx.cloud.callFunction({
      name: "QA",
      data: {
        action: "likeAnswer",
        params: {
          // openId: "oQe4W4-OuD2451I0M_Em1JoQFeIo",
          answerId: this.data.answerId
        }
      }
    }).then(res => {
      this.setData({
        ansDetail: temp
      })
    })
  },
  disagreeAnswer() {
    let temp = this.data.ansDetail
    if (temp.isLike == false) return
    temp.likeCount--;
    temp.isLike = false
    wx.cloud.callFunction({
      name: "QA",
      data: {
        action: "unlikeAnswer",
        params: {
          // openId: "oQe4W4-OuD2451I0M_Em1JoQFeIo",
          answerId: this.data.answerId
        }
      }
    }).then(res => {
      this.setData({
        ansDetail: temp
      })
    })
  },
  onInputWriteCom(e) {
    this.setData({
      writeCom: e.detail.value
    })
    console.log(this.data.writeCom);
  },
  cancel() {
    this.setData({
      showWriteCom: !this.data.showWriteCom,
      writeCom: ""
    })
  },
  post() {
    this.setData({
      showWriteCom: !this.data.showWriteCom,
    })
    wx.cloud.callFunction({
      name: "QA",
      data: {
        action: "makeComment",
        params: {
          // openId: "oQe4W4-OuD2451I0M_Em1JoQFeIo",
          answerId: this.data.answerId,
          content: this.data.writeCom
        }
      }
    }).then(res => {
      this.setData({
        writeCom: "",
      })
      this.getAnswerComments(true)
    })
  }
})