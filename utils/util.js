const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function subTen(value) {
  return value < 10 ? ('0' + value) : value;
}
const yesterday = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = '01'
  return [year, month, day].map(formatNumber).join('-')
}

function format(date, fmt) {
  let d = new Date(date)
  var o = {
    "M+": d.getMonth() + 1, //月份
    "d+": d.getDate(), //日
    "h+": d.getHours(), //小时
    "m+": d.getMinutes(), //分
    "s+": d.getSeconds(), //秒
    "q+": Math.floor((d.getMonth() + 3) / 3), //季度
    "S": d.getMilliseconds() //毫秒
  };
  //  获取年份 
  if (/(y+)/i.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")", "i").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

/*函数节流*/
function throttle(fn, interval) {
  var last;
  var timer;
  var interval = interval || 300;
  return function () {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(th, args);
      }, interval);
    } else {
      last = now;
      fn.apply(th, args);
    }
  }
}
const filterFn = (array, img, id) => {
  var newArr = [],
    assementArr = "";
  for (var f in array) {
    if (f != id && f != "SD_ID" && f != "Remarks" && f != img && f != "Createdate" && f != "imgurl") {
      assementArr = array[f].split(',');
      if (assementArr.toString().length > 0) {
        newArr.push(...assementArr);
      }
    }
  }
  return newArr;
}

var showModal = (params) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: params.title || "",
      content: params.content || "",
      showCancel:params.showCancel || true,
      cancelText:params.cancelText || "取消",
      confirmText:params.confirmText || "确定",
      success(res) {
         resolve(res);
      },
      fail(err){
        reject(err);
      }
    })
  })

}
module.exports = {
  format,
  formatTime,
  subTen,
  yesterday,
  throttle,
  filterFn,
  showModal
}