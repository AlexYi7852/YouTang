<template>
  <div class="oneByFour">
    <Cover :classType="classType" :courseId="courseId" ref="cover"></Cover>
    <div class="select-cycle">
      <div class="title">选择周期</div>
      <div class="month-item">
        <div class="month" :class="{ active: monthValue === index }" @click="active(index)" v-for="(month, index) in months" :key="index">{{ month }}</div>
      </div>
    </div>
    <div class="select-time">
      <div class="title">选择上课时间</div>
      <div class="time-item">
        <div class="background" v-for="(course, index) in courseList" :key="index">
          <div class="times">
            <div class="time-main">
              <span class="week">{{ course.title_0 }}</span>
              <span class="time">{{ course.time_0 }}</span>
            </div>
            <div class="time-main">
              <span class="week">{{ course.title_1 }}</span>
              <span class="time">{{ course.time_1 }}</span>
            </div>
            <div class="button" @click="coverShow(course.id)">我要上课</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Cover from '../../../components/cover/index'
  export default {
    components: { Cover },
    data () {
      return {
        monthValue: '',
        courseList: '',
        courseId: '',
        classType: '一对四',
        months: [ '1个月', '3个月', '6个月', '12个月' ]
      }
    },
    created () {
      this.getCourseList()
    },
    methods: {
      active (index) {
        this.monthValue = index
      },
      coverShow (id) {
        this.courseId = id
        this.$refs.cover.coverShow()
      },
      getCourseList () {
        let url = "/api/v1/fourtimelist"
        axios.get(url).then((response) => {
          if (response.data.errCode === 0) {
            this.courseList = response.data.data
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .oneByFour
    padding: 20px
    .select-cycle
      width: 100%
      height: 100px
      margin-top: 20px
      .title
        color: #999
      .month-item
        width: 892px
        height: 40px
        .month
          display: inline-block
          width: 150px
          height: 40px
          cursor: pointer
          text-align: center
          line-height: 40px
          margin: 15px 35.5px
          color: #ff7b48
          border-radius: 20px
          border: 1px solid #ff7b48
        .month:hover
          color: #fff
          background: #ff7b48
        .active
          color: #fff
          background: #ff7b48
    .select-time
      width: 100%
      height: 222px
      margin-top: 20px
      .title
        color: #999
      .time-item
        width: 100%
        height: 220px
        margin: 25px 0
        .background
          display: inline-block
          position: relative
          width: 220px
          height: 180px
          margin: 0 38.5px
          border-radius: 10px
          background: #fff
          .times
            position: absolute
            width: 220px
            height: 180px
            bottom: 5px
            right: 5px
            border-radius: 10px
            border: 1px solid #ff7b48
            .time-main
              text-align : center
              color: #faded8
              margin: 24px
            .button
              width: 140px
              height: 40px
              color: #fff
              cursor: pointer
              text-align : center
              line-height: 40px
              margin: 0 auto
              background: url("../../../../static/img/button.png")
</style>
