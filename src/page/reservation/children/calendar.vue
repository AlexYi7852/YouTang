<template>
  <div class="calendar">
    <div class="title">
      <div class="months">
        <img class="icon" src="../../../../static/img/prev.png" @click="prevMonth">
        <span class="month">{{ nowMonth }}月</span>
        <img class="icon right" src="../../../../static/img/next.png" @click="nextMonth">
        <div class="back-today" @click="backToday">回到今天</div>
      </div>
    </div>
    <div class="date">
      <div class="week" v-for="(week, index) in nowMonthWeeks" :key="index">{{ week }}</div><br>
      <div :class="{ 'today': day === new Date().getDate() && nowMonth === new Date().getMonth() + 1
      && nowYear === new Date().getFullYear(), 'active': isActive === index && nowMonth ===  new Date().getMonth() + 1 }"
      class="day" v-for="(day, index) in dayNum" :key="day.index" @click="getAppointTime(day, index)">{{ day }}</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import jstz from 'jstz'
  import Hub from '../../../components/hub'

  export default {
    data () {
      return {
        timeZone: '',  // 获取时区
        timeStamp: '', // 获取预约时间戳
        courseTimeList: '', // 获取预约时间列表
        nowDay: '',
        dayNum: 0, //当月天数
        nowYear: '',
        nowMonth: '',
        appointTime: '',
        nowMonthWeeks: [],
        isActive: new Date().getDate(),
        weeks: [ '日', '一', '二', '三', '四', '五', '六' ]
      }
    },
    mounted () {
      this.getTimeZone()
      this.initData()  // 数据初始化
      this.initDay(this.nowYear, this.nowMonth)
      this.getNowMonthWeeks(this.nowYear, this.nowMonth, this.dayNum)
    },
    methods: {
      initData () {  // 初始化数据
        let date = new Date()
        this.nowYear = date.getFullYear()
        this.nowMonth = date.getMonth() + 1
        this.nowDay = date.getDate()
        this.initDay(this.nowYear, this.nowMonth)
      },
      // 获取当月的周列表
      getNowMonthWeeks (nowYear, nowMonth, dayNum) {
        for (let i = 1; i <= dayNum; i++) {
          this.nowMonthWeeks.push(this.weeks[new Date(nowYear, nowMonth - 1, i).getDay()])
        }
      },
      initDay(nowYear, nowMonth) {
        this.dayNum = this.getNowMonthDates(nowYear, nowMonth);
      },
      // 获取当月的天数
      getNowMonthDates (year, month) {
        return new Date(year, month, 0).getDate()
      },
      // 上一月
      prevMonth () {
        if (this.nowMonth === 1) {
          this.nowMonth = 12
          this.nowYear -= 1
        } else {
          this.nowMonth -= 1
        }
        this.initDay(this.nowYear, this.nowMonth)
        this.nowMonthWeeks = []
        this.getNowMonthWeeks(this.nowYear, this.nowMonth, this.dayNum)
      },
      // 下一月
      nextMonth () {
        if (this.nowMonth === 12) {
          this.nowMonth = 1
          this.nowYear += 1
        } else {
          this.nowMonth += 1
        }
        this.initDay(this.nowYear, this.nowMonth)
        this.nowMonthWeeks = []
        this.getNowMonthWeeks(this.nowYear, this.nowMonth, this.dayNum)
      },
      // 回到今天
      backToday () {
        this.initData()
        this.nowMonthWeeks = []
        this.getNowMonthWeeks(this.nowYear, this.nowMonth, this.dayNum)
      },
      // 获取预约课程时间列表
      getAppointTime (day, index) {
        this.isActive = index
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let date = new Date().getDate()
        if (new Date(this.nowYear, this.nowMonth - 1, day).getTime() < new Date(year, month, date + 1).getTime()){
          this.$alert('只能预约今天之后的时间', { confirmButtonText: '确定' })
        } else {
          this.timeStamp = new Date(this.nowYear, this.nowMonth - 1, day).getTime() / 1000
          Hub.$emit('getFirstEvalTime', this.timeStamp)
          this.getCourseTimeList()
        }
      },
      getCourseTimeList(tz){  // 获取  一对一/首次测评 预约时间列表
        let time_zone = `time_zone=${tz}`;
        let timeStamp = `time=${this.timeStamp}`
        let url = `/api/v2/onebyone/gettimelistweb?${timeStamp}${time_zone}`;
        axios.get(url).then((response) => {
          if (response.data.errCode === 0) {
            this.courseTimeList = response.data.data
            Hub.$emit('getCourseTimeList', this.courseTimeList)
          }
        })
      },
      getTimeZone (){  // 获取时区
        const timezone = jstz.determine();
        timezone.name();
        this.timeZone = timezone.name();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .calendar
    width: 100%
    height: 182px
    background: #fff
    border-radius: 25px
    .title
      width: 191px
      height: 45px
      margin: 0 auto
      padding-top: 23px
      .months
        font-size: 22px
        text-align : center
        .icon
          cursor: pointer
          float: left
          height: 30px
        .right
          float: right
        .month
          color: #2e4374
          vertical-align : top
        .back-today
          cursor: pointer
          margin-top: 5px
          font-weight: 600
          font-size: 14px
          color: #ff7b48
    .date
      width: 897px
      height: 44px
      margin: 38px auto
      .week
        display: inline-block
        width: 20px
        height: 20px
        color: #adadad
        line-height: 30px
        margin: 0 4.46px
        border: 1px solid transparent
      .day
        display: inline-block
        width: 25px
        height: 25px
        margin: 5px 1.94px
        color: #f6c8be
        cursor: pointer
        text-align : center
        border: 1px solid transparent
        line-height: 25px
      .active
        color: #ff7b48
      .today
        color: #fff
        border-radius: 50%
        background: #2e4374
</style>
