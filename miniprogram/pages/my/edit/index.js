// pages/my/edit/index.js
const { formatter } = require('../../../utils/core')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userList: [],
    userName: '',
    inputName: false,
    nameFocus: false,
    editDetail: false,
    editIndex: 0,
    minDate: new Date(1900, 0, 1).getTime(),
    maxDate: new Date(1990, 11, 31).getTime(),
    birthYear: 0,
    showBirthday: false,
    showGender: false,
    showBlood: false,
    showJob: false,
    showStatus: false,
    genderOptions: ['女', '男', '其他'],
    bloodOptions: ['A', 'B', 'O', 'AB', '其他'],
    jobMap: {
      manager: '管理层',
      free: '自由职业',
      labor: '普通职工',
      retired: '已退休'
    },
    statusMap: {
      active: '活力人士',
      halfActive: '半失能',
      smartless: '认知症',
      nothing: '全失能失智'
    },
    jobOptions: [],
    statusOptions: [],
  },

  onLoad(options) {
    let userList = wx.getStorageSync('userList')
    userList.forEach(item => {
      item.birth = formatter(item.birthday),
        item.birthYear = new Date(item.birthday).getFullYear()
    })
    this.setData({
      userName: userList[0].userName,
      userList,
      userInfo: wx.getStorageSync('userInfo'),
      jobOptions: Object.values(this.data.jobMap),
      statusOptions: Object.values(this.data.statusMap),
    })
  },

  onShow() {
    let userList = wx.getStorageSync('userList')
    userList.forEach(item => {
      item.birth = formatter(item.birthday),
        item.birthYear = new Date(item.birthday).getFullYear()
    })
    this.setData({
      userName: userList[0].userName,
      userList,
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  async calculeteRetirement(index) {
    wx.showLoading({
      title: '重新进行预测...',
    })
    let userList = this.data.userList


  },

  editName() {
    this.setData({
      inputName: true,
      nameFocus: true
    })
  },
  submitName() {
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'updateUsername',
        params: {
          userName: this.data.userName
        }
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '修改成功'
      })
      this.setData({
        inputName: false
      })
      wx.cloud.callFunction({
        name: 'user',
        data: {
          action: 'login'
        }
      }).then(res => {
        wx.setStorageSync('userInfo', res.result.data.detail[this.data.editIndex])
        wx.setStorageSync('userList', res.result.data.detail)
      })
    })
  },

  onChangeName(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  editDetail(e) {
    // this.setData({
    //   editDetail: true,
    //   editIndex: e.currentTarget.dataset.index
    // })
    wx.navigateTo({
      url: `/pages/index/index?reTest=${1}&username=${this.data.userName}&userId=${e.currentTarget.dataset.id}`,
    })
  },

  // submitDetail(e) {
  //   wx.showLoading({
  //     title: '请稍等...',
  //   })
  //   let index = this.data.editIndex
  //   let userList = this.data.userList

  //   // 重新预测寿命
  //   wx.cloud.callFunction({
  //     name: 'user',
  //     data: {
  //       action: 'lifeExpectancy',
  //       params: {
  //         age: new Date().getFullYear() - new Date(userList[index].birthday).getFullYear(),
  //         gender: ['female', 'male'][userList[index].gender],
  //         diseaseCount: userList[index].medicalHistory.length
  //       }
  //     }
  //   }).then(res => {
  //     // 重新预测退休年龄
  //     if (userList[index].occupation === 'retired') {
  //       userList[index].lifeExpectancy = Math.round(new Date().getFullYear() - new Date(userList[index].birthday).getFullYear() + +res.result.data)
  //       userList[index].retirementYear = 0
  //       this.setData({
  //         userList
  //       })
  //     } else {
  //       wx.cloud.callFunction({
  //         name: 'user',
  //         data: {
  //           action: 'retirementPlan',
  //           params: {
  //             yearOfBirth: new Date(userList[index].birthday).getFullYear(),
  //             type: ['female', 'male'][userList[index].gender] + (userList[index].gender === 0 ? (userList[index].occupation === 'labor' ? '-normal' : '-manager') : '')
  //           }
  //         }
  //       }).then(res1 => {
  //         userList[index].lifeExpectancy = Math.round(new Date().getFullYear() - new Date(userList[index].birthday).getFullYear() + +res.result.data)
  //         userList[index].retirementYear = res1.result.data ? res1.result.data : 0
  //         // 更新数据
  //         wx.cloud.callFunction({
  //           name: 'user',
  //           data: {
  //             action: 'update',
  //             params: {
  //               data: userList[index],
  //               userId: e.currentTarget.dataset.id
  //             }
  //           }
  //         }).then(res => {
  //           wx.hideLoading()
  //           wx.showToast({
  //             title: '修改成功',
  //           })
  //           this.setData({
  //             editDetail: false,
  //             userList
  //           })
  //           if (e.currentTarget.dataset.id === this.data.userInfo._id) {
  //             wx.setStorageSync('userInfo', userList[index])
  //           }
  //           wx.cloud.callFunction({
  //             name: 'user',
  //             data: {
  //               action: 'login'
  //             }
  //           }).then(res => {
  //             wx.setStorageSync('userList', res.result.data.detail)
  //           })
  //         })
  //       })
  //     }
  //   })
  // },

  showBirthday() {
    this.setData({
      showBirthday: true
    })
  },

  onCloseBirthday() {
    this.setData({
      showBirthday: false
    })
  },

  confirmBirthday(value) {
    let userList = this.data.userList
    userList[this.data.editIndex].birthday = value.detail
    userList[this.data.editIndex].birth = formatter(value.detail)
    this.setData({
      userList,
      showBirthday: false
    })
  },

  showGender() {
    if (this.data.editDetail) {
      this.setData({
        showGender: true
      })
    }
  },

  onChangeGender(e) {
    let userList = this.data.userList
    userList[this.data.editIndex].gender = e.detail.index
    this.setData({
      userList,
      showGender: false
    })
  },

  onCloseGender() {
    this.setData({
      showGender: false
    })
  },

  showBlood() {
    if (this.data.editDetail) {
      this.setData({
        showBlood: true
      })
    }
  },

  onChangeBlood(e) {
    let userList = this.data.userList
    userList[this.data.editIndex].bloodType = e.detail.value
    this.setData({
      userList,
      showBlood: false
    })
  },

  onCloseBlood() {
    this.setData({
      showBlood: false
    })
  },

  showJob() {
    if (this.data.editDetail) {
      this.setData({
        showJob: true
      })
    }
  },

  onChangeJob(e) {
    let userList = this.data.userList
    userList[this.data.editIndex].occupation = Object.keys(this.data.jobMap)[e.detail.index]
    this.setData({
      userList,
      showJob: false
    })
  },

  onCloseJob() {
    this.setData({
      showJob: false
    })
  },

  showStatus() {
    if (this.data.editDetail) {
      this.setData({
        showStatus: true
      })
    }
  },

  onChangeStatus(e) {
    let userList = this.data.userList
    userList[this.data.editIndex].status = Object.keys(this.data.statusMap)[e.detail.index]
    this.setData({
      userList,
      showStatus: false
    })
  },

  onCloseStatus() {
    this.setData({
      showStatus: false
    })
  },

  changeRole(e) {
    let user = this.data.userList[e.currentTarget.dataset.index]
    this.setData({
      userInfo: user
    })
    wx.setStorageSync('userInfo', user)
    wx.showToast({
      title: '切换成功',
    })
  },

  gotoAddRole() {
    wx.navigateTo({
      url: `/pages/index/index?add=${false}`,
    })
  }

})