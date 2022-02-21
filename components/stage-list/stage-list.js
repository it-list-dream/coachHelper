// components/stage-list/stage-list.js
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
    // [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']]
    weightReworadList: [
      ['增加', '减少'],
      [1, 3, 4, 5],
      [5, 6, 8]
    ],
    weightIndex: [0, 0, 0],
  },
  lifetimes: {
    attached() {
      let activeList = this.properties.activeName;
      this.setData({
        activeNames: activeList
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
      // console.log(tList, tList2)
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
    bindWeightColumnChange() {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
        weightReworadList: this.data.multiArray,
        weightIndex: this.data.weightIndex
      };
      data.weightIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          switch (data.weightIndex[0]) {
            case 0:
              data.weightReworadList[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
              data.weightReworadList[2] = ['猪肉绦虫', '吸血虫'];
              break;
            case 1:
              data.weightReworadList[1] = ['鱼', '两栖动物', '爬行动物'];
              data.weightReworadList[2] = ['鲫鱼', '带鱼'];
              break;
          }
          data.weightIndex[1] = 0;
          data.weightIndex[2] = 0;
          break;
        case 1:
          // switch (data.multiIndex[0]) {
          //   case 0:
          //     switch (data.multiIndex[1]) {
          //       case 0:
          //         data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
          //         break;
          //       case 1:
          //         data.multiArray[2] = ['蛔虫'];
          //         break;
          //       case 2:
          //         data.multiArray[2] = ['蚂蚁', '蚂蟥'];
          //         break;
          //       case 3:
          //         data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
          //         break;
          //       case 4:
          //         data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
          //         break;
          //     }
          //     break;
          //   case 1:
          //     switch (data.multiIndex[1]) {
          //       case 0:
          //         data.multiArray[2] = ['鲫鱼', '带鱼'];
          //         break;
          //       case 1:
          //         data.multiArray[2] = ['青蛙', '娃娃鱼'];
          //         break;
          //       case 2:
          //         data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
          //         break;
          //     }
          //     break;
          // }
          // data.multiIndex[2] = 0;
          // console.log(data.multiIndex);
          // break;
      }
      this.setData(data);
    }
  }
})