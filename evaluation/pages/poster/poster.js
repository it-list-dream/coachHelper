var service = require('../../../utils/request.js');
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    canvasWidth: 0,
    canvasHeight: 0
  },
  onClickHide() {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      weight,
      fat,
      pbf
    } = options;
    wx.getSystemInfo({
      success: (res) => {
        this.rpx = res.windowWidth / 375;
        this.setData({
          canvasWidth: res.screenWidth,
          canvasHeight: res.screenHeight,
          weight,
          fat,
          pbf
        })
      }
    });
    //this.doPoster();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  doPoster() {
    var that = this,
      rpx = this.rpx;
    //生成海报
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.setFillStyle('#7F7CFF');
    ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
    ctx.drawImage('../../images/poster/bg.png', 13 * rpx, 64 * rpx, 349 * rpx, 577 * rpx);
    ctx.font = `bold 16px sans-serif`;
    ctx.setFontSize(16 * rpx);
    ctx.setFillStyle('#000000');
    ctx.setTextAlign('left');
    ctx.fillText('效果数据图', 40 * rpx, 114 * rpx);
    ctx.setLineDash([2, 4]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#A998FF';
    ctx.beginPath();
    ctx.moveTo(40 * rpx, 142 * rpx);
    ctx.lineTo(338 * rpx, 142 * rpx);
    ctx.stroke();
    ctx.drawImage('../../images/poster/fit-bg.png', 32 * rpx, 160 * rpx, 309 * rpx, 313 * rpx);
    //图片
    ctx.font = `bold 18px sans-serif`;
    ctx.setFontSize(18 * rpx);
    ctx.drawImage('../../images/poster/weight.png', 36 * rpx, 502 * rpx, 21 * rpx, 21 * rpx);
    ctx.fillText(this.data.weight || '1.0', 57 * rpx, 521 * rpx);
    //
    ctx.drawImage('../../images/poster/fat.png', 151 * rpx, 505 * rpx, 21 * rpx, 21 * rpx);
    ctx.fillText(this.data.fat || '-33.0', 176 * rpx, 521 * rpx);
    //
    ctx.drawImage('../../images/poster/body-fat.png', 269 * rpx, 505 * rpx, 21 * rpx, 21 * rpx);
    ctx.fillText(this.data.pbf || '-25.4', 294 * rpx, 521 * rpx);
    ctx.setFillStyle('#989898');
    ctx.font = `normal 12px sans-serif`;
    ctx.setFontSize(12 * rpx);
    ctx.fillText('体重(千克)', 38 * rpx, 540 * rpx);
    ctx.fillText('脂肪量(千克)', 150 * rpx, 540 * rpx);
    ctx.fillText('体脂率(百分比)', 266 * rpx, 540 * rpx);
    ctx.draw(true, function (e) {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'myCanvas',
        quality: 1.0,
        fileType: 'jpg',
        success: function (res) {
          console.log('图片保存成功')
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath
          });
          wx.showModal({
            title: '温馨提示',
            content: '活动海报已经生成，您可以保存到手机相册分享给您的朋友。',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                wx.getSetting({
                  success(res) {
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                      wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                          wx.saveImageToPhotosAlbum({
                            filePath: tempFilePath,
                            success(res) {
                              wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                              })
                            },
                            fail() {}
                          });
                        },
                        fail() {}
                      })
                    } else if (res.authSetting['scope.writePhotosAlbum']) {
                      wx.saveImageToPhotosAlbum({
                        filePath: tempFilePath,
                        success(res) {
                          wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                          })
                        },
                        fail() {}
                      });
                    }
                  }
                })
              } else if (res.cancel) {
                //console.log('用户点击取消')
              }
            }
          })
        },
        fail: function (res) {
          console.log(res);
        }
      });

    });
  }
})