var baseURL = 'https://user.360ruyu.cn/MobileCoachV2.asmx';
var token;
const chooseImage = (
  sizeType = ['compressed'],
  sourceType = ['album', 'camera'],
  count = 1
) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count, // 默认1
      sizeType: sizeType, // 可以指定是原图还是压缩图，默认压缩图
      sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        resolve(res.tempFilePaths);
      },
      fail: function (error) {
        reject(error)
      }
    })
  });
}
const uploadImage = (url, fileUrl, imageName,formData = {}) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: baseURL + url,
      filePath: fileUrl,
      name: imageName,
      formData: {
        user_token: wx.getStorageSync('token'),
        ...formData
      },
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function (res) {
        resolve(JSON.parse(res.data));
      },
      fail: function (error) {
        reject(error);
      }
    })
  })
}
module.exports = {
  uploadImage,
  chooseImage
}