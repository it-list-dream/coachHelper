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
          // unit: res.windowWidth / 750 * 0.8,
          ratio: res.pixelRatio,
          canvasWidth: res.windowWidth
        })
        this.drawCanvas()
      }
    })

  },
  drawCanvas() {
    const ctx = wx.createCanvasContext('shareCanvas');
    var that = this,
    ratio  = 2;
    //http://47.111.150.151:8011/image/88/admin_face/2021/2021111019015007586.jpg
    wx.getImageInfo({
      src: "../../images/bg.png",
      success(res) {
        let bgW = res.width,
          bgH = res.height;
        // 30 + 30 + 图片的高
        //保存的图片将所有位置* ratio 即可
        //375获取屏幕的宽度
        ctx.rect(0, 0, that.data.canvasWidth * ratio, bgH + 60)
        //ctx.rect(0, 0, that.data.canvasWidth, bgH  + 60)
        ctx.setFillStyle('#fff');
        ctx.fill();
        ctx.drawImage('/' + res.path, 24, 30, that.data.canvasWidth - 54, bgH * 0.6);
        //  ctx.drawImage('/' + res.path, 24, 30, bgW, bgH )
        //设置文字的大小
        ctx.setFontSize(16);
        ctx.setFillStyle('#1B00A5');
        ctx.setTextAlign('left');
        ctx.fillText('3天', 46, 62);
        //设置文字的大小
        ctx.setFontSize(18);
        // ctx.setFillStyle('#1B00A5');
        ctx.setTextAlign('center');
        ctx.fillText('效 / 果 / 对 / 比', 188, 66);
        ctx.setFontSize(11);
        ctx.setTextAlign('center');
        ctx.fillText('Effect comparison', 192, 84);
        // ctx.draw();
        //图片路径 裁剪的x坐标 裁剪的y坐标 裁剪的宽 裁剪的高 图片在画布中的x轴 图片画布中的y轴
        //图片在画布中的宽度 和高度  
        ctx.drawImage('../../../assets/images/case.png', 40, 120, 142, 178);
        ctx.drawImage('../../../assets/images/case.png', 200, 120, 142, 178);
        ctx.drawImage('../../../assets/images/case.png', 40, 310, 142, 178);
        ctx.drawImage('../../../assets/images/case.png', 200, 310, 142, 178);
        ctx.drawImage('../../../assets/images/case.png', 40, 500, 142, 178);
        ctx.drawImage('../../../assets/images/case.png', 200, 500, 142, 178);
        ctx.drawImage('../../../assets/images/case.png', 40, 690, 142, 178);
        ctx.drawImage('../../../assets/images/case.png', 200, 690, 142, 178);
        ctx.setFontSize(16);
        ctx.setTextAlign('left');
        ctx.fillText('体重', 40, 920);
        ctx.fillText('体脂率', 40, 960);
        //脂肪量
        ctx.fillText('脂肪量', 40, 1000);
        ctx.setTextAlign('right');
        ctx.fillText('0.0kg', 320, 920);
        ctx.fillText('25.4%', 320, 960);
        ctx.fillText('脂肪量', 320, 1000);
        ctx.draw(true, () => {
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
              that.saveImage();
            }
          });
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
  //计算图片尺寸
  calculateImg: function (src, cb) {
    var that = this;
    wx.getImageInfo({
      src: src,
      success(res) {
        wx.getSystemInfo({
          success(res2) {
            var ratio = res.width / res.height;
            var imgHeight = (res2.windowWidth * 0.85 / ratio) + 130;
            that.setData({
              imgHeight: imgHeight
            })
            cb(imgHeight - 130);
          }
        })
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})