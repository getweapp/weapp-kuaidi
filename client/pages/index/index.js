/*
* 作者： 刘焱旺 yw@getweapp.com
* 答疑交流QQ群：499859691
*/

import api from '../../utils/api'

Page({
  data: {
    motto: '我的快递到哪啦？',
    code: ''
  },
  onInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //事件处理函数
  search: function() {
    console.log(this.data.code)
    if(!this.data.code){
      wx.showModal({
  title: '提示',
  content: '请输入快递单号',
  confirmColor: '#ff9900',
  showCancel:false,
  success: (res) => {
    
  }
})

      return
    }
    api.get('searchShippers', {
      LogisticCode: this.data.code
    }, (data) => {
      if(data.Shippers.length == 0){
        // 没找到快递公司
         wx.showModal({
          title: '提示',
          content: '没找到快递公司',
          confirmColor: '#ff9900',
          showCancel:false,
          success: (res) => {
            
          }
        })
        return
      }
      wx.navigateTo({
      url: '../logs/logs?ShipperCode='+data.Shippers[0].ShipperCode+'&LogisticCode='+this.data.code
    })
    })

   
  }
})
