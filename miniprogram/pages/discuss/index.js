// pages/discuss/index.js
Page({

  data: {
    keyword: null,
    showPostQues: false,
    quesContent: "",
    questions: [],
    answeringIndex: "",
    myAnswerContent: "",
    showMyAnswerContent: false,
    animationData1: {},
    animationData2: {},
    animationturn: 0,
    hotAns: [],
    showSearch: false,
    historyList: ['你好', '我不好', '我一点都不好'],
    searchResult: [],
    showEmpty: false,
    showHistory: true,
    remind: false,
    recentAnswerCount: 0,
  },
  onLoad(options) {
    this.getHotQuestion(false)
    this.getWaitAnswerQuestion()
    this.setData({
      historyList: wx.getStorageSync('searchHistory') || []
    })
    this.getNotice()
    wx.cloud.callFunction({
      name: 'QA',
      data: {
        action: 'getAnswerIn24Hour'
      }
    }).then(res => {
      this.setData({
        recentAnswerCount: res.result.data
      })
    })
  },
  onShow(options) {
    this.animation = wx.createAnimation()
    this.getNotice()
  },
  getNotice() {
    let task = [
      wx.cloud.callFunction({
        name: 'QA',
        data: {
          action: 'getNoticeAnswerList'
        }
      }),
      wx.cloud.callFunction({
        name: 'QA',
        data: {
          action: 'getNoticeCommentList'
        }
      })
    ]
    Promise.all(task).then(res => {
      this.setData({
        remind: res[0].result.data.length + res[1].result.data.length > 0
      })
    })
  },
  onReachBottom() {
    // if (!this.data.showSearch) {
    //   this.getHotQuestion(false)
    // }
  },
  searchFocus() {
    this.setData({
      showSearch: true,
      showHistory: true,
      searchResult: []
    })
  },
  getWaitAnswerQuestion() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "QA",
      data: {
        action: "waitAnswerQuestion",
      }
    }).then(res => {
      this.setData({
        questions: res.result.data
      })
      wx.hideLoading()
    })
  },
  getHotQuestion(newQues) {
    if (this.data.questions.length % 10 != 0 && !newQues) return;
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "QA",
      data: {
        action: "hotQuestion",
        params: {
          limit: this.data.questions.length + 10
        }
      }
    }).then(res => {
      if (res.result.data.length === this.data.hotAns.length)
        wx.showToast({
          title: '没有更多问题了',
          icon: 'none'
        })
      this.setData({
        hotAns: res.result.data.map(item => Object.assign(item, { user: item.userId.substring(0, 5) }))
      })
      wx.hideLoading()
    })
  },
  searchInput(e) {
    this.setData({
      keyword: e.detail.value,
      searchResult: [],
      showEmpty: false,
      showHistory: true
    })
  },
  showPostQues() {
    this.setData({
      showPostQues: !this.data.showPostQues,
      quesContent: ''
    })
  },
  quesInput(e) {
    this.setData({
      quesContent: e.detail.value
    })
  },
  postQues() {
    if (this.data.quesContent) {
      wx.showLoading({
        title: '请稍等...',
      })
      this.setData({
        showPostQues: !this.data.showPostQues
      })
      wx.cloud.callFunction({
        name: "QA",
        data: {
          action: "makeQuestion",
          params: {
            // openId: "oQe4W4-OuD2451I0M_Em1JoQFeIo",
            title: this.data.quesContent,
            content: this.data.quesContent
          }
        }
      }).then(res => {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '提问成功，有人回答你的问题将会在右上角进行提醒'
        })
      })
    } else {
      this.setData({
        showPostQues: false
      })
    }

  },
  details(e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: `./details/index?questionId=${e.currentTarget.dataset.id}&answerId=${e.currentTarget.dataset.answerid}`
    })
  },
  nextQues() {
    this.animation.opacity(0).translateY(this.data.animationturn ? 0 : 20).scale(.9).opacity(1).step()
    this.setData({
      animationData1: this.animation.export()
    })
    this.animation.scale(1).translateY(this.data.animationturn ? 0 : -20).step()
    this.setData({
      animationData2: this.animation.export()
    })
    this.setData({
      animationturn: this.data.animationturn ^ 1
    })
    const questions = this.data.questions
    questions.push(questions.shift())
    this.setData({
      questions
    })
  },
  meToAns(e) {
    this.setData({
      showMyAnswerContent: !this.data.showMyAnswerContent,
      answeringIndex: e.currentTarget.dataset.index
    })
  },
  onInputMyAnswerContent(e) {
    this.setData({
      myAnswerContent: e.detail.value
    })
  },
  backMeAns() {
    this.setData({
      showMyAnswerContent: !this.data.showMyAnswerContent,
      myAnswerContent: ""
    })
  },
  affMeAns() {
    this.setData({
      showMyAnswerContent: !this.data.showMyAnswerContent,
    })
    wx.cloud.callFunction({
      name: "QA",
      data: {
        action: "makeAnswer",
        params: {
          // openId: "oQe4W4-OuD2451I0M_Em1JoQFeIo",
          questionId: this.data.questions[this.data.answeringIndex]._id,
          content: this.data.myAnswerContent
        }
      }
    }).then(res => {
      this.getWaitAnswerQuestion()
      this.setData({
        myAnswerContent: ""
      })
    })
  },
  search() {
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'QA',
      data: {
        action: 'searchQuestion',
        params: {
          keyword: this.data.keyword
        }
      }
    }).then(res => {
      // 处理搜索历史
      let historyList
      if (this.data.keyword) {
        historyList = wx.getStorageSync('searchHistory')
        if (!historyList) historyList = [this.data.keyword]
        else {
          const index = historyList.indexOf(this.data.keyword)
          if (index !== -1) historyList.splice(index, 1)
          historyList.unshift(this.data.keyword)
          if (historyList.length > 15) historyList = historyList.splice(0, 15)
        }
        wx.setStorageSync('searchHistory', historyList)
      }
      Promise.all(res.result.data.map(question => {
        return new Promise((resolve, reject) => {
          wx.cloud.callFunction({
            name: 'QA',
            data: {
              action: 'getQuestionAnswers',
              params: {
                questionId: question._id,
                limit: 2
              }
            }
          }).then(res1 => {
            resolve(Object.assign(question, { answer: res1.result.data.map(ans => Object.assign(ans, { user: ans.userId.substring(0, 5) })) }))
          })
        })
      })).then(list => {
        wx.hideLoading()
        this.setData({
          searchResult: list,
          showEmpty: res.result.data.length === 0,
          showHistory: false,
          historyList
        })
      })
    })
  },
  closeSearch() {
    this.setData({
      showSearch: false,
      showEmpty: false,
      keyword: null
    })
  },
  clickHistory(e) {
    this.setData({
      keyword: e.currentTarget.dataset.keyword
    })
    this.search()
  },
  gotoMore() {
    wx.navigateTo({
      url: '/pages/discuss/more/index',
    })
  },
  gotoAnswers(e) {
    wx.navigateTo({
      url: `/pages/discuss/answers/index?id=${e.currentTarget.dataset.id}`,
    })
  },
  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定清除搜索记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('searchHistory', [])
        }
        this.setData({
          historyList: []
        })
        wx.showToast({
          title: '清除成功',
        })
      }
    })
  },
  gotoRemind() {
    wx.navigateTo({
      url: '/pages/discuss/remind/index',
    })
  },
  gotoMyQues() {
    wx.navigateTo({
      url: '/pages/discuss/more/index?my=true',
    })
  }
})