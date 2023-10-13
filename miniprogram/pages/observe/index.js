// pages/observe/index.js
import * as echarts from '../../ec-canvas/echarts';

import {
  formatter
} from '../../utils/core'

const Day = new Date().getDay()
const DayList = ['日', '一', '二', '三', '四', '五', '六']
const XAxisList = [].concat(DayList.slice(Day + 1), DayList.splice(0, Day + 1))
// mock数据


// echarts中展示的数据
// 收缩压
let bloodStolicStressWeekData
// 舒张压
let bloodDiastolicStressWeekData
let tempeatureWeekData
let heartRateWeekData
let bloodOxygenWeekData
let bloodSugerWeekData
let micturitionWeekData

const option = {
  xAxis: {
    name: '星期',
    type: 'category',
    axisTick: {
      show: false
    },
    data: XAxisList,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#D0D0D0',
        fontSize: '14'
      }
    },
    nameTextStyle: {
      color: '#D0D0D0',
      fontSize: 14
    },
  },
  grid: {
    right: '16%',
    bottom: '15%'
  },
}

// 按顺序：血压、体温、心率、血氧、血糖、排泄/排遗
function initChart1(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  chart.setOption(Object.assign({}, option, {
    yAxis: {
      name: 'mmHg',
      type: 'value',
      min: Math.min(...bloodStolicStressWeekData, ...bloodDiastolicStressWeekData) - 20,
      max: Math.max(...bloodStolicStressWeekData, ...bloodDiastolicStressWeekData) + 20,
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      interval: 20,
      axisLabel: {
        show: true,
        textStyle: {
          color: '#D0D0D0',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: '#D0D0D0',
        fontSize: 14
      },
    },
    legend: {
      top: '10px',
      right: '20px',
      orient: 'vertical',
      itemHeight: 3,
      itemWidth: 50,
      data: [{
        name: '收缩压',
        itemStyle: { //图例项的图形样式
          color: '#74C3A4',
        },
        textStyle: {
          color: "#74C3A4"
        }
      }, {
        name: '舒张压',
        itemStyle: { //图例项的图形样式
          color: '#FFAEAE',
        },
        textStyle: {
          color: "#FFAEAE"
        }
      }],
      icon: 'rect'
    },
    series: [{
      name: "收缩压",
      data: bloodStolicStressWeekData,
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      color: '#74C3A4'
    },
    {
      name: "舒张压",
      data: bloodDiastolicStressWeekData,
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      color: '#FFAEAE'
    }
    ]
  }));
  return chart;
}

function initChart2(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  chart.setOption(Object.assign({}, option, {
    yAxis: {
      name: '℃',
      type: 'value',
      min: Math.min(...tempeatureWeekData) - 2,
      max: Math.max(...tempeatureWeekData) + 2,
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#D0D0D0',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: '#D0D0D0',
        fontSize: 14
      },
    },
    series: [{
      data: tempeatureWeekData,
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      color: '#74C3A4'
    }]
  }));
  return chart;
}

function initChart3(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  chart.setOption(Object.assign({}, option, {
    yAxis: {
      name: '次/分钟',
      type: 'value',
      min: Math.min(...heartRateWeekData) - 16,
      max: Math.max(...heartRateWeekData) + 16,
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#D0D0D0',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: '#D0D0D0',
        fontSize: 14
      },
    },
    series: [{
      data: heartRateWeekData,
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      color: '#74C3A4'
    }]
  }));
  return chart;
}

function initChart4(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  chart.setOption(Object.assign({}, option, {
    yAxis: {
      name: '%',
      type: 'value',
      min: Math.min(...bloodOxygenWeekData) - 2,
      max: Math.max(...bloodOxygenWeekData) + 2,
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#D0D0D0',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: '#D0D0D0',
        fontSize: 14
      },
    },
    series: [{
      data: bloodOxygenWeekData,
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      color: '#74C3A4'
    }]
  }));
  return chart;
}

function initChart5(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  chart.setOption(Object.assign({}, option, {
    yAxis: {
      name: 'mmol/L',
      type: 'value',
      min: Math.min(...bloodSugerWeekData) - 2,
      max: Math.max(...bloodSugerWeekData) + 2,
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#D0D0D0',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: '#D0D0D0',
        fontSize: 14
      },
    },
    series: [{
      data: bloodSugerWeekData,
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      color: '#74C3A4'
    }]
  }));
  return chart;
}

