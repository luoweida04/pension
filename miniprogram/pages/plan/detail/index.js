// pages/plan/detail/index.js
let ctx = wx.createVideoContext('video', this)

Page({

  data: {
    imgUrl: [
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_退休规划人生@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_脑与神经系统@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_心血管系统@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_呼吸系统@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_血液系统@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_泌尿生殖@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_代谢内分泌@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_消化@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_皮肤@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_肌肉骨关节@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_心理健康@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_睡眠健康@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_护理学院@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_疼痛与血压@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_复健@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_深度看护服务@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_在家ICU培训与系统搭建@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_临终关怀@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_风湿病@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_痛风@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_痴呆症@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_护理者松弛方法@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_药物管理@3x.png',
      'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_失智看护检测@3x.png',
    ],
    titleList: [
      '退休规划人生',
      '脑与神经健康',
      '心血管健康',
      '呼吸健康',
      '血液健康',
      '泌尿生殖健康',
      '代谢内分泌健康',
      '消化健康',
      '皮肤健康',
      '骨质疏松',
      '心理健康',
      '睡眠健康',
      '护理学院',
      '疼痛与血压',
      '复健',
      '深度看护服务',
      '在家ICU培训与系统搭建',
      '临终关怀',
      '风湿病',
      '痛风',
      '痴呆症',
      '护理者松弛方法',
      '药物管理',
      '失智看护检测'
    ],
    count: 7,
    lessonList: [],
    index: -1,
    typeList: [
      'retired',
      'brain',
      'cardiovascular',
      'breath',
      'blood',
      'genitourinary',
      'metabolize',
      'digestion',
      'skin',
      'bone',
      'mental',
      'sleep',
      'nurse',
      'pain',
      'rehabilitation',
      'deepcare',
      'ICU',
      'deathbed',
      'rheumatism',
      'gout',
      'dementia',
      'relax',
      'medicine',
      'dementiacare',
    ],
    playing: false,
    videoUrl: ''
  },

  onLoad(options) {
    this.setData({
      index: options.index
    })
    this.getVideos()
    ctx.onLoad = () => {
      console.log(123);
      wx.showToast({
        title: '加载完成',
      })
    }
  },

  getVideos() {
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'video',
      data: {
        action: 'getByType',
        params: {
          type: this.data.typeList[this.data.index]
        }
      }
    }).then(res => {
      wx.hideLoading()
      this.setData({
        lessonList: res.result.data.videoUrl
      })
    })
  },

  playVideo(e) {
    const index = e.currentTarget.dataset.index;

    this.setData({
      videoUrl: this.data.lessonList[index],
      playing: true
    })
    ctx.play()
  },

  closeVideo() {
    ctx.stop()
    this.setData({
      videoUrl: '',
      playing: false
    })
  },
})