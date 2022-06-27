const util = require('../../utils/util.js');
var service = require('../../utils/request.js')
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        isHalf: {
            type: Boolean,
            value: false
        }
    },
    data: {
        multiArray: [], // 月和日从1开始
        nowDate: [], // 月和日从0开始
        currentTime: ""
    },
    lifetimes: {
        attached: function () {
            const date = new Date();
            const nowYear = date.getFullYear();
            const nowMonth = date.getMonth();
            const nowDay = date.getDate();
            const nowHour = date.getHours();
            const nowMinute = date.getMinutes();
            this.nowYear = nowYear;
            this.nowMonth = nowMonth;
            this.nowDay = nowDay;
            this.nowHour = nowHour;
            this.nowMinute = nowMinute;
            this.setData({
                nowDate: [nowYear, nowMonth, nowDay - 1, 0, 0]
            })
            // 年份
            const years = [];
            for (let i = date.getFullYear(); i <= date.getFullYear() + 5; i++) {
                years.push({
                    title: i + "年",
                    value: i
                });
            }

            // 月份
            const months = [];
            for (let i = 1; i <= 12; i++) {
                i = util.subTen(i);
                months.push({
                    title: i + "月",
                    value: +i
                });
            }

            // 获取日期
            const days = [];
            for (let i = 1; i <= 31; i++) {
                i = util.subTen(i);
                days.push({
                    title: i + "日",
                    value: +i
                });
            }
            const hours = [];
            const minutes = [];
            if (!this.properties.isHalf) {
                //小时
                for (let i = 0; i < 24; i++) {
                    if (i >= nowHour) {
                        i = util.subTen(i);
                        hours.push({
                            title: i + "时",
                            value: +i
                        });
                    }
                }
                //分钟
                for (let j = 0; j < 60; j++) {
                    if (j >= nowMinute) {
                        j = util.subTen(j);
                        minutes.push({
                            title: j + "分",
                            value: +j
                        });
                    }

                }
                this.setData({
                    multiArray: [years, months, days, hours, minutes]
                })
            } else {
                this.setData({
                    multiArray: [years, months, days, [],
                        []
                    ]
                });
                let searchDate = nowYear + '-' + util.subTen(nowMonth + 1) + '-' + util.subTen(nowDay);
                this.getMyTime(searchDate);
            }

        }
    },
    methods: {
        _bindMultiPickerChange: function (e) {
            let indexes = e.detail.value;
            let year = this.data.multiArray[0][indexes[0]].value;
            let month = this.data.multiArray[1][indexes[1]].value;
            let day = this.data.multiArray[2][indexes[2]].value;
            let hour,
                min;
            if (this.data.multiArray[3].length > 0) {
                hour = this.data.multiArray[3][indexes[3]].title.substr(0, 2);
                min = this.data.multiArray[4][indexes[4]].title.substr(0, 2);
            } else {
                wx.showToast({
                    icon: "none",
                    title: '该时间段不可选择',
                });
                return;
            }
            let currentTime = year + '-' + util.subTen(month) + '-' + util.subTen(day) + ' ' + hour + ':' + min;
            this.triggerEvent("bindMultiPickerChange", [year, month, day, hour, min])
            this.setData({
                currentTime: currentTime
            })
        },
        _bindMultiPickerColumnChange: function (e) { // 根据年份和月份计算每月多少天并更新日期时间选择器
            let that = this;
            let changeTarget = e.detail.column;
            let changeIndex = e.detail.value;
            let year = this.data.currentYear || this.data.nowDate[0];
            let month = this.data.currentMonth || this.data.nowDate[1] + 1;
            let multiArray = this.data.multiArray;
            let searchDay = "";
            //年
            if (changeTarget == 0) {
                year = this.data.multiArray[changeTarget][changeIndex].value;
                this.setData({
                    currentYear: year
                })
            }
            //月
            if (changeTarget == 1) {
                month = this.data.multiArray[changeTarget][changeIndex].value;
                searchDay = year + '-' + multiArray[1][e.detail.value].value + '-' + (this.data.nowDate[2] + 1);
                if (this.properties.isHalf) {
                    this.getMyTime(searchDay)
                } else {
                    this.getHourAndMinute(searchDay);
                }
                this.setData({
                    currentMonth: month
                })
            }

            /**
             * 当Date作为构造函数调用并传入多个参数时，如果数值大于合理范围时（如月份为 13 或者分钟数为 70），相邻的数值会被调整。
             * 比如 new Date(2013, 13, 1)等于new Date(2014, 1, 1)，它们都表示日期2014-02-01（注意月份是从0开始的）
             * new Date(2019, 10, 0).getDate() 等于2019-10-31日 实际上获取的是2019-10月的最后一天
             */
            if (changeTarget == 0 || changeTarget == 1) {
                let date = new Date(year, month, 0);
                let days = date.getDate();
                let multiArray = this.data.multiArray;
                let mulitDays = [];
                for (let i = 1; i <= days; i++) {
                    i = util.subTen(i);
                    mulitDays.push({
                        title: i + "日",
                        value: +i
                    });
                }
                multiArray[2] = mulitDays;

                this.setData({
                    multiArray: multiArray
                })
            }

            if (changeTarget == 2) {
                searchDay = year + '-' + month + '-' + multiArray[2][e.detail.value].value;
                if (this.properties.isHalf) {
                    this.getMyTime(searchDay);
                } else {
                    this.getHourAndMinute(searchDay);
                }

            }
            if (changeTarget == 3 && !this.properties.isHalf) {
                let hour = this.data.multiArray[changeTarget][changeIndex].value;
                let minutes = [];
                if (!this.properties.isHalf) {
                    for (let j = 0; j < 60; j++) {
                        if (hour > this.nowHour) {
                            j = util.subTen(j);
                            minutes.push({
                                title: j + "分",
                                value: +j
                            });
                        } else {
                            if (this.nowMinute <= j) {
                                j = util.subTen(j);
                                minutes.push({
                                    title: j + "分",
                                    value: +j
                                });
                            }
                        }
                    }
                }
                multiArray[4] = minutes;
                this.setData({
                    multiArray
                })
            }
        },
        getHourAndMinute(searchDate) {
            let hours = [],
                minutes = [],
                multiArray = this.data.multiArray,
                nowdate = this.nowYear + '-' + util.subTen(this.nowMonth + 1) + '-' + util.subTen(this.nowDay);
            if (new Date(searchDate).getTime() > new Date(nowdate).getTime()) {
                for (let i = 0; i < 24; i++) {
                    i = util.subTen(i);
                    hours.push({
                        title: i + "时",
                        value: +i
                    });
                }
                //分钟
                for (let j = 0; j < 60; j++) {
                    j = util.subTen(j);
                    minutes.push({
                        title: j + "分",
                        value: +j
                    });
                }
            }
            if (util.format(searchDate, 'yyyy-mm-dd') == util.format(nowdate, 'yyyy-mm-dd')) {
                for (let i = 0; i < 24; i++) {
                    if (this.nowHour <= i) {
                        i = util.subTen(i);
                        hours.push({
                            title: i + "时",
                            value: +i
                        });
                    }
                }
                //分钟
                for (let j = 0; j < 60; j++) {
                    if (this.nowMinute <= j) {
                        j = util.subTen(j);
                        minutes.push({
                            title: j + "分",
                            value: +j
                        });
                    }
                }
            }
            multiArray[3] = hours;
            multiArray[4] = minutes;
            this.setData({
                multiArray
            })
        },
        _bindCancel: function (e) {
            this.triggerEvent('bindCancel')
        },
        getMyTime(searchDate) {
            let multiArray = this.data.multiArray,
                nowDate = this.data.nowDate;
            service.post('/TeachMyTime', {
                SearchDate: searchDate,
                gi_id: wx.getStorageSync('gi_id')
            }).then(res => {
                let myTime = res.data.data,
                    hour = [],
                    minute = [],
                    tempList = [],
                    newHour = [],
                    newMinute = [];
                myTime = myTime.filter(item => item.StateMsg == "可预约").map(item => item.StartTime);
                for (let i = 0; i < myTime.length; i++) {
                    tempList = myTime[i].split(":");
                    if (hour.indexOf(tempList[0]) == -1) {
                        hour.push(tempList[0]);
                    }
                    if (minute.indexOf(tempList[1]) == -1) {
                        minute.push(tempList[1]);
                    }
                }
                hour.forEach((h, index) => {
                    newHour.push({
                        title: h + "时",
                        value: +index
                    })
                });
                minute.forEach((m, index) => {
                    newMinute.push({
                        title: m + "分",
                        value: +index
                    })
                });
                multiArray[3] = newHour;
                multiArray[4] = newMinute;
                this.setData({
                    multiArray: multiArray
                });
            })
        }
    },
});