function initChart6(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  chart.setOption(Object.assign({}, option, {
    yAxis: {
      name: 'mmol/L',
      type: 'value',
      min: 0,
      max: Math.max(...micturitionWeekData) + 2,
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#D0D0D0',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: '#D0D0D0',
        fontSize: 14
      },
    },
    series: [{
      data: micturitionWeekData,
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      color: '#74C3A4'
    }]
  }));
  return chart;
}
Page({

  data: {
    showDatePicker: false,
    month: "",
    allDates: [],
    formatDate: "2023年04月",
    otherFormatDate: "",
    left: 0, //滑动日期的位置,
    count: 0, // 滑动窗口,防止滑动过快，
    middleDate: 3, // 中间日期
    sdate: 1, //日
    totalSlideChange: 0,
    currentDate: new Date().getTime(),
    intervalVal: Object,
    time: 0,
    touchDot: 0,
    faceList: [
      [1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ],
    details: [{
      title: "饮食状况",
      imgPlus: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_Food_Plus@3x.png",
      imgBg: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_Food@3x.png",
      content: "午饭吃了蔬菜，饭后水果吃了香蕉和苹果。",
      unit: "" // 单位
    },
    {
      title: "大小便",
      imgPlus: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_Micturition_Plus@3x.png",
      imgBg: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_Micturition@3x.png",
      content: "2",
      unit: "次"
    },
    {
      title: "血压",
      imgPlus: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_BloodStress_Plus@3x.png",
      imgBg: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_BloodStress@3x.png",
      content: "140/90",
      unit: "mmHg"
    },
    {
      title: "血氧",
      imgPlus: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_BloodOxygen_Plus@3x.png",
      imgBg: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_BloodOxygen@3x.png",
      content: "90",
      unit: "%"
    },
    {
      title: "心率",
      imgPlus: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_HeartRate_Plus@3x.png",
      imgBg: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_HeartRate@3x.png",
      content: "100",
      unit: "次/分钟"
    },
    {
      title: "体温",
      imgPlus: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_Temp_Plus@3x.png",
      imgBg: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_Temp@3x.png",
      content: "37",
      unit: "℃"
    },
    {
      title: "血糖",
      imgPlus: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_Sugr_Plus@3x.png",
      imgBg: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_Sugar@3x.png",
      content: "暂无数据",
      unit: "mmol/L"
    },
    {
      title: '睡眠质量',
      imgPlus: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_Temp_Plus@3x.png",
      imgBg: "cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Program_Temp@3x.png",
      content: '暂无数据',
      unit: ''
    }
    ],
    twoTitle: '今日数据',
    ec: {
      onInit: initChart1
    },
    ec2: {
      onInit: initChart2
    },
    ec3: {
      onInit: initChart3
    },
    ec4: {
      onInit: initChart4
    },
    ec5: {
      onInit: initChart5
    },
    ec6: {
      onInit: initChart6
    },
    score: {},
    selectedDate: formatter(new Date().getTime()),
    userInfo: {},
    // datePickerData: {},
    datePickerTime: new Date().getTime()
  },

  onLoad(options) {
    console.log("照护onLoad");
    let d = formatter(new Date().getTime())
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    // this.getTodayData(d)
    this.getWeekData()
    // this.getScore(d)
    this.comfirmDate()
  },

  getScore(time) {
    wx.cloud.callFunction({
      name: 'score',
      data: {
        action: 'get',
        params: {
          dateString: time,
          userId: this.data.userInfo._id
        }
      }
    }).then(res => {
      this.setData({
        score: res.result.data
      })
    })
  },

  onShow() {
    console.log("照护onShow");
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    this.getTodayData(this.data.selectedDate)
    this.getScore(this.data.selectedDate)
  },
  getWeekData() {
    const now = new Date()
    wx.cloud.callFunction({
      name: 'record',
      data: {
        action: 'batchGet',
        params: {
          startDateString: formatter(new Date(now.getTime() - 3600 * 24 * 6 * 1000)),
          endDateString: formatter(now),
          userId: this.data.userInfo._id
        }
      }
    }).then(res => {
      // this.setData({
      //   bloodStolicStressWeekData: res.result.data.map(item => item.bloodStress ? item.bloodStress[0].value : 50),
      //   bloodDiastolicStressWeekData: res.result.data.map(item => item.bloodStress ? item.bloodStress[1].value : 50),
      //   tempeatureWeekData: res.result.data.map(item => item.tempeature || 36),
      //   heartRateWeekData: res.result.data.map(item => item.heartRate || 95),
      //   bloodOxygenWeekData: res.result.data.map(item => item.bloodOxygen || 95),
      //   bloodSugerWeekData: res.result.data.map(item => item.bloodSuger || 4),
      //   micturitionWeekData: res.result.data.map(item => item.micturitionContent ? item.micturitionContent.length : 0)
      // })
      bloodStolicStressWeekData = res.result.data.map(item => item.bloodStress ? item.bloodStress[0].value : Math.round(Math.random() * (74) + 11))
      bloodDiastolicStressWeekData = res.result.data.map(item => item.bloodStress ? item.bloodStress[1].value : Math.round(Math.random() * (74) + 11))
      tempeatureWeekData = res.result.data.map(item => item.tempeature || Math.round(Math.random() * (6) + 33))
      heartRateWeekData = res.result.data.map(item => item.heartRate || Math.round(Math.random() * (40) + 80))
      bloodOxygenWeekData = res.result.data.map(item => item.bloodOxygen || Math.round(Math.random() * (7) + 91))
      bloodSugerWeekData = res.result.data.map(item => item.bloodSuger || Math.round(Math.random() * (6) + 1))
      micturitionWeekData = res.result.data.map(item => item.micturitionContent ? item.micturitionContent.length : Math.round(Math.random() * 4))
    })
  },
  getTodayData(d) {
    wx.showLoading({
      title: '获取数据中...',
    })
    wx.cloud.callFunction({
      name: "record",
      data: {
        action: "get",
        params: {
          // openId: "oQe4W4-OuD2451I0M_Em1JoQFeIo",
          dateString: d,
          userId: this.data.userInfo._id
        }
      }
    }).then(res => {
      let temp = this.data.details;
      if (res.result.data == undefined) {
        wx.hideLoading()
        for (let i = 0; i < 7; i++) {
          temp[i].content = "暂无数据"
        }
      } else {
        temp[0].content = res.result.data.foodContent == undefined || res.result.data.foodContent == "" ? "暂无数据" : res.result.data.foodContent
        temp[1].content = res.result.data.micturitionContent == undefined ? "暂无数据" : res.result.data.micturitionContent.length
        temp[2].content = res.result.data.bloodStress == undefined ? "暂无数据" : `${res.result.data.bloodStress[0].value}/${res.result.data.bloodStress[1].value}`
        temp[3].content = res.result.data.bloodOxygen == undefined ? "暂无数据" : res.result.data.bloodOxygen
        temp[4].content = res.result.data.heartRate == undefined ? "暂无数据" : res.result.data.heartRate
        temp[5].content = res.result.data.tempeature == undefined ? "暂无数据" : res.result.data.tempeature
        temp[6].content = res.result.data.bloodSuger == undefined ? "暂无数据" : res.result.data.bloodSuger
        temp[7].content = res.result.data.sleepQuality == undefined || res.result.data.sleepQuality == "" ? "暂无数据" : res.result.data.sleepQuality
      }
      this.setData({
        details: temp
      })
      wx.hideLoading()
    })
  },
  selectDate() {
    this.setData({
      showDatePicker: true
    })
  },
  comfirmDate(e) {
    if (e) {
      this.setData({
        datePickerTime: e.detail
      })
    }
    let date = new Date(this.data.datePickerTime)
    let year = date.getFullYear()
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let sdate = ("0" + date.getDate()).slice(-2)
    let temp = `${year}年${month}月`

    let show_day = new Array('日', '一', '二', '三', '四', '五', '六');
    // let firstdayWeek = Number(sdate) % 7 + date.getDay() - 1
    let ft = (date.getDay() - Number(sdate) % 7) + 1
    let firstdayWeek = ft > 0 ? ft : ft + 7

    let monthDaysCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (Number(year) % 400 == 0 || (Number(year) % 100 != 0 && Number(year) % 4 == 0)) {
      monthDaysCount[1] = 29
    }
    let allDates = []
    for (let i = 0; i < monthDaysCount[Number(month) - 1]; i++) {
      allDates.push({
        week: show_day[firstdayWeek],
        date: i + 1
      })
      if (firstdayWeek < 6) firstdayWeek++;
      else firstdayWeek = 0;
    }
    let d = formatter(date)
    this.setData({
      currentDate: this.data.datePickerTime,
      formatDate: temp,
      otherFormatDate: temp.replace("年", '-').replace('月', '-'),
      sdate: Number(sdate),
      month: month,
      allDates: allDates,
      left: -0.118 * wx.getSystemInfoSync().windowWidth * (Number(sdate) - 4),
      middleDate: Number(sdate) - 1,
      totalSlideChange: 0,
      selectedDate: d,
      showDatePicker: false
    })
    this.getTodayData(this.data.selectedDate)
    this.getScore(this.data.selectedDate)
  },
  cancelDate() {
    this.setData({
      showDatePicker: false
    })
  },
  // onInputDate(e) {
  //   console.log("onInputDate", e);
  //   this.setData({
  //     datePickerTime: e.detail
  //   })
  //   if(this.data.allDates.length==0)this.comfirmDate();
  // },
  touchStart(e) {
    this.setData({
      touchDot: e.touches[0].pageX // 原点 x 坐标
    })
    this.data.intervalVal = setInterval(() => {
      this.setData({
        time: this.data.time + 1
      })
    }, 100)
  },
  // 触摸移动事件 
  touchMove(e) {
    var touchMove = e.touches[0].pageX;
    let distance = touchMove - this.data.touchDot
    let windowWidth = wx.getSystemInfoSync().windowWidth
    let step = 11.8 * windowWidth / 100
    if (distance <= -5 && this.data.time < 5) {
      this.setData({
        count: this.data.count + 1
      })
      if (this.data.count == 10) {
        let len = this.data.allDates.length
        // var timer =  setInterval(() => {
        //   this.setData({
        //     left: this.data.left - step/10 >= -(len - 4) * 0.118 * windowWidth ? this.data.left - step/10 : -(len - 4) * 0.118 * windowWidth
        //   })
        // }, 10);
        // var t2 = setTimeout(() => {
        //   clearInterval(timer)
        //   clearTimeout(t2)
        // }, 100);
        this.setData({
          left: this.data.left - step >= -(len - 4) * 0.118 * windowWidth ? this.data.left - step : -(len - 4) * 0.118 * windowWidth,
          count: 0,
          middleDate: this.data.middleDate + 1 > len - 1 ? this.data.middleDate : this.data.middleDate + 1,
        })
        if (this.data.left - step >= -(len - 4) * 0.118 * windowWidth) {
          this.setData({
            totalSlideChange: this.data.totalSlideChange + 1
          })
        }
      }
    }
    if (distance >= 5 && this.data.time < 5) {
      this.setData({
        count: this.data.count + 1
      })
      if (this.data.count == 10) {
        this.setData({
          left: this.data.left + step <= 0.354 * windowWidth ? this.data.left + step : 0.354 * windowWidth,
          count: 0,
          middleDate: this.data.middleDate - 1 < 0 ? this.data.middleDate : this.data.middleDate - 1,
        })
        if (this.data.left + step <= 0.354 * windowWidth) {
          this.setData({
            totalSlideChange: this.data.totalSlideChange - 1
          })
        }
      }
    }
  },
  // 触摸结束事件 
  touchEnd(e) {
    console.log(this.data.touchDot);
    console.log(e);
    clearInterval(this.data.intervalVal);
    this.data.time = 0;
    if (Math.abs(e.changedTouches[0].pageX - this.data.touchDot) < 5) return
    let temp = this.data.formatDate.replace('年', '/').replace('月', '/') + (this.data.sdate + Math.round(this.data.totalSlideChange))
    let d = formatter(Date.parse(temp))
    // let dd = new Date(temp.replace('/', '-'))
    let dd = new Date(temp)
    this.setData({
      currentDate: dd.getTime(),
      selectedDate: d
    })

    this.getTodayData(d)
    this.getScore(d)
  },
  gotoDetail(e) {
    let arr = ["foodContent", "micturitionContent", "bloodStress", "bloodOxygen", "heartRate", "tempeature", "bloodSuger", "sleepQuality"]
    wx.navigateTo({
      url: `/pages/observe/details/index?id=${arr[e.currentTarget.dataset.index]}&title=${e.target.dataset.item.title}&currentDate=${this.data.currentDate}`
    })
  },
  changeTitle(e) {
    console.log(e.currentTarget.dataset.title);
    this.setData({
      twoTitle: e.currentTarget.dataset.title
    })
  },
  clickSelectDate(e) {
    let windowWidth = wx.getSystemInfoSync().windowWidth
    this.setData({
      totalSlideChange: this.data.totalSlideChange - ((-(e.currentTarget.dataset.index - 3) * 0.118 * windowWidth) - this.data.left) / (0.118 * windowWidth),
      left: -(e.currentTarget.dataset.index - 3) * 0.118 * windowWidth,
      middleDate: e.currentTarget.dataset.index,
    })
    let temp = this.data.formatDate.replace('年', '/').replace('月', '/') + (this.data.sdate + Math.round(this.data.totalSlideChange))
    let d = formatter(Date.parse(temp))
    if(d === this.data.selectedDate) return
    this.setData({
      selectedDate: d
    })
    // console.log('点击结束', temp, this.data.totalSlideChange);
    // let dd = new Date(temp.replace('/', '-'))
    let dd = new Date(temp)
    this.setData({
      currentDate: dd.getTime()
    })
    this.getTodayData(d)
    this.getScore(d)
  },

  setScore(e) {
    const {
      index,
      key: type
    } = e.currentTarget.dataset
    const score = this.data.score
    score[type] = index + 1
    this.setData({
      score
    })
    wx.cloud.callFunction({
      name: 'score',
      data: {
        action: 'update',
        params: {
          type,
          score: score[type],
          dateString: this.data.selectedDate,
          userId: this.data.userInfo._id
        }
      }
    }).then(res => {
      wx.showToast({
        title: '打分成功',
      })
    })
  }
})