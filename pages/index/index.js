Page({
  data: {
    context1: null,
    hasDraw:false, //默认没有画
    src:null
  },
  onLoad: function() {
    var context1 = wx.createCanvasContext('handWriting1');
    context1.setStrokeStyle("#000000")
    context1.setLineWidth(3);
    this.setData({
      context1: context1,
    })
  },
  touchstart1: function(e) {
    var context1 = this.data.context1;
    context1.moveTo(e.touches[0].x, e.touches[0].y);
    this.setData({
      context1: context1,
      hasDraw : true, //要签字了
    });
  },
  touchmove1: function(e) {
    var x = e.touches[0].x;
    var y = e.touches[0].y;
    var context1 = this.data.context1;
    context1.setLineWidth(3);
    context1.lineTo(x, y);
    context1.stroke();
    context1.setLineCap('round');
    context1.draw(true);
    context1.moveTo(x, y);
  },
  reSign1: function() { //重新画
    var that = this;
    var context1 = that.data.context1;
    context1.draw(); //清空画布
    that.setData({
      hasDraw: false, //没有画
      src: null
    });
  },
  sign1ok: function () {
    var that = this;
    if(!that.data.hasDraw){
      console.log("签字是空白的 没有签字")
    }else{
      var context1 = that.data.context1;
      context1.draw(true, wx.canvasToTempFilePath({
        canvasId: 'handWriting1',
        success(res) {
          console.log(res.tempFilePath) //得到了图片下面自己写上传吧
          that.setData({
            src: res.tempFilePath
          })
          
        }
      }))
    }
  },
});
