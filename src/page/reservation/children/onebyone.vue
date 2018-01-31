<template>
  <div class="oneByOne">
    <Cover ref="cover"></Cover>
    <ul class="course-item">
      <li class="course-time" :class="{ 'cannot-appoint': course.status == 2 }" @click="coverShow(course.time)" v-for="(course, index) in courseTimeList" :key="index">{{ course.time }}</li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import jstz from 'jstz'
  import Hub from '../../../components/hub'
  import Cover from '../../../components/cover/index'

  export default {
    components: { Cover },
    data () {
      return {
        timeZone: '',  // 获取时区
        timeStamp: '', // 获取预约时间戳
        courseTimeList: '',
        getFirstEvalTime: this.moment().unix() + 86400
      }
    },
    mounted () {
      this.getTimeZone()
      Hub.$on('getCourseTimeList', (courseTimeList) => {
        this.courseTimeList = courseTimeList
      })
      Hub.$on('getFirstEvalTime', (getFirstEvalTime) => {
        this.getFirstEvalTime = getFirstEvalTime
      })
    },
    methods: {
      initData () {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        this.timeStamp = new Date(year, month, day + 1).getTime() / 1000
        this.getCourseTimeList(this.timeZone)
      },
      getCourseTimeList(tz){  // 获取  一对一/首次测评 预约时间列表
        let time_zone = `time_zone=${tz}`;
        let timeStamp = `time=${this.timeStamp}`
        let url = `/api/v2/onebyone/gettimelistweb?${timeStamp}&${time_zone}`;
        axios.get(url).then((response) => {
          if (response.data.errCode === 0) {
            this.courseTimeList = response.data.data
            Hub.$emit('getInitCourseTimeList', this.courseTimeList)
          }
        })
      },
      getTimeZone (){  // 获取时区
        const timezone = jstz.determine();
        timezone.name();
        this.timeZone = timezone.name();
        this.initData()
      },
      coverShow (time) {
        let ymd = this.moment.unix(this.getFirstEvalTime).format('YYYY-MM-DD')
        let date = ymd + ' ' + time
        this.timeStamp = this.moment(date).unix()
        this.$refs.cover.coverShow(this.timeStamp)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .oneByOne
    .course-item
      list-style: none
      width: 840px
      height: 340px
      margin: 41px auto
      padding: 0
      .course-time
        list-style: none
        cursor: pointer
        display: inline-block
        width: 51px
        text-align : center
        margin: 32.5px 44.5px
        /*padding: 38.5px 45.5px*/
        color: #ff7b48
      .cannot-appoint
        pointer-events: none
        color: #adadad !important
</style>
