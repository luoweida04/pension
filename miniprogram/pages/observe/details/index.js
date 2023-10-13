// pages/observe/details/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    title: '',
    foodContent: "",
    sleepQuality: '',
    micturitionContent: [],
    micturitionNewRec: "",
    bloodStress: [{
      item: "收缩压",
      value: null
    }, {
      item: "舒张压",
      value: null
    }],
    bloodOxygen: undefined,
    heartRate: undefined,
    tempeature: undefined,
    bloodSuger: undefined,
    show: false,
    date: "",
    curDate: new Date().getTime(),
    showDatePicker: false,
    datePickerTime: new Date().getTime(),
    userInfo: {},
    deleting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      id: options.id,
      title: options.title,
      date: this.fromatter(parseInt(options.currentDate)),
      userInfo: wx.getStorageSync('userInfo'),
      curDate: parseInt(options.currentDate),
      datePickerTime: parseInt(options.currentDate)
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
    this.getTodayRecord();
  },
  getTodayRecord(){
    wx.cloud.callFunction({
      name: "record",
      data: {
        action: "get",
        params: {
          dateString: this.data.date,
          userId: this.data.userInfo._id
        }
      }
    }).then(res => {
      console.log("recordGet", res);
      this.setData({
        foodContent: res.result.data.foodContent == undefined ? "" : res.result.data.foodContent,
        micturitionContent: res.result.data.micturitionContent == undefined ? [] : res.result.data.micturitionContent,
        bloodStress: res.result.data.bloodStress == undefined ? this.data.bloodStress : res.result.data.bloodStress,
        bloodOxygen: res.result.data.bloodOxygen == undefined ? 0 : res.result.data.bloodOxygen,
        heartRate: res.result.data.heartRate == undefined ? 0 : res.result.data.heartRate,
        tempeature: res.result.data.tempeature == undefined ? 0 : res.result.data.tempeature,
        bloodSuger: res.result.data.bloodSuger == undefined ? 0 : res.result.data.bloodSuger,
        sleepQuality: res.result.data.sleepQuality == undefined ? "" : res.result.data.sleepQuality
      })
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
  pickDate() {
    this.setData({
      showDatePicker: !this.data.showDatePicker
    })
  },
  comfirmDate() {
    this.setData({
      showDatePicker: false,
      date: this.fromatter(this.data.datePickerTime),
      curDate: this.data.datePickerTime
    })
    this.getTodayRecord();
  },
  cancelDate() {
    this.setData({
      showDatePicker: false,
      date: this.fromatter(new Date().getTime())
    })
  },
  onInput(e) {
    this.setData({
      datePickerTime: e.detail
    })
  },
  inputFood(e) {
    this.setData({
      foodContent: e.detail.value
    })
  },
  newRecord() {
    console.log('点击');
    this.setData({
      show: true
    });
  },
  bindTextareaInput(e) {
    this.setData({
      micturitionNewRec: e.detail.value
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onConfirm() {
    var date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let t = `${hours >= 10 ? hours : '0' + hours.toString()}:${minutes >= 10 ? minutes : '0' + minutes.toString()}:${seconds >= 10 ? seconds : '0' + seconds.toString()}`
    let temp = this.data.micturitionContent
    temp.push({
      value: this.data.micturitionNewRec,
      time: t
    })
    this.setData({
      micturitionContent: temp,
      micturitionNewRec: ""
    })
  },
  inputBloodStress(e) {
    let temp = this.data.bloodStress
    temp[e.currentTarget.dataset.i].value = e.detail.value
    this.setData({
      bloodStress: temp
    })
  },
  inputBloodOxygen(e) {
    this.setData({
      bloodOxygen: e.detail.value
    })
  },
  inputHeartRate(e) {
    this.setData({
      heartRate: e.detail.value
    })
  },
  inputTemp(e) {
    this.setData({
      tempeature: e.detail.value
    })
  },
  inputBloodSuger(e) {
    this.setData({
      bloodSuger: e.detail.value
    })
  },
  inputSleep(e) {
    this.setData({
      sleepQuality: e.detail.value
    })
  },
  clickEdit(){
    this.setData({
      deleting: true
    })
  },
  editFinish(){
    this.setData({
      deleting: false
    })
  },
  delete(e) {
    let list = this.data.micturitionContent
    wx.showModal({
      title: '提示',
      content: '确定删除本条记录吗？',
      success: res => {
        if (res.confirm) {
          list.splice(e.currentTarget.dataset.index, 1)
          this.setData({
            micturitionContent: list
          })
          wx.showToast({
            title: '删除成功'
          })
        }
      }
    })

  },
  cancel() {
    wx.navigateBack();
  },
  affirm() {
    let re = {
      foodContent: this.data.foodContent,
      micturitionContent: this.data.micturitionContent,
      bloodStress: this.data.bloodStress,
      bloodOxygen: this.data.bloodOxygen,
      heartRate: this.data.heartRate,
      tempeature: this.data.tempeature,
      bloodSuger: this.data.bloodSuger,
      sleepQuality: this.data.sleepQuality
    }
    wx.showLoading({
      title: '请稍等...'
    })
    wx.cloud.callFunction({
      name: "record",
      data: {
        action: "add",
        params: {
          key: this.data.id,
          record: re,
          dateString: this.data.date,
          userId: this.data.userInfo._id
        }
      }
    }).then(res => {
      wx.showToast({
        title: '填报成功'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/observe/index'
        })
      }, 1000)
    })
  }
})