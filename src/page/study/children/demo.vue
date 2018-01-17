<template>
  <div class="date_picker_wrap">
    <p>{{ nowDate }}</p>
    <div class="date_picker_top dis-box flex-vc">
      <div @click="showPrevMonth" class="pre_btn">&lt;</div>
      <div class="now_date">{{ nowYear + '年' + nowMonth + '月' }}</div>
      <div @click="showNextMonth" class="nect_btn">&gt;</div>
    </div>
    <div class="date_picker_mid  dis-box">
      <span class="flex1" :key="index" v-for="(item,index)  in dayList">{{ item }}</span>
    </div>
    <div class="date_picker_btm">
      <!--  day 表示 当前这周的第几天，然后第一行前面空几个开始填充数字   -->
      <span @click="selectDay(n - day)" v-if="n <= dayNum + day" :class="{ nowDay : n === (getDay + day) && isToday }"
            :key="n" v-for="n  in 50">{{ n <= day? '' : n - day }}</span>
    </div>
  </div>
</template>
<script>

    export default {
        name: "datePicker",
        data() {
            return {
                nowDate: '',
                dayNum: 0, //当月天数
                nowYear: '',
                nowMonth: '',
                dayList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            }
        },
        computed: {
            day() {  // 当前月份第一天是星期几,也就是当前这周的第几天，然后前面空几个
                return new Date(this.nowYear, this.nowMonth - 1, 1).getDay();
            },
            getDay() { //今天是当月的第几天
                return new Date().getDate();
            },
            isToday() { // 判断是否是今年 以及 今月
                let date = new Date();
                return (this.nowYear == date.getFullYear() && this.nowMonth == date.getMonth() + 1)

            }
        },
        mounted() {
            this.initTitle();
            this.initDay(this.nowYear, this.nowMonth);
        },
        methods: {
            initTitle() {
                let date = new Date();
                this.nowYear = date.getFullYear();
                this.nowMonth = date.getMonth() + 1;
            },
            initDay(nowYear, nowMonth) {
                this.dayNum = this.getNowMonDays(nowYear, nowMonth);
            },
            // 获取当月的天数
            getNowMonDays(year, month) {
                return new Date(year, month, 0).getDate()
            },
            //是不是闰年
            isLeepYear(y) {
                return ((y % 4 == 0 && y % 100 != 0) ? true : (y % 400 == 0))
            },
            showPrevMonth() {
                let nowM = this.nowMonth;
                if (nowM == 1) {
                    this.nowMonth = 12;
                    this.nowYear -= 1;
                } else {
                    this.nowMonth -= 1;
                }
                this.initDay(this.nowYear, this.nowMonth);
                console.log(this.nowMonth + '月有' + this.dayNum + '天')
            },
            showNextMonth() {
                let nowM = this.nowMonth;
                if (nowM == 12) {
                    this.nowMonth = 1;
                    this.nowYear += 1;
                } else {
                    this.nowMonth += 1;
                }
                this.initDay(this.nowYear, this.nowMonth);
                console.log(this.nowMonth + '月有' + this.dayNum + '天')
            },
            selectDay(day) {
                this.nowDate = this.nowYear + '-' + this.nowMonth + '-' + day;
            }

        }

    }
</script>
<style lang="scss" scoped>
  .date_picker_wrap {
    width: 90%;
    margin: 0 auto;
    font-size: 18px;
    .now_date {
      width: 90%;
      text-align: center;
    }
    .date_picker_btm {
      padding-top: 0;
      span {
        float: left;
        width: 14.285%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        &:nth-of-type(7n),
        &:nth-of-type(7n + 1) {
          color: #ff0000
        }
      }
      .nowDay {
        color: #fff;
        background: #ff0000;
        border-radius: 100px;
      }

    }
  }
</style>
