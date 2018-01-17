<template>
  <div class="new-calendar">
    <div class="top">
      <div class="title">
        <img src="../../../../static/img/prev.png" class="icon" @click="prevMonth">
        <span class="time">{{ nowYear }}年{{ nowMonth }}月</span>
        <img src="../../../../static/img/next.png" class="icon right" @click="nextMonth">
        <div class="back-today" @click="backToday">回到今天</div>
      </div>
    </div>
    <div class="days">
      <div class="week" v-for="week in weeks">{{ week }}</div>
      <div :class="{ 'today': n === nowDay + day && nowMonth === new Date().getMonth() + 1 && nowYear === new Date().getFullYear(),
            'absent-course': keys.indexOf(n - day) !== -1}" @click="getCourseInfo(n - day)"
           class="day" v-if="n <= dayNum + day" v-for="n in 45" :key="n">{{ n <= day ? '' : n - day }}</div>
      <courseBox :child-msg="courseInfo" v-show="isCourseShow"></courseBox>
    </div>
    <div class="class-time">
      <!--<img src="">-->
      <span class="text">本月周六上课</span>
    </div>
  </div>
</template>

<script>
  import md5 from 'blueimp-md5'
  import axios from 'axios'
  import courseBox from '../../../components/common/course-info'
  export default {
    components: { courseBox },
    data () {
      return {
        nowDay: '',  // 今天
        dayNum: '',  // 当月天数
        nowYear: '', // 今年
        nowMonth: '', // 这月
        timeStamp: [],  // 时间戳
        keys: [],   // 未上课程日期
        absentCourseList: '',  // 未上课程列表
        courseInfo: '',  // 单个课程信息
        isCourseShow: '',
        weeks: [ '日', '一', '二', '三', '四', '五', '六' ]
      }
    },
    computed: {
      day () {
        return new Date(this.nowYear, this.nowMonth - 1, 1).getDay()
      }
    },
    mounted () {
      this.initData()
      this.getAbsentCourseList()
    },
    methods: {
      getAbsentCourseList () {
        this.timeStamp = new Date(this.nowYear, this.nowMonth - 1).getTime() / 1000
        let url = '/api/v1/course/weboutlesson'
        let data = {
          'user_id': window.localStorage.id,
          'mouth':  this.timeStamp
        },
        keys = Object.keys(data),
          i, len = keys.length;
        keys.sort()
        let p = '';
        for (i = 0; i < len; i++) {
          let k = keys[i]
          p += k + '=' + data[k] + '&'
        }
        p = p.substring(0, p.length - 1)
        let tokens = md5('ilovewan' + p + 'banghanchen');
        let config = {
          headers: {
            versions: '1',
            tokens: tokens,
            as: 3
          }
        }
        console.log(data)
        axios.post(url, data, config).then((response) => {
          if (response.data.errCode === 0) {
            this.absentCourseList = response.data.data
            let keys = Object.keys(this.absentCourseList)
            for (let i = 0; i < keys.length; i++) {
              this.keys.push(parseInt(keys[i]))
            }
          }
        })
      },
      initData () {  // 初始化数据
        let date = new Date()
        this.nowYear = date.getFullYear()
        this.nowMonth = date.getMonth() + 1
        this.nowDay = date.getDate()
        this.getMonthDayNum(this.nowYear, this.nowMonth)
      },
      getCourseInfo (day) {
        this.courseInfo = this.absentCourseList[day]
        this.isCourseShow = true
        console.log(this.courseInfo)
      },
      getMonthDayNum (year, month) {   // 获取当月天数
        this.dayNum = new Date(year, month, 0).getDate()
      },
      nextMonth () {
        if (this.nowMonth === 12) {
          this.nowYear += 1
          this.nowMonth = 1
        }
        else {
          this.nowMonth += 1
        }
        this.getMonthDayNum(this.nowYear, this.nowMonth)
      },
      prevMonth () {
        if (this.nowMonth === 1) {
          this.nowYear -= 1
          this.nowMonth = 12
        }
        else {
          this.nowMonth -= 1
        }
        this.getMonthDayNum(this.nowYear, this.nowMonth)
      },
      backToday () {
        this.initData()
      }
    }
  }

</script>


<style lang="stylus" scoped>
  .new-calendar
    padding: 20px
    .top
      width: 100%
      height: 100px
      .title
        width: 280px
        height: 30px
        text-align: center
        margin: 0 auto
        padding-top: 30px
        .icon
          cursor: pointer
          float: left
          height: 30px
        .right
          float: right
        .time
          font-size: 20px
          color: #667599
        .back-today
          cursor: pointer
          color: #ff7b48
    .days
      width: 700px
      height: 440px
      margin: 0 auto
      .week
        display: inline-block
        width: 100px
        height: 80px
        line-height: 80px
        color: #585858
        font-size: 20px
        font-weight: 600
        text-align: center
      .day
        display: inline-block
        width: 40px
        height: 40px
        margin: 10px 30px
        line-height: 40px
        color: 3d3533
        font-size: 20px
        text-align: center
      .today
        color: #fff
        border-radius: 50%
        background: #2e4374
      .absent-course
        width: 50px
        height: 50px
        cursor: pointer
        margin: 5px 25px
        line-height: 50px
        border-radius: 50%
        background: #f6c8be
    .class-time
      width: 100%
      height: 35px
      color: #ff7b48
      margin-top: 10px
      .text
        line-height: 35px
</style>
