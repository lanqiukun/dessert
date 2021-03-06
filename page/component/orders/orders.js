// page/component/orders/orders.js
var app = getApp();

Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    orders: app.globalData.cartdata
  },

  onReady() {
    this.getTotalPrice();
  },
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    
    let token = wx.getStorageSync('token')

    wx.request({
      url: 'https://dessert.gign.xyz/api/order',
      method: "POST",
      data: {
        product_id: 1,
        amount: 1,
      },
      success: response => {
        
        let result = response.data
        console.log(result)


        let nonceStr = result.nonceStr
        let pay_package = result.package
        let paySign = result.paySign
        let timeStamp = result.timeStamp


        console.log(nonceStr)
        console.log(pay_package)
        console.log(paySign)
        console.log(timeStamp)




        wx.requestPayment({
          nonceStr,
          package: pay_package,
          paySign,
          timeStamp,
          signType: 'MD5',

          success: res => {
            wx.showToast({
              title: '已成功支付',
              icon: "success"
            })

            wx.switchTab({
              url: '/page/component/user/user',
            })
          },
          fail: res => {
            wx.showToast({
              title: '已放弃支付',
              icon: "none"
            })
          }
        })

      },

    })


  }
})