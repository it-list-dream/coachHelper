// pages/poster/poster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          canvasWidth: 750
        })
        console.log(res.windowWidth, res.pixelRatio)
      }
    })
  },
  drawCanvas() {
    const ctx = wx.createCanvasContext('shareCanvas');
    var that = this,
      ratio = 2;
    wx.getImageInfo({
      src: "../../images/bg.png",
      success(res) {
        let bgW = res.width,
          bgH = res.height;
        console.log(res.height)
        //375获取屏幕的宽度
        ctx.setFillStyle('#fff');
        // ctx.rect(0, 0, 750, bgH);
        // ctx.fill();
        ctx.fillRect(0, 0, 750, bgH + 60);
        ctx.drawImage('/' + res.path, 45, 30, bgW, bgH);
        //设置文字的大小
        ctx.setFontSize(16 * ratio);
        ctx.setFillStyle('#1B00A5');
        ctx.setTextAlign('left');
        ctx.fillText('3天', 42 * ratio, 40 * ratio);
        //设置文字的大小
        ctx.setFontSize(13 * ratio);
        // ctx.setFillStyle('#1B00A5');
        ctx.setTextAlign('center');
        ctx.fillText('效 / 果 / 对 / 比', 188 * ratio, 46 * ratio);
        ctx.setFontSize(10 * ratio);
        ctx.setTextAlign('center');
        ctx.fillText('Effect comparison', 188 * ratio, 60 * ratio);
        // ctx.draw();
        //图片路径 裁剪的x坐标 裁剪的y坐标 裁剪的宽 裁剪的高 图片在画布中的x轴 图片画布中的y轴
        //图片在画布中的宽度 和高度  
        ctx.drawImage('../../../assets/images/case.png', 36 * ratio, 100 * ratio, 142 * ratio, 178 * ratio);
        ctx.drawImage('../../../assets/images/case.png', 196 * ratio, 100 * ratio, 142 * ratio, 178 * ratio);
        ctx.drawImage('../../../assets/images/case.png', 36 * ratio, 290 * ratio, 142 * ratio, 178 * ratio);
        ctx.drawImage('../../../assets/images/case.png', 196 * ratio, 290 * ratio, 142 * ratio, 178 * ratio);
        ctx.drawImage('../../../assets/images/case.png', 36 * ratio, 480 * ratio, 142 * ratio, 178 * ratio);
        ctx.drawImage('../../../assets/images/case.png', 196 * ratio, 480 * ratio, 142 * ratio, 178 * ratio);
        ctx.drawImage('../../../assets/images/case.png', 36 * ratio, 670 * ratio, 142 * ratio, 178 * ratio);
        ctx.drawImage('../../../assets/images/case.png', 196 * ratio, 670 * ratio, 142 * ratio, 178 * ratio);
        ctx.setFontSize(16 * ratio);
        ctx.setTextAlign('left');
        ctx.fillText('体重', 44 * ratio, 916 * ratio);
        ctx.fillText('体脂率', 44 * ratio, 956 * ratio);
        //脂肪量
        ctx.fillText('脂肪量', 44 * ratio, 996 * ratio);
        ctx.setTextAlign('right');
        ctx.fillText('0.0kg', 320 * ratio, 920 * ratio);
        ctx.fillText('25.4%', 320 * ratio, 956 * ratio);
        ctx.fillText('脂肪量', 320 * ratio, 996 * ratio);
        ctx.draw(true, () => {
          setTimeout(() => {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              canvasId: 'shareCanvas',
              quality: 1.0,
              fileType: 'jpg',
              success(res) {
                console.log('图片保存成功:', res)
                that.setData({
                  tempFilePath: res.tempFilePath
                })
                // that.saveImage();
                that.openSetting();
              }
            });
          }, 500);

        });
      },
      fail(err) {
        reject(err)
      }
    });
  },
  saveImage: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.tempFilePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '图片保存失败\no(╥﹏╥)o',
            })
          }
        })
      }
    })
  },
  openSetting: function (e) {
    var that = this;
    //获取相册受权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() { //这里是用户赞成受权后的回调
              console.log('保存图片成功');
              that.saveImage();
            },
            fail() { //这里是用户拒绝受权后的回调
              wx.showModal({
                title: '提示',
                content: '若不打开受权，则没法将图片保存在相册中！',
                showCancel: true,
                cancelText: '暂不受权',
                cancelColor: '#000000',
                confirmText: '去受权',
                confirmColor: '#3CC51F',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    wx.openSetting({
                      success: function (result) {
                        console.log(result)
                        if (result.authSetting['scope.writePhotosAlbum']) {
                          that.saveImage();
                        }
                      }
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
        } else { //用户已经受权过了 
          that.saveImage();
        }
      }
    })
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
})