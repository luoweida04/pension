// pages/home/index.js
import * as echarts from '../../ec-canvas/echarts';

import { formatter } from '../../utils/core'

let ctx = wx.createVideoContext('video', this)

const Day = new Date().getDay()
const DayList = ['日', '一', '二', '三', '四', '五', '六']
const XAxisList = [].concat(DayList.slice(Day + 1), DayList.splice(0, Day + 1))

// 双线
let chart

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  var option = {
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
    yAxis: {
      name: 'mmHg',
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      interval: 60,
      splitNumber: 4,
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
    grid: {
      right: '16%',
      bottom: '15%'
    },
  };
  chart.setOption(option);
  return chart;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    four: [{
      title: '血压',
      // value: '140/90',
      unit: 'mmHg',
      bg: '#c8f3e5',
      key: 'bloodStress'
    },
    {
      title: '体温',
      // value: '36.2',
      unit: '摄氏度',
      bg: '#f3c8c8',
      key: 'tempeature'
    },
    {
      title: '心率',
      // value: '100',
      unit: '次/分钟',
      bg: '#c8dcf3',
      key: 'heartRate'
    },
    {
      title: '血氧',
      // value: '90',
      unit: '%',
      bg: '#f3eac8',
      key: 'bloodOxygen'
    },
    ],
    selected: 0,
    today: ['血压', '体温', '心率', '血氧', '血糖', '排泄'],
    ec: {
      onInit: initChart
    },
    videos: [{
      title: '视频标题视频标题视频标题视频标题',
      count: 248,
      time: '1个月前',
      url: ''
    },
    {
      title: '视频标题视频标题视频标题视频标题',
      count: 248,
      time: '1个月前',
      url: ''
    },
    {
      title: '视频标题视频标题视频标题视频标题',
      count: 248,
      time: '1个月前',
      url: ''
    },
    {
      title: '视频标题视频标题视频标题视频标题',
      count: 248,
      time: '1个月前',
      url: ''
    },
    {
      title: '视频标题视频标题视频标题视频标题',
      count: 248,
      time: '1个月前',
      url: ''
    }
    ],
    recomDetail: [{
      text: '寿命与退休年龄预测',
      count: 249,
      imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/2.jpeg'
    },
    // {
    //   text: '测试标题测试标题测试标题测试标题测试标题测试标题',
    //   count: 250,
    //   imgUrl: ''
    // },
    // {
    //   text: '测试标题测试标题测试标题测试标题测试标题测试标题',
    //   count: 252,
    //   imgUrl: ''
    // }
    ],
    // touchDot: null,
    // intervalVal: Object,
    // time: 0,
    // count: 0, // 滑动窗口,防止滑动过快，
    // left: 0,
    communityIcon: [
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Rectangle 114@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Rectangle 114@3x(1).png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/Rectangle 114@3x(2).png'
    ],
    communityDetail: [{
      text: '季节转换时期老年人要注意哪些健康问题？季节转换时期老年人要注意哪些健康问题？',
      imgUrl: ''
    },
    {
      text: '季节转换时期老年人要注意哪些健康问题？季节转换时期老年人要注意哪些健康问题？',
      imgUrl: ''
    },
    {
      text: '季节转换时期老年人要注意哪些健康问题？季节转换时期老年人要注意哪些健康问题？',
      imgUrl: ''
    }
    ],

    // echarts中展示的数据
    // 收缩压
    bloodStolicStressWeekData: [],
    // 舒张压
    bloodDiastolicStressWeekData: [],
    tempeatureWeekData: [],
    heartRateWeekData: [],
    bloodOxygenWeekData: [],
    bloodSugerWeekData: [],
    micturitionWeekData: [],

    userInfo: {},
    userList: [],
    todayRecord: {},
    hotQuestions: [],

    continuation: 0,

    playing: false,
    videoUrl: ''
  },

  onLoad(options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      userList: wx.getStorageSync('userList')
    })
    this.setData({
      continuation: Math.ceil((new Date().getTime() - new Date(this.data.userInfo._createTime).getTime()) / 1000 / 60 / 60 / 24)
    })
    this.getTodayRecord()
    wx.cloud.callFunction({
      name: 'QA',
      data: {
        action: 'hotQuestion',
        params: {
          limit: 3
        }
      }
    }).then(res => {
      this.setData({
        hotQuestions: res.result.data
      })
    })
  },

  onShow() {
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo,
      userList: wx.getStorageSync('userList'),
      continuation: Math.ceil((new Date().getTime() - new Date(userInfo._createTime).getTime()) / 1000 / 60 / 60 / 24)
    })
    this.getWeekData(this.data.selected)
    this.getTodayRecord()
    this.getVideos()
  },

  onReady() {
    this.getWeekData()
  },

  playVideo(e) {
    const index = e.currentTarget.dataset.index;

    this.setData({
      videoUrl: this.data.videos[index].videoUrl,
      playing: true
    })
    ctx.play()
    wx.cloud.callFunction({
      name: 'video',
      data: {
        action: 'browse',
        params: {
          id: this.data.videos[index]._id
        }
      }
    })
  },

  closeVideo() {
    ctx.stop()
    this.setData({
      videoUrl: '',
      playing: false
    })
  },

  getVideos() {
    wx.cloud.callFunction({
      name: 'video',
      data: {
        action: 'getHVideo'
      }
    }).then(res => {
      this.setData({
        videos: res.result.data
      })
    })
  },

  getTodayRecord() {
    wx.cloud.callFunction({
      name: 'record',
      data: {
        action: 'get',
        params: {
          dateString: formatter(new Date()),
          userId: this.data.userInfo._id
        }
      }
    }).then(res => {
      let data = res.result.data
      if (data.bloodStress) {
        data.bloodStress = data.bloodStress.reduce((prev, cur) => prev.value + '/' + cur.value)
      }
      this.setData({
        todayRecord: res.result.data
      })
    })
  },

  getWeekData(selected = 0) {
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
      this.setData({
        bloodStolicStressWeekData: res.result.data.map(item => item.bloodStress ? item.bloodStress[0].value : Math.round(Math.random() * (40) + 30)),
        bloodDiastolicStressWeekData: res.result.data.map(item => item.bloodStress ? item.bloodStress[1].value : Math.round(Math.random() * (40) + 30)),
        tempeatureWeekData: res.result.data.map(item => item.tempeature || Math.round(Math.random() * (4) + 34)),
        heartRateWeekData: res.result.data.map(item => item.heartRate || Math.round(Math.random() * (30) + 80)),
        bloodOxygenWeekData: res.result.data.map(item => item.bloodOxygen || Math.round(Math.random() * (4) + 93)),
        bloodSugerWeekData: res.result.data.map(item => item.bloodSuger || Math.round(Math.random() * (4) + 2)),
        micturitionWeekData: res.result.data.map(item => item.micturitionContent ? item.micturitionContent.length : Math.round(Math.random() * 4) / 2)
      })
      setTimeout(() => {
        this.select({ currentTarget: { dataset: { i: selected } } })
      }, 100)
    })
  },

  onShareAppMessage() {
    return {
      title: 'Well Aging'
    }
  },
  select(e) {
    this.setData({
      selected: e.currentTarget.dataset.i
    })
    let option = {
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
    switch (e.currentTarget.dataset.i) {
      case 0:
        Object.assign(option, {
          yAxis: {
            name: 'mmHg',
            type: 'value',
            min: Math.min(...this.data.bloodStolicStressWeekData, ...this.data.bloodDiastolicStressWeekData) - 20,
            max: Math.max(...this.data.bloodStolicStressWeekData, ...this.data.bloodDiastolicStressWeekData) + 20,
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
            data: this.data.bloodStolicStressWeekData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            color: '#74C3A4'
          },
          {
            name: "舒张压",
            data: this.data.bloodDiastolicStressWeekData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            color: '#FFAEAE'
          }
          ]
        })
        break
      case 1:
        Object.assign(option, {
          yAxis: {
            name: '℃',
            type: 'value',
            min: Math.min(...this.data.tempeatureWeekData) - 2,
            max: Math.max(...this.data.tempeatureWeekData) + 2,
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
            data: this.data.tempeatureWeekData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            color: '#74C3A4'
          }]
        })
        break
      case 2:
        Object.assign(option, {
          yAxis: {
            name: '次/分钟',
            type: 'value',
            min: Math.min(...this.data.heartRateWeekData) - 16,
            max: Math.max(...this.data.heartRateWeekData) + 16,
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
            data: this.data.heartRateWeekData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            color: '#74C3A4'
          }]
        })
        break
      case 3:
        Object.assign(option, {
          yAxis: {
            name: '%',
            type: 'value',
            min: Math.min(...this.data.bloodOxygenWeekData) - 2,
            max: Math.max(...this.data.bloodOxygenWeekData) + 2,
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
            data: this.data.bloodOxygenWeekData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            color: '#74C3A4'
          }]
        })
        break
      case 4:
        Object.assign(option, {
          yAxis: {
            name: 'mmol/L',
            type: 'value',
            min: Math.min(...this.data.bloodSugerWeekData) - 2,
            max: Math.max(...this.data.bloodSugerWeekData) + 2,
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
            data: this.data.bloodSugerWeekData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            color: '#74C3A4'
          }]
        })
        break
      case 5:
        Object.assign(option, {
          yAxis: {
            name: '次',
            type: 'value',
            min: 0,
            max: Math.max(...this.data.micturitionWeekData) + 2,
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
            data: this.data.micturitionWeekData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            color: '#74C3A4'
          }]
        })
        break
    }
    chart.setOption(option, true)
  },

  gotoObserve() {
    wx.switchTab({
      url: '/pages/observe/index',
    })
  },
  gotoDiscuss() {
    wx.switchTab({
      url: '/pages/discuss/index',
    })
  },
  gotoPlan() {
    wx.switchTab({
      url: '/pages/plan/index',
    })
  },
  reTest(e) {
    if (e.currentTarget.dataset.i != 0) return;
    wx.navigateTo({
      url: '/pages/index/index?reTest=1',
    })
  },
  gotoAnswers(e) {
    wx.navigateTo({
      url: `/pages/discuss/answers/index?id=${e.currentTarget.dataset.id}`,
    })
  },
  gotoPreview(){
    wx.navigateTo({
      url: '/pages/index/index?preview=1',
    })
  }
})