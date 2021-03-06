
Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{},
    code: null,
    show_login_btn: true, 
  },

  login() {
    wx.login({  success: e => { this.setData({ code: e.code })} })
  },

  get_user_info() {
    wx.getUserInfo({
      success: res => {
        let encryptedData = res.encryptedData
        let iv = res.iv

        console.log(res)
        
        wx.request({
          url: 'https://dessert.gign.xyz/api/login',
          method: "POST",
          data: {
            iv,
            encryptedData,
            code: this.data.code,
          },
          success: response => {
            console.log(response.data)

            let result = response.data
            if (result.status != 0) {
              wx.showToast({
                title: '登录失败，请重试',
                icon: "none",
              })

              return
            } 
            
            wx.setStorageSync('token', result.token)
            this.setData({
              thumb: res.userInfo.avatarUrl,
              nickname: res.userInfo.nickName,
              show_login_btn: false,
            })

            wx.showToast({
              title: '登录成功',
              icon: "none",
            })

          }
        })


        
      }
    })
  },

  onLoad(){
    var self = this;

    

    /**
     * 发起请求获取订单列表信息
     */
    wx.request({
      url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
      success(res){
        self.setData({
          orders: res.data
        })
      }
    })
  },
  onShow(){
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }
})