// evaluation/pages/fitnessContrastReport/fitnessContrastReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    physical: {
      tableHeader: [{
          prop: 'datetitle',
          width: 242,
          label: '  ',
          color: '#666666'
        },
        {
          prop: 'start',
          width: 200,
          label: '2022-01-21',
          color: "#000000"
        },
        {
          prop: 'end',
          width: 200,
          label: '2022-02-21',
          color: "#000000"
        },
      ],
      stripe: false,
      border: false,
      row: [{
          id: 1,
          datetitle: "BMI",
          start: "51",
          end: "41"
        },
        {
          id: 1,
          datetitle: "身高（cm）",
          start: "51",
          end: "41"
        }, {
          id: 2,
          datetitle: "体重（kg）",
          start: "51",
          end: "41"
        }, {
          id: 3,
          datetitle: "血压（mmhg）",
          start: "51",
          end: "41"
        }, {
          id: 4,
          datetitle: "心率（bmp）",
          start: "51",
          end: "41"
        }, {
          id: 5,
          datetitle: "胸围（cm）",
          start: "51",
          end: "41"
        }, {
          id: 6,
          datetitle: "肩围（cm）",
          start: "51",
          end: "41"
        },
        {
          id: 7,
          datetitle: "腰围（cm）",
          start: "51",
          end: "41"
        }, {
          id: 8,
          datetitle: "臀围（cm）",
          start: "51",
          end: "41"
        }, {
          id: 9,
          datetitle: "左上臂围（cm）",
          start: "51",
          end: "41"
        }, {
          id: 10,
          datetitle: "右上臂围（cm）",
          start: "51",
          end: "41"
        }, {
          id: 11,
          datetitle: "下胸围（cm）",
          start: "51",
          end: "41"
        }, {
          id: 12,
          datetitle: "下腹围（cm）",
          start: "51",
          end: "41"
        },
        {
          id: 13,
          datetitle: "左大腿围（cm）",
          start: "51",
          end: "41"
        }, {
          id: 12,
          datetitle: "右大腿围（cm）",
          start: "51",
          end: "41"
        }, {
          id: 12,
          datetitle: "左小腿围（cm）",
          start: "51",
          end: "41"
        }, {
          id: 12,
          datetitle: "右小腿围（cm）",
          start: "51",
          end: "41"
        }

      ],
      msg: '暂无数据'
    },
    bodyIngredient: {
      tableHeader: [{
          prop: 'datetitle',
          width: 242,
          label: '  ',
          color: '#666666'
        },
        {
          prop: 'start',
          width: 200,
          label: '2022-01-21',
          color: "#000000"
        },
        {
          prop: 'end',
          width: 200,
          label: '2022-02-21',
          color: "#000000"
        },
      ],
      stripe: false,
      border: false,
      row: [{
          id: 1,
          datetitle: "体脂率",
          start: "51",
          end: "41"
        },
        {
          id: 2,
          datetitle: "脂肪量（kg）",
          start: "51",
          end: "41"
        }, {
          id: 3,
          datetitle: "水分（%）",
          start: "51",
          end: "41"
        }, {
          id: 4,
          datetitle: "骨骼肌（kg）",
          start: "51",
          end: "41"
        }
      ],
      msg: '暂无数据'
    },
    addExmple: false,
    exmpleList: [{
        name: "减脂",
        checked: false
      }, {
        name: "增肌",
        checked: false
      }, {
        name: "塑形",
        checked: false
      }, {
        name: "恢复",
        checked: false
      }, {
        name: "运动表现",
        checked: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //关闭
  onClose(){
      this.setData({
        addExmple:false
      })
  },
  addexmple(){
    this.setData({
      addExmple:true
    })
  },
  trainTag(e){
     let index = e.currentTarget.dataset.index;
     let typeList = this.data.exmpleList;
     for(let i =0;i<typeList.length;i++){
       if(index == i){
        typeList[i].checked =  true;
       }else{
        typeList[i].checked =  false;
       }
     }
     this.setData({
       exmpleList:typeList
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