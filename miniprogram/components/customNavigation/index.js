// components/customNavigation/index.js
const App = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showBack: Boolean,
    bgUrl: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: 84,
    statusBarHeight: 20
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      this.triggerEvent('backCB')
    },
  },

  lifetimes: {
    attached() {
      this.setData({
        navHeight: App.globalData.navHeight,
        statusBarHeight: App.globalData.statusBarHeight
      })
    }
  }
})
