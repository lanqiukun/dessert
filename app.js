App({
  onLaunch: function () {
    console.log('App Launch')
    wx.login({
      success: res => {
        console.log(res)
      }
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    cartdata:[],
    cartTotalNum:0
  }
})
