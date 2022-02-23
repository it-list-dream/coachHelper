// components/stage-list/stage-list.js
var list = [],
  list2 = [];
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeName: {
      type: Array,
      value: ["step"]
    },
    periodTitle: {
      type: String,
      value: "适应期"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeNames: ['step'],
    show: false,
    trainPointList: [{
        name: "力量",
        checked: false
      }, {
        name: "有氧",
        checked: false
      }, {
        name: "柔韧性",
        checked: false
      }, {
        name: "增肌",
        checked: false
      }, {
        name: "综合体能",
        checked: false
      },
      {
        name: "自定义",
        checked: false
      }
    ],
    pointList: [],
    //体重
    weightReworadList: [
      ['增加', '减少']
    ],
    weightIndex: [0, 0, 0],
    //阶段频次
    stageCountList: [],
    countIndex: 0,
    //阶段周期
    stageTimeList: [
      [],
      ['周', '月']
    ],
    stageTimeIndex: [0, 0]
  },
  lifetimes: {
    attached() {
      let activeList = this.properties.activeName;
      let weightReworadList = this.data.weightReworadList;
      let stageCountList = this.data.stageCountList;
      let stageTimeList = this.data.stageTimeList;
      for (let i = 0; i < 50; i++) {
        list.push(i)
        if (i > 0) {
          stageCountList.push(i)
          stageTimeList[0].push(i)
        }
      }
      for (let j = 1; j < 10; j++) {
        list2.push(j)
      }
      weightReworadList[1] = list;
      weightReworadList[2] = list2;
      //console.log(weightReworadList)
      this.setData({
        activeNames: activeList,
        weightReworadList: weightReworadList,
        stageCountList: stageCountList
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.setData({
        activeNames: event.detail,
      });
    },
    addTrainPoint() {
      this.setData({
        show: true
      })
    },
    onClose() {
      let trainList = this.data.trainPointList;
      trainList.forEach(item => item.checked = false)
      this.setData({
        show: false,
        trainPointList: trainList
      })
    },
    onConfrim() {
      let trainList = this.data.trainPointList;
      let tList = trainList.filter(item => item.checked).map(it => it.name);
      this.setData({
        pointList: tList,
        show: false
      })
    },
    // 选择
    trainTag(e) {
      var index = e.currentTarget.dataset.index,
        trainPointList = this.data.trainPointList,
        trainItem = "trainPointList[" + e.target.dataset.index + "].checked";
      this.setData({
        [trainItem]: !trainPointList[index].checked,
      })
    },
    editTrain() {
      this.setData({
        show: true
      })
    },
    //体重变化
    bindWeightChange(e) {
      this.setData({
        weightIndex: e.detail.value
      })
    },
    bindWeightColumnChange(e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var multiArray = this.data.weightReworadList;
      console.log(multiArray)
      var multiIndex = this.data.weightIndex;
      multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0: //改变第一列
          console.log(multiIndex);
          multiIndex[1] = 0;
          //将二、三列的index设为0，即第一个值
          multiIndex[2] = 0;
          //设置二、三列的列表
          multiArray[1] = list;
          multiArray[2] = list2;
          console.log(multiIndex);
          break;
        case 1: //改变第二列
          console.log(multiIndex);
          multiIndex[2] = 0;
          //设置第三列列表
          multiArray[2] = list2;
          console.log(multiIndex);
          break;
      }
      this.setData({ //将设置好的列表和选项index赋值
        weightReworadList: multiArray,
        weightIndex: multiIndex,
      });
    },
    //阶段频率
    bindCountChange(e) {
      this.setData({
        countIndex: e.detail.value
      })
    },
    //阶段周期
    timesColumnChange(e) {
      let multiArray = this.data.stageTimeList;
      let multiIndex = this.data.stageTimeIndex;
      let numberList = [];
      multiIndex[e.detail.column] = e.detail.value;
      if (e.detail.column == 0) {
        // 这里可以自行更改,例如通过下表来获取
        multiIndex[0] = 0;
        for (let i = 1; i < 50; i++) {
          numberList.push(i)
        }
        multiArray[0] = numberList;
      }
      this.setData({
        stageTimeList: multiArray,
        stageTimeIndex: multiIndex,
      })
    }
  },
  bindTimesChange(e) {
    this.setData({
      stageTimeIndex: e.detail.value
    });
  }
})