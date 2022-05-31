const app = getApp();
var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //展开
    activeNames: [],
    collapseList: ['0', '1', '2'],
    //每一阶段
    //periodList: ['适应期', '进步期', '巩固期']
    trainProjectList: [{
        name: "基础动作",
        checked: false
      },
      {
        name: "固定器械",
        checked: false
      },
      {
        name: "小工具",
        checked: false
      },
      {
        name: "跑步机",
        checked: false
      },
      {
        name: "椭圆机",
        checked: false
      },
      {
        name: "划船机",
        checked: false
      },
      {
        name: "动态拉伸",
        checked: false
      },
      {
        name: "主动拉伸",
        checked: false
      },
      {
        name: "被动牵引",
        checked: false
      },
      {
        name: "自由重量",
        checked: false
      },
      {
        name: "自重训练",
        checked: false
      },
      {
        name: "核心训练",
        checked: false
      },
      {
        name: "有氧训练",
        checked: false
      },
      {
        name: "私教团课",
        checked: false
      },
      {
        name: "EMS",
        checked: false
      },
      {
        name: "MFT",
        checked: false
      }
    ],
    //训练重点列表
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
    }],
    weightList: [],
    //体脂变化
    fatList: [],
    //肌肉变化
    muscleList: [],
    //阶段周期
    phaseCycleList: [],
    //频次
    frequencyList: [],
    //阶段
    periodList: [{
        collapseTitle: "适应期",
        //选中训练重点
        pointList: [],
        //选中训练项目
        projectList: [],
        weightArr: [0, 0, 0, 0],
        fatArr: [0, 0, 0, 0],
        muscleArr: [0, 0, 0, 0],
        phaseArr: [0, 0],
        frequencyIndex: 0,
        weight: "",
        fat: "",
        muscle: "",
        frequency: "",
        period: "",
        stage_num: "",
        remarks: "",
        trainModel: false,
        projectModel: false
      },
      {
        collapseTitle: "进步期",
        //选中训练重点
        pointList: [],
        //选中训练项目
        projectList: [],
        weightArr: [0, 0, 0, 0],
        fatArr: [0, 0, 0, 0],
        muscleArr: [0, 0, 0, 0],
        phaseArr: [0, 0],
        frequencyIndex: 0,
        weight: "",
        fat: "",
        muscle: "",
        frequency: "",
        period: "",
        stage_num: "",
        remarks: "",
        trainModel: false,
        projectModel: false
      }, {
        collapseTitle: "巩固期",
        //选中训练重点
        pointList: [],
        //选中训练项目
        projectList: [],
        weightArr: [0, 0, 0, 0],
        fatArr: [0, 0, 0, 0],
        muscleArr: [0, 0, 0, 0],
        phaseArr: [0, 0],
        frequencyIndex: 0,
        weight: "",
        fat: "",
        muscle: "",
        frequency: "",
        period: "",
        stage_num: "",
        remarks: "",
        trainModel: false,
        projectModel: false
      }
    ],
    //身体数据
    bodyInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPickerList();
    var pointList = this.data.trainPointList,
      projectList = this.data.trainProjectList;
    pointList = [...pointList, ...(wx.getStorageSync('trainPoint') || [])];
    projectList = [...projectList, ...(wx.getStorageSync('trainProject') || [])];
    this.setData({
      trainProjectList: projectList,
      trainPointList: pointList
    });
    console.log(options);
    //参考数据
    this.getReferenceData(options.isEdit, options.rdId);
  },
  getPickerList() {
    let weightList = [
        ['增加', '减少'],
        [],
        ['.'],
        []
      ],
      fatList = [
        ['增加', '减少'],
        [],
        ['.'],
        []
      ],
      muscleList = [
        ['增加', '减少'],
        [],
        ['.'],
        []
      ],
      frequencyList = [],
      phaseCycleList = [
        [],
        ['周', '月']
      ];
    for (let i = 0; i < 50; i++) {
      weightList[1].push(i);
      fatList[1].push(i);
      muscleList[1].push(i)
      if (i < 10) {
        weightList[3].push(i);
        fatList[3].push(i);
        muscleList[3].push(i);
      }
    }
    for (let j = 1; j < 200; j++) {
      frequencyList.push(j);
      phaseCycleList[0].push(j);
    }
    this.setData({
      weightList,
      fatList,
      muscleList,
      frequencyList,
      phaseCycleList
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  //添加阶段
  addperiod() {
    let pList = this.data.periodList;
    pList.push({
      collapseTitle: "第" + (pList.length + 1) + "阶段",
      //选中训练重点
      pointList: [],
      //选中训练项目
      projectList: [],
      weightArr: [0, 0, 0, 0],
      fatArr: [0, 0, 0, 0],
      muscleArr: [0, 0, 0, 0],
      phaseArr: [0, 0],
      frequencyIndex: 0,
      weight: "",
      fat: "",
      muscle: "",
      frequency: "",
      period: "",
      stage_num: "",
      remarks: "",
      trainModel: false,
      projectModel: false
    });
    this.setData({
      periodList: pList
    });
  },
  bindWeightChange(e) {
    let index = e.currentTarget.dataset.id,
      allList = this.data.periodList,
      weightList = this.data.weightList;
    allList[index].weightArr = e.detail.value;
    allList[index].weight = weightList[0][e.detail.value[0]] + weightList[1][e.detail.value[1]] + '.' + weightList[3][e.detail.value[3]];
    this.setData({
      periodList: allList
    })
  },
  weightColumnChange(e) {},
  bindFatChange(e) {
    let index = e.currentTarget.dataset.id,
      allList = this.data.periodList,
      fatList = this.data.weightList;
    allList[index].fatArr = e.detail.value;
    allList[index].fat = fatList[0][e.detail.value[0]] + fatList[1][e.detail.value[1]] + '.' + fatList[3][e.detail.value[3]];
    this.setData({
      periodList: allList
    })
  },
  fatColumnChange(e) {},
  bindMucleChange(e) {
    let index = e.currentTarget.dataset.id,
      allList = this.data.periodList,
      muscleList = this.data.muscleList;
    allList[index].muscleArr = e.detail.value;
    allList[index].muscle = muscleList[0][e.detail.value[0]] + muscleList[1][e.detail.value[1]] + '.' + muscleList[3][e.detail.value[3]];
    this.setData({
      periodList: allList
    })
  },
  mucleColumnChange(e) {},
  //
  bindCountChange(e) {
    let index = e.currentTarget.id,
      allList = this.data.periodList;
    allList[index].frequencyIndex = e.detail.value;
    allList[index].frequency = this.data.frequencyList[e.detail.value];
    //效率，周期
    var frequency = allList[index].frequency,
      period = Number(allList[index].period.match(/\d*/)[0]);
    if (allList[index].frequency && allList[index].period) {
      let char = allList[index].period.substring(allList[index].period.length, 1);
      if (char == '周') {
        allList[index].stage_num = period * 7 * frequency
      } else {
        allList[index].stage_num = period * 30 * frequency
      }
    }
    this.setData({
      periodList: allList
    })
  },
  //
  bindTimesChange(e) {
    let index = e.currentTarget.dataset.id,
      allList = this.data.periodList,
      phaseCycleList = this.data.phaseCycleList;
    allList[index].phaseArr = e.detail.value;
    allList[index].period = phaseCycleList[0][e.detail.value[0]] + phaseCycleList[1][e.detail.value[1]];
    //效率，周期
    var frequency = allList[index].frequency,
      period = Number(allList[index].period.match(/\d*/)[0]);
    if (allList[index].frequency && allList[index].period) {
      let char = allList[index].period.substring(allList[index].period.length, 1);
      if (char == '周') {
        allList[index].stage_num = period * 7 * frequency
      } else {
        allList[index].stage_num = period * 30 * frequency
      }
    }
    this.setData({
      periodList: allList
    })
  },
  timesColumnChange(e) {},
  getRemarks(e) {
    //console.log(e);
    let index = e.currentTarget.dataset.index,
      allList = this.data.periodList;
    allList[index].remarks = e.detail.value;
    this.setData({
      periodList: allList
    })
  },
  //编辑
  editTrain(e) {
    let type = e.currentTarget.dataset.type,
      index = e.currentTarget.dataset.index,
      allList = this.data.periodList;
    if (type == 0) {
      allList[index].trainModel = true;
    } else {
      allList[index].projectModel = true;
    }
    this.setData({
      periodList: allList
    })
  },
  close(e) {
    let index = e.currentTarget.dataset.index,
      allList = this.data.periodList;
    allList[index].trainModel = false;
    this.setData({
      periodList: allList
    })
  },
  close2(e) {
    let index = e.currentTarget.dataset.index,
      allList = this.data.periodList;
    allList[index].projectModel = false;
    this.setData({
      periodList: allList
    })
  },
  onConfrim(e) {
    let index = e.currentTarget.dataset.index,
      allList = this.data.periodList;
    allList[index].pointList = e.detail.trainList;
    allList[index].trainModel = false;
    this.setData({
      periodList: allList
    })
  },
  onConfrim2(e) {
    let index = e.currentTarget.dataset.index,
      allList = this.data.periodList;
    allList[index].projectList = e.detail.trainList;
    allList[index].projectModel = false;
    this.setData({
      periodList: allList
    })
  },
  //参考数据
  getReferenceData(isEdit, rdId) {
    // var custom = app.globalData.custom;
    service.post('/TrainProgrammeDetails', {
      user_token: wx.getStorageSync('token'),
      rd_Id: rdId || app.globalData.rd_id || 10,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let {
        UserHeight,
        MuscleMass,
        UserWeight,
        BodyFatRatio,
        BMI
      } = res.data.data;
      let fitnessGoals = res.data.data.qsdata[0].Answer,
        frequency = parseInt(res.data.data.qsdata[3].Answer),
        period = res.data.data.qsdata[2].Answer;
      if (fitnessGoals) {
        fitnessGoals = fitnessGoals.split(',');
      } else {
        fitnessGoals = [];
      }
      if (isEdit) {
        //console.log('编辑')
        let periodList = this.data.periodList,
          traindata = res.data.data.traindata;
        if (traindata.length>periodList.length) {
          for (let k = 0; k < traindata.length - periodList.length;k++){
            periodList.push({
              collapseTitle: "第" + (periodList.length + 1 + traindata.length - periodList.length) + "阶段",
              //选中训练重点
              pointList: [],
              //选中训练项目
              projectList: [],
              weightArr: [0, 0, 0, 0],
              fatArr: [0, 0, 0, 0],
              muscleArr: [0, 0, 0, 0],
              phaseArr: [0, 0],
              frequencyIndex: 0,
              weight: "",
              fat: "",
              muscle: "",
              frequency: "",
              period: "",
              stage_num: "",
              remarks: "",
              trainModel: false,
              projectModel: false
            })
          }
        }
        traindata.forEach(item => {
          periodList.forEach(stage => {
            if (item.StageName == stage.collapseTitle) {
              stage.pointList = item.TrainingFocus.split(',');
              stage.projectList = item.TrainingProject.split(',');
              stage.weight = parseFloat(item.WeightRecord) > 0 ? '增加' + item.WeightRecord : '减少' + Math.abs(item.WeightRecord);
              stage.fat = parseFloat(item.BodyFatChange) > 0 ? '增加' + item.BodyFatChange : '减少' + Math.abs(item.BodyFatChange);
              stage.muscle = parseFloat(item.MuscleChanges) > 0 ? '增加' + item.MuscleChanges : '减少' + Math.abs(item.MuscleChanges);
              stage.period = item.CycleStage;
              stage.stage_num = item.NumStage;
              stage.frequency = item.FrequencyStage;
              stage.remarks = item.Remarks;
            }
          })
        })
        this.setData({
          periodList: periodList
        })
      }
      this.setData({
        bodyInfo: {
          UserHeight,
          MuscleMass,
          UserWeight,
          BodyFatRatio,
          BMI,
          fitnessGoals,
          period,
          frequency
        }
      })
    })
  },
  subStrChar(remarks) {
    if (remarks.includes('增加')) {
      return Number(remarks.match(/[0-9]*[.][0-9]+$/)[0]);
    } else if (remarks.includes('减少')) {
      return Number('-' + remarks.match(/[0-9]*[.][0-9]+$/)[0]);
    } else {
      return ""
    }
  },
  //训练方案保存
  StageDataSave() {
    var jsonStrArr = [],
      periodList = this.data.periodList;
    let weightChange, fatChange, muscleChange;
    for (let j = 0; j < periodList.length; j++) {
      weightChange = this.subStrChar(periodList[j].weight);
      fatChange = this.subStrChar(periodList[j].fat);
      muscleChange = this.subStrChar(periodList[j].muscle)
      jsonStrArr.push({
        StageName: periodList[j].collapseTitle,
        TrainingFocus: periodList[j].pointList.join(),
        TrainingProject: periodList[j].projectList.join(),
        WeightRecord: weightChange,
        BodyFatChange: fatChange,
        MuscleChanges: muscleChange,
        FrequencyStage: periodList[j].frequency,
        CycleStage: periodList[j].period,
        NumStage: periodList[j].stage_num,
        Remarks: periodList[j].remarks
      })
    }
    service.post('/StageDataSave', {
      user_token: wx.getStorageSync('token'),
      rd_Id: app.globalData.rd_id,
      json: JSON.stringify(jsonStrArr),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      wx.redirectTo({
        url: '/pages/trainning/trainning',
      })
    })
  },
  //添加
  addVlaue(e) {
    let pointList = this.data.trainPointList,
      projectList = this.data.trainProjectList;
    switch (e.detail.title) {
      case "添加训练重点":
        pointList.push({
          name: e.detail.value,
          checked: false
        });
        this.setData({
          trainPointList: pointList
        });
        break;
      case "添加训练项目":
        projectList.push({
          name: e.detail.value,
          checked: false
        });
        this.setData({
          trainProjectList: projectList
        });
        break;
      default:
        break;
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
})