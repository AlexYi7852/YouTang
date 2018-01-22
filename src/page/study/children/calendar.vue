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
      <div class="week" v-for="week in weeks" :key="week.index">{{ week }}</div>
      <div :class="{ 'today': n === nowDay + day && nowMonth === new Date().getMonth() + 1 && nowYear === new Date().getFullYear(),
            'absent-course': keys.indexOf(n - day) !== -1}" @click="getCourseInfo(n - day)"
           class="day" v-if="n <= dayNum + day" v-for="n in 45" :key="n">{{ n <= day ? '' : n - day }}</div>
      <courseInfo :item="courseInfo" ref="courseInfo"></courseInfo>
    </div>
    <div class="class-time">
      <!--<img src="">-->
      <span class="text">本月周六上课</span>
    </div>
    <div class="switch-mode clearfix">
      <router-link :to="routerLink">
        <el-button>切换时间轴模式</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import common from "../../../components/common";
import courseInfo from "../children/courseInfo";
export default {
  components: { courseInfo },
  data() {
    return {
      nowDay: "", // 今天
      dayNum: "", // 当月天数
      nowYear: "", // 今年
      nowMonth: "", // 这月
      timeStamp: [], // 时间戳
      keys: [], // 未上课程日期
      routerLink: '',
      absentCourseList: "", // 未上课程列表
      courseInfo: "", // 单个课程信息
      weeks: ["日", "一", "二", "三", "四", "五", "六"]
    };
  },
  computed: {
    day() {
      return new Date(this.nowYear, this.nowMonth - 1, 1).getDay();
    }
  },
  mounted() {
    this.initData();
    this.getAbsentCourseList();
    this.changeLink()
  },
  methods: {
    changeLink(){
      if (this.$route.path === '/study/mycourse/readUndone') {
        this.routerLink = '/study/mycourse/undone'
      }
      else {
        this.routerLink = '/study/mycourse/complete'
      }
    },
    getAbsentCourseList() {
      this.timeStamp = new Date(this.nowYear, this.nowMonth - 1).getTime() / 1000;
      let data = {
        user_id: window.localStorage.child,
        mouth: this.timeStamp
      };
      let config = {
        headers: {
          versions: "1",
          tokens: common.sortMd5(data),
          as: 3
        }
      };
      if (this.$route.path === "/study/mycourse/readUndone" || this.$route.path === "/study/mycourse/undone") {
        let url = "/api/v1/course/weboutlesson";
        axios.post(url, data, config).then(response => {
          if (response.data.errCode === 0) {
            this.absentCourseList = response.data.data;
            let keys = Object.keys(this.absentCourseList);
            for (let i = 0; i < keys.length; i++) {
              this.keys.push(parseInt(keys[i]));
            }
          }
        });
      } else {
        let url = "/api/v1/course/webyeslesson";
        axios.post(url, data, config).then(response => {
          if (response.data.errCode === 0) {
            this.absentCourseList = response.data.data;
            let keys = Object.keys(this.absentCourseList);
            for (let i = 0; i < keys.length; i++) {
              this.keys.push(parseInt(keys[i]));
            }
          } else if (response.data.errCode == 60002) {
            this.items = "";
            this.$alert("本月没有已上的课程", "系统提示", {
              confirmButtonText: "确定"
            });
          }
        });
      }
    },
    initData() {
      // 初始化数据
      let date = new Date();
      this.nowYear = date.getFullYear();
      this.nowMonth = date.getMonth() + 1;
      this.nowDay = date.getDate();
      this.getMonthDayNum(this.nowYear, this.nowMonth);
    },
    getCourseInfo(day) {
      this.$refs.courseInfo.isShow();
      this.courseInfo = this.absentCourseList[day][1];
    },
    getMonthDayNum(year, month) {
      // 获取当月天数
      this.dayNum = new Date(year, month, 0).getDate();
    },
    nextMonth() {
      if (this.nowMonth === 12) {
        this.nowYear += 1;
        this.nowMonth = 1;
      } else {
        this.nowMonth += 1;
      }
      this.getMonthDayNum(this.nowYear, this.nowMonth);
    },
    prevMonth() {
      if (this.nowMonth === 1) {
        this.nowYear -= 1;
        this.nowMonth = 12;
      } else {
        this.nowMonth -= 1;
      }
      this.getMonthDayNum(this.nowYear, this.nowMonth);
    },
    backToday() {
      this.initData();
    }
  }
};
</script>


<style lang="stylus" scoped>
.new-calendar {
  padding: 20px;

  .top {
    width: 100%;
    height: 100px;

    .title {
      width: 280px;
      height: 30px;
      text-align: center;
      margin: 0 auto;
      padding-top: 30px;

      .icon {
        cursor: pointer;
        float: left;
        height: 30px;
      }

      .right {
        float: right;
      }

      .time {
        font-size: 20px;
        color: #667599;
      }

      .back-today {
        cursor: pointer;
        color: #ff7b48;
      }
    }
  }

  .days {
    width: 700px;
    height: 440px;
    margin: 0 auto;

    .week {
      display: inline-block;
      width: 100px;
      height: 80px;
      line-height: 80px;
      color: #585858;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    }

    .day {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin: 10px 30px;
      line-height: 40px;
      color: 3d 3533;
      font-size: 20px;
      text-align: center;
    }

    .today {
      color: #fff;
      border-radius: 50%;
      background: #2e4374;
    }

    .absent-course {
      width: 50px;
      height: 50px;
      cursor: pointer;
      margin: 5px 25px;
      line-height: 50px;
      border-radius: 50%;
      background: #f6c8be;
    }
  }

  .class-time {
    width: 100px;
    height: 35px;
    color: #ff7b48;
    margin-top: 10px;

    .text {
      line-height: 35px;
    }
  }

  .switch-mode {
    margin-top: -24px;

    .el-button {
      float: right;
      padding: 0;
      width: 126px;
      height: 28px;
      line-height: 28px;
      border: 1px solid #ff7b48;
      border-radius: 8px;
      background-color: transparent;
      color: #ff7b48;
      cursor: pointer;
    }
  }
}
</style>
