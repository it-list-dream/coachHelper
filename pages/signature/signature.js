// import SignaturePad from '../js/signature_pad'
import SignaturePad from '../../utils/signature_pad.js'
let signaturePad = {};
let pix = 7;
let penColor = 'black';
let lineWidth = 1.4;
var upLoad = require('../../utils/upload.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    penColor: 'black',
    lineWidth: 0.6,
    isEmpty: true
  },

  onLoad: function (options) {
    var ctx = wx.createCanvasContext('handWriting');
    this.getSysInfo();
    const data = {
      devicePixelRatio: pix,
    };
    signaturePad = new SignaturePad(ctx, data);
    // console.info(ctx, SignaturePad);
  },
  uploadScaleStart(e) {
    const item = {
      penColor: penColor,
      lineWidth: lineWidth
    };
    signaturePad._handleTouchStart(e, item);
  },
  uploadScaleMove(e) {
    signaturePad._handleTouchMove(e);
  },
  uploadScaleEnd: function (e) {
    signaturePad._handleTouchEnd(e);
    const isEmpty = signaturePad.isEmpty();
    this.setData({
      isEmpty: isEmpty
    })
  },
  retDraw: function () {
    signaturePad.clear();
    const isEmpty = signaturePad.isEmpty();
    this.setData({
      isEmpty: isEmpty
    })
  },
  getSysInfo: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight
        });
        that.rpx = res.pixelRatio;
      }
    })
  },
  //保存canvas图像
  subCanvas: function () {
    var that = this;
    if (this.data.isEmpty) {
      return false
    }

    wx.canvasToTempFilePath({
      canvasId: 'handWriting',
      destWidth:that.data.width * that.rpx,
      destHeight:that.data.height * that.rpx,
      success: function (result) {
        let pages = getCurrentPages();
        //获取所需页面
        let prevPage = pages[pages.length - 2]; //上一页
        upLoad.uploadImage('/ReceiveFiles', result.tempFilePath, 'sign', {
          gi_id: wx.getStorageSync('gi_id')
        }).then(res => {
          prevPage.setData({
            signImage: result.tempFilePath,
            signId: res.filesid
          });
          wx.navigateBack({
            delta: 1,
          });
        });
      },
      fail: function (res) {
        // console.log(res)
        wx.showToast({
          icon: "none",
          title: '图片保存失败'
        })
      }
    })
  }
})