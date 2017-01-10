/*
* 作者： 刘焱旺 yw@getweapp.com
* 答疑交流QQ群：499859691
*/

import api from '../../utils/api'

Page({
  data: {
    traces: []
  },
  onLoad: function (options) {
   api.get('search', {
     ShipperCode: options.ShipperCode,
     LogisticCode: options.LogisticCode
   }, (data) => {
     console.log(data)
     if(data.Traces.length == 0){
        wx.showModal({
          title: '提示',
          content: '没找到物流详情',
          confirmColor: '#ff9900',
          showCancel:false,
          success: (res) => {
            
          }
        })
        return
     }
     this.setData({
       traces: data.Traces
     })
   })
  }
})
