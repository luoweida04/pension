// index.js
const App = getApp()

Page({
  data: {
    step: 0,
    navHeight: 0,
    bgUrl: [
      '/images/Background01.png',
      '/images/Background02.png',
      '/images/Background02.png',
      '/images/Background02.png',
      '/images/Background02.png',
      '/images/Background02.png',
      '/images/Background02.png',
      '/images/Background03.png',
      '/images/Background03.png',
      '/images/Background03.png',
      '/images/Background03.png',
    ],
    birthYear: new Date().getFullYear(),
    date: new Date().getTime(),
    minDate: new Date(1900, 0, 1).getTime(),
    maxDate: new Date(1990, 11, 31).getTime(),
    medicalHistory: [
      {
        aspect: '心血管系统',
        options: [
          {
            name: '心率失常',
            flag: false
          },
          {
            name: '慢性心力衰竭',
            flag: false
          },
          {
            name: '冠状动脉疾病',
            flag: false
          }
        ],
        selected: false
      },
      {
        aspect: '脑与神经系统',
        options: [
          {
            name: '癫痫',
            flag: false
          },
          {
            name: '老年痴呆症',
            flag: false
          },
          {
            name: '脑血管病',
            flag: false
          }
        ],
        selected: false
      },
      {
        aspect: '代谢内分泌系统',
        options: [
          {
            name: '甲状腺炎',
            flag: false
          },
          {
            name: '糖尿病',
            flag: false
          },
          {
            name: '脂肪肝',
            flag: false
          }
        ],
        selected: false
      },
      {
        aspect: '呼吸系统',
        options: [
          {
            name: '支气管炎',
            flag: false
          },
          {
            name: '扁桃体炎',
            flag: false
          },
          {
            name: '急性咽喉炎',
            flag: false
          }
        ],
        selected: false
      },
      {
        aspect: '皮肤系统',
        options: [
          {
            name: '湿疹',
            flag: false
          },
          {
            name: '过敏性皮炎',
            flag: false
          },
          {
            name: '荨麻疹',
            flag: false
          }
        ],
        selected: false
      },
      {
        aspect: '泌尿生殖系统',
        options: [
          {
            name: '输尿管炎',
            flag: false
          },
          {
            name: '膀胱结石',
            flag: false
          },
          {
            name: '前列腺增生',
            flag: false
          }
        ],
        selected: false
      },
      {
        aspect: '肌肉骨关节系统',
        options: [
          {
            name: '骨质疏松',
            flag: false
          },
          {
            name: '类风湿关节炎',
            flag: false
          },
          {
            name: '肩周炎',
            flag: false
          }
        ],
        selected: false
      },
      {
        aspect: '消化系统',
        options: [
          {
            name: '急性/慢性胃炎',
            flag: false
          },
          {
            name: '消化性溃疡',
            flag: false
          },
          {
            name: '胃食管反流',
            flag: false
          }
        ],
        selected: false
      }
    ],
    historyToChoose: {},
    age: 0,

    roleOptions: [
      '自己',
      '配偶',
      '父母',
      '祖父母',
      '朋友',
      '其他'
    ],
    genderOptions: [
      '女性',
      '男性'
    ],
    bloodOptions: [
      'A型',
      'B型',
      'O型',
      'AB型'
    ],
    jobOptions: [
      '管理层',
      '自由职业',
      '普通职工',
      '已退休'
    ],
    statusOptions: [
      '半失能失智',
      '认知症长者',
      '全失能失智长者'
    ],
    targetOptions: [
      '保持身体功能',
      '保持生命质量',
      '寿命延长'
    ],

    userInfo: {
      userName: '',
      relationship: '',
      birthday: new Date().getTime(),
      gender: 1,
      bloodType: '',
      occupation: '',
      status: '',
      medicalHistory: [],
      target: '',
      phoneNumber: '',
      retirementYear: 0,
      lifeExpectancy: 0
    },
    userId: '',

    roleIndex: -1,
    genderIndex: -1,
    bloodIndex: -1,
    jobIndex: -1,
    statusIndex: -1,
    historyIndex: -1,
    targetIndex: -1,

    show: false,
    showOtherHistoryDialog: false,
    otherHistory: '',
    showOtherTargetDialog: false,
    otherTarget: '',
    showPhoneDialog: false,
    phone: '',
    add: false,
    // 重新编辑用户信息
    reTest: 0,
    // 重新预测寿命
    preview: 0
  },

  onLoad(options) {
    console.log(options);
    this.setData({
      reTest: options.reTest,
      preview: options.preview
    })
    if (options.reTest) {
      // 重新编辑用户信息，跳转至第一步，并存储userId用于调用编辑用户信息接口
      this.setData({
        'userInfo.userName': options.username,
        userId: options.userId,
        step: 1
      })
    } else if (options.preview) {
      // 重新预测寿命，跳转至第二步
      this.setData({
        step: 2
      })
    } else if (this.options.add) {
      // 添加家庭成员
      this.setData({
        add: true,
        step: 1,
        'userInfo.userName': wx.getStorageSync('userInfo').userName
      })
    } else {
      if (wx.getStorageSync('userInfo') && options.noToHome != 1 && options.reTest != 1) {
        wx.showLoading({
          title: '请求登录信息...',
        })
        setTimeout(() => {
          wx.hideLoading()
          wx.switchTab({
            url: '/pages/home/index',
          })
        }, 1500);
      }
    }
  },

  onShow() {
    this.setData({
      navHeight: App.globalData.navHeight
    })
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
      age: new Date().getFullYear() - new Date(event.detail).getFullYear(),
      'userInfo.birthday': event.detail,
      birthYear: new Date(event.detail).getFullYear()
    })
  },

  onChangeName(event) {
    this.setData({
      'userInfo.userName': event.detail.value
    })
  },

  beginNow() {
    if (!this.data.userInfo.userName) {
      wx.showToast({
        title: '请先填写姓名',
        icon: 'none'
      })
    } else {
      this.setData({
        step: 1
      })
    }
  },

  backCB() {
    // if(this.data.step==9)
    if ((this.data.add || this.data.preview || this.data.reTest) && this.data.step === 1) {
      console.log("back1");
      wx.navigateBack()
      return
    }
    this.setData({
      step: this.data.step - 1
    })
  },

  next() {
    // 重新预测寿命流程结束
    if (this.data.preview && this.data.step === 9) {
      wx.navigateBack()
      console.log("back2");
      return
    }
    if (this.data.step === 7) {
      const list = this.data.medicalHistory.reduce((prev, cur) => {
        prev.push(...cur.options.filter(option => option.flag).map(option => option.name))
        return prev
      }, [])
      if (list.length === 0) {
        wx.showModal({
          title: '提示',
          content: '未填写被照护人的病史，是否下一步？',
          showCancel: true,
          success: res => {
            if (res.confirm) {
              this.setData({
                'userInfo.medicalHistory': list,
                step: 8
              })
            }
          }
        })
      } else {
        this.setData({
          'userInfo.medicalHistory': list,
          step: 8
        })
      }
      if (this.data.userInfo.occupation === 'retired') {
        this.setData({
          'userInfo.retirementYear': 0
        })
      } else {
        wx.cloud.callFunction({
          name: 'user',
          data: {
            action: 'retirementPlan',
            params: {
              yearOfBirth: new Date(this.data.userInfo.birthday).getFullYear(),
              type: ['female', 'male'][this.data.userInfo.gender] + (this.data.userInfo.gender === 0 ? (this.data.userInfo.occupation === 'labor' ? '-normal' : '-manager') : '')
            }
          }
        }).then(res => {
          this.setData({
            'userInfo.retirementYear': res.result.data ? res.result.data : 0
          })
        })
      }
      wx.cloud.callFunction({
        name: 'user',
        data: {
          action: 'lifeExpectancy',
          params: {
            age: this.data.age,
            gender: ['female', 'male'][this.data.userInfo.gender],
            diseaseCount: this.data.userInfo.medicalHistory.length
          }
        }
      }).then(res => {
        console.log("medicalHistory", this.data.userInfo.medicalHistory);
        this.setData({
          'userInfo.lifeExpectancy': Math.round(this.data.age + +res.result.data)
        })
      })
      return
    }
    switch (this.data.step) {
      case 1:
        if (this.data.roleIndex < 0) {
          wx.showToast({
            title: '请选择照顾的对象',
            icon: 'none'
          })
          return
        }
        break
      case 3:
        if (this.data.genderIndex < 0) {
          wx.showToast({
            title: '请选择被照护人的性别',
            icon: 'none'
          })
          return
        }
        break
      case 4:
        if (this.data.bloodIndex < 0) {
          wx.showToast({
            title: '请选择被照护人的血型',
            icon: 'none'
          })
          return
        }
        break
      case 5:
        if (this.data.jobIndex < 0) {
          wx.showToast({
            title: '请选择被照护人的职业',
            icon: 'none'
          })
          return
        }
        break
      case 6:
        if (this.data.statusIndex < 0) {
          wx.showToast({
            title: '请选择被照护人的实际状态',
            icon: 'none'
          })
          return
        }
        break
      case 8:
        if (this.data.targetIndex < 0) {
          wx.showToast({
            title: '请选择您的目标',
            icon: 'none'
          })
          return
        }
        break
    }

    this.setData({
      step: this.data.step >= 10 ? 10 : ++this.data.step
    })
  },

  chooseRole(e) {
    const index = e.target.dataset.index
    this.setData({
      roleIndex: index,
      'userInfo.relationship': this.data.roleOptions[index]
    })
  },

  chooseGender(e) {
    this.setData({
      genderIndex: e.target.dataset.index,
      'userInfo.gender': e.target.dataset.index
    })
  },

  chooseBlood(e) {
    this.setData({
      bloodIndex: e.target.dataset.index,
      'userInfo.bloodType': ['A', 'B', 'O', 'AB', 'else'][e.target.dataset.index]
    })
  },

  chooseJob(e) {
    this.setData({
      jobIndex: e.target.dataset.index,
      'userInfo.occupation': ['manager', 'free', 'labor', 'retired'][e.target.dataset.index]
    })
  },

  chooseStatus(e) {
    this.setData({
      statusIndex: e.target.dataset.index,
      'userInfo.status': ['active', 'halfActive', 'smartless', 'nothing'][e.target.dataset.index]
    })
  },

  chooseTarget(e) {
    const index = e.target.dataset.index
    this.setData({
      targetIndex: index,
      'userInfo.target': this.data.targetOptions[index]
    })
  },

  openPopup(e) {
    this.setData({
      show: true,
      historyToChoose: JSON.parse(JSON.stringify(this.data.medicalHistory[e.target.dataset.index])),
      historyIndex: e.target.dataset.index
    })
  },

  onClose() {
    this.setData({
      show: false
    })
  },

  chooseHistory(e) {
    const index = e.target.dataset.index
    const historyToChoose = this.data.historyToChoose
    const flag = historyToChoose.options[index].flag
    historyToChoose.options[index].flag = !flag
    this.setData({
      historyToChoose
    })
  },

  confirmHistory() {
    const historyIndex = this.data.historyIndex
    const medicalHistory = this.data.medicalHistory
    medicalHistory[historyIndex] = this.data.historyToChoose
    medicalHistory[historyIndex].selected = medicalHistory[historyIndex].options.some(opt => opt.flag)
    this.setData({
      medicalHistory,
      show: false
    })
  },

  cancelHistory() {
    this.setData({
      show: false
    })
  },

  showOtherHistoryDialog() {
    this.setData({
      showOtherHistoryDialog: true,
      otherHistory: ''
    })
    this.confirmHistory()
  },

  onCloseOtherHistoryDialog() {
    this.setData({
      showOtherHistoryDialog: false
    })
  },

  onInputOtherHistory(event) {
    this.setData({
      otherHistory: event.detail.value
    })
  },

  confirmOtherHistory() {
    if (!this.data.otherHistory) {
      wx.showToast({
        title: '未检测到任何输入',
        icon: 'none'
      })
      return
    }
    const medicalHistory = this.data.medicalHistory
    medicalHistory[this.data.historyIndex].options.push({
      name: this.data.otherHistory,
      flag: false
    })
    this.setData({
      medicalHistory,
      showOtherHistoryDialog: false,
    })
    this.openPopup({
      target: {
        dataset: {
          index: this.data.historyIndex
        }
      }
    })
  },

  cancelOtherHistory() {
    this.openPopup({
      target: {
        dataset: {
          index: this.data.historyIndex
        }
      }
    })
  },

  showOtherTargetDialog() {
    this.setData({
      showOtherTargetDialog: true,
      otherTarget: ''
    })
  },

  onCloseOtherTargetDialog() {
    this.setData({
      showOtherTargetDialog: false
    })
  },

  onInputOtherTarget(event) {
    this.setData({
      otherTarget: event.detail.value
    })
  },

  confirmOtherTarget() {
    const targetOptions = this.data.targetOptions
    targetOptions.push(this.data.otherTarget)
    this.setData({
      targetOptions,
      showOtherTargetDialog: false
    })
  },

  showPhoneDialog() {
    this.setData({
      showPhoneDialog: true,
      phone: ''
    })
  },

  onClosePhoneDialog() {
    this.setData({
      showPhoneDialog: false
    })
  },

  onInputPhone(event) {
    this.setData({
      phone: event.detail.value
    })
  },

  confirmPhone() {
    const reg = /^1[3456789]\d{9}$/;
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none'
      })
      return
    }
    this.setData({
      'userInfo.phoneNumber': this.data.phone
    })
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'register',
        params: {
          data: this.data.userInfo
        }
      }
    }).then(res => {
      if (res.result.ok) {
        wx.showToast({
          title: '创建成功！',
        })
        wx.setStorageSync('userInfo', Object.assign(this.data.userInfo, { _id: res.result.data.userId }))
        wx.cloud.callFunction({
          name: 'user',
          data: {
            action: 'login'
          }
        }).then(res => {
          wx.setStorageSync('userList', res.result.data.detail)
          wx.switchTab({
            url: '/pages/home/index',
          })
        })
      } else {
        wx.showToast({
          title: res.result.msg,
          icon: 'error'
        })
      }
    })
  },

  login() {
    wx.getUserProfile({
      desc: '用于展示头像和昵称',
      success: res => {
        wx.showModal({
          title: '提示',
          content: '申请获取您的基本个人信息',
          success: (r) => {
            if (r.confirm) {
              console.log(res.userInfo);
              wx.showLoading({
                title: '请稍等...',
              })
              wx.cloud.callFunction({
                name: 'user',
                data: {
                  action: 'login'
                }
              }).then(res => {
                console.log(res);
                if (res.result.data.requireRegister) {
                  wx.showToast({
                    title: '该微信未检测到账号',
                    icon: 'none'
                  })
                } else {
                  wx.setStorageSync('userInfo', res.result.data.detail[0])
                  wx.setStorageSync('userList', res.result.data.detail)
                  wx.switchTab({
                    url: '/pages/home/index',
                  })
                }
              }).finally(() => {
                wx.hideLoading()
              })
            }
          }
        })
      }
    })
  },

  WXRegister() {
    wx.getUserProfile({
      desc: '用于展示头像和昵称',
      success: res => {
        wx.showModal({
          title: '提示',
          content: '申请获取您的基本个人信息',
          success: (r) => {
            if (r.confirm) {
              wx.showLoading({
                title: '请稍等...',
              })
              wx.cloud.callFunction({
                name: 'user',
                data: {
                  action: 'register',
                  params: {
                    data: this.data.userInfo
                  }
                }
              }).then(res => {
                if (res.result.ok) {
                  wx.showToast({
                    title: '创建成功！',
                  })
                  wx.setStorageSync('userInfo', Object.assign(this.data.userInfo, { _id: res.result.data.userId }))
                  wx.cloud.callFunction({
                    name: 'user',
                    data: {
                      action: 'login'
                    }
                  }).then(res => {
                    wx.setStorageSync('userList', res.result.data.detail)
                    wx.switchTab({
                      url: '/pages/home/index',
                    })
                  })
                } else {
                  wx.showToast({
                    title: res.result.msg,
                    icon: 'error'
                  })
                }
              })
            }
          }
        })
      }
    })
  },

  confirmAddRole() {
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'register',
        params: {
          data: this.data.userInfo
        }
      }
    }).then(res => {
      if (res.result.ok) {
        wx.showToast({
          title: '添加成功！',
        })
        wx.setStorageSync('userInfo', Object.assign(this.data.userInfo, { _id: res.result.data.userId }))
        wx.cloud.callFunction({
          name: 'user',
          data: {
            action: 'login'
          }
        }).then(res => {
          wx.hideLoading()
          wx.setStorageSync('userList', res.result.data.detail)
          wx.navigateBack()
          console.log("back3");
        })
      } else {
        wx.showToast({
          title: res.result.msg,
          icon: 'error'
        })
      }
    })
  },
  completeRetest() {
    // TODO: 将用户新信息添加   setStorageSync('userInfo', ......)
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'update',
        params: {
          data: this.data.userInfo,
          userId: this.data.userId
        }
      }
    }).then(res => {
      wx.cloud.callFunction({
        name: 'user',
        data: {
          action: 'login'
        }
      }).then(res1 => {
        wx.setStorageSync('userList', res1.result.data.detail)
        let index = res1.result.data.detail.findIndex(item => item._id === this.data.userId)
        wx.setStorageSync('userInfo', res1.result.data.detail[index])
        wx.showToast({
          title: '更新成功',
        })
        wx.navigateTo({
          url: '/pages/my/edit/index',
        })
      })
    })

  }
});
