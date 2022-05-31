// import SignaturePad from '../js/signature_pad'
import SignaturePad from '../../utils/signature_pad.js'
let signaturePad = {};
let pix = 7;
let penColor = 'black';
let lineWidth = 1.4;
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
        })
      }
    })
  },
  //保存canvas图像
  subCanvas: function () {
    if (this.data.isEmpty) {
      return false
    }
    wx.canvasToTempFilePath({
      canvasId: 'handWriting',
      success: function (res) {
        console.log(res.tempFilePath)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }
})