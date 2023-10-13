// pages/plan/index.js
Page({
  data: {
    planList: [
      {
        title: '退休规划人生',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_退休规划人生@3x.png',
        status: 0
      },
      {
        title: '脑与神经健康',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_脑与神经系统@3x.png',
        status: 1
      },
      {
        title: '心血管健康',
        count: 5,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_心血管系统@3x.png',
        status: 2
      },
      {
        title: '呼吸健康',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_呼吸系统@3x.png',
        status: 0
      },
      {
        title: '血液健康',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_血液系统@3x.png',
        status: 0
      },
      {
        title: '泌尿生殖健康',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_泌尿生殖@3x.png',
        status: 0
      },
      {
        title: '代谢内分泌健康',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_代谢内分泌@3x.png',
        status: 0
      },
      {
        title: '消化健康',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_消化@3x.png',
        status: 0
      },
      {
        title: '皮肤健康',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_皮肤@3x.png',
        status: 0
      },
      {
        title: '骨质疏松',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_肌肉骨关节@3x.png',
        status: 0
      },
      {
        title: '心理健康',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_心理健康@3x.png',
        status: 0
      },
      {
        title: '睡眠健康',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_睡眠健康@3x.png',
        status: 0
      },
      {
        title: '护理学院',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_护理学院@3x.png',
        status: 0
      },
      {
        title: '疼痛与血压',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_疼痛与血压@3x.png',
        status: 0
      },
      {
        title: '复健',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_复健@3x.png',
        status: 0
      },
      {
        title: '深度看护服务',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_深度看护服务@3x.png',
        status: 0
      },
      {
        title: '在家ICU培训与系统搭建',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_在家ICU培训与系统搭建@3x.png',
        status: 0
      },
      {
        title: '临终关怀',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_临终关怀@3x.png',
        status: 0
      },
      {
        title: '风湿病',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_风湿病@3x.png',
        status: 0
      },
      {
        title: '痛风',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_痛风@3x.png',
        status: 0
      },
      {
        title: '痴呆症',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_痴呆症@3x.png',
        status: 0
      },
      {
        title: '护理者松弛方法',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_护理者松弛方法@3x.png',
        status: 0
      },
      {
        title: '药物管理',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_药物管理@3x.png',
        status: 0
      },
      {
        title: '失智看护检测',
        count: 7,
        imgUrl: 'cloud://cloud1-5g0jamir2a885c6a.636c-cloud1-5g0jamir2a885c6a-1317163959/planImg/Program_失智看护检测@3x.png',
        status: 0
      },
    ],
    countList: []
  },

  onLoad(options) {
    this.getCountList()
  },

  gotoDetail(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/plan/detail/index?index=${index}`,
    })
  },

  getCountList() {
    wx.cloud.callFunction({
      name: 'video',
      data: {
        action: 'getLessonCount'
      }
    }).then(res => {
      this.setData({
        countList: res.result.data
      })
    })
  }
})