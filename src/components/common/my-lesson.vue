<template>
  <div class="lesson-box">
    <ul class="lesson-select flex">
      <li @click="selectFocus(1)">
        <span :class="num===1?'focus':''">1对4</span>
      </li>
      <li @click="selectFocus(2)">
        <span :class="num===2?'focus':''">1对1</span>
      </li>
    </ul>
    <div class="lesson-main" :class="{ 'reservation-background': reservationBackground }">
      <div class="lesson-info" v-show="tab">
        <div class="table">
          <div class="item">
            <p>已获得</p>
            <span>{{lessonOnebyfour.total}}课时</span>
          </div>
          <div class="item">
            <p>已消耗</p>
            <span>{{lessonOnebyfour.balance}}课时</span>
          </div>
          <div class="item">
            <p>剩余</p>
            <span>{{lessonOnebyfour.now}}课时</span>
          </div>
        </div>
      </div>
      <div class="lesson-info" v-show="!tab">
        <div class="table">
          <div class="item">
            <p>已获得</p>
            <span>{{lessonOnebyone.total}}课时</span>
          </div>
          <div class="item">
            <p>已消耗</p>
            <span>{{lessonOnebyone.balance}}课时</span>
          </div>
          <div class="item">
            <p>剩余</p>
            <span>{{lessonOnebyone.now}}课时</span>
          </div>
        </div>
      </div>
      <div class="buy-course">
        <router-link class="buy-btn" to="/cart">购买课程</router-link>
        <!-- <span>or</span>
        <router-link class="key-btn" to="">充值兑换</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'blueimp-md5'
  import axios from 'axios'

  export default {
    data() {
      return {
        lessonOnebyone: {},
        lessonOnebyfour: {},
        num: 1,
        tab: true,
        reservationBackground: false
      }
    },
    mounted() {
      this.changeBackground()
      this.lessonbalance();
    },
    methods: {
      changeBackground () {
        if (this.$route.path.indexOf('reservation') !== -1) {
          this.reservationBackground = true
        }
        console.log(this.reservationBackground)
      },
      selectFocus(num) {
        if (num === 1) {
          this.num = num;
          this.tab = true;
        } else {
          this.num = num;
          this.tab = false;
        }
      },
      lessonbalance() {
        let that = this;
        // md5验证
        let user_id = {
            'user_id': window.localStorage.getItem('id')
          },
          keys = Object.keys(user_id),
          i, len = keys.length;
        keys.sort();
        let p = '';
        for (i = 0; i < len; i++) {
          let k = keys[i];
          p += k + '=' + user_id[k] + '&';
        }
        p = p.substring(0, p.length - 1);
        let tokens = md5(`ilovewan${p}banghanchen`);
        // ajax
        let url = `/api/v1/user/lessonbalance?${p}`;
        let config = {
          headers: {
            versions: '1',
            tokens: tokens,
          }
        }
        axios.get(url, user_id, config)
          .then(function (response) {
            if (response.data.errCode == 0) {
              that.lessonOnebyfour = response.data.data.onebyfour;
              that.lessonOnebyone = response.data.data.onebyone;
            } else {
              console.log('没有数据');
            }
          })
      }
    }
  }
</script>


<style lang="less" scoped>
  .lesson-box {
    float: right;
    overflow: hidden;
    width: 250px;
    height: 660px;
    border-radius: 20px;
    background-color: #fff;
    .lesson-select {
      width: 100%;
      height: 38px;
      box-shadow: 0px 5px 8px #f6f5f5;
      li {
        width: 50%;
        line-height: 38px;
        text-align: center;
        span {
          font-size: 16px;
          color: #999999;
          cursor: pointer;
        }
        .focus {
          color: #ff7b48;
          border-bottom: 1px solid #ff7b48;
        }
      }
    }
    .reservation-background {
      background-image: url("../../../static/img/240380.png") !important;
    }
    .lesson-main {
      position: relative;
      width: 100%;
      height: 660px - 35px;
      background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/lesson-bg.png');
      background-position: 0px bottom;
      background-size: 250px 380px;
      background-repeat: no-repeat;
      .table {
        padding: 30px 20px 0;
        .item {
          margin-bottom: 40px;
          p {
            font-size: 16px;
            color: #2e4374;
          }
          span {
            font-size: 24px;
            color: #ff7b48;
          }
        }
      }
    }
    .buy-course {
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      text-align: center;
      .buy-btn {
        display: block;
        margin: 0 auto;
        width: 188px;
        height: 44px;
        text-align: center;
        background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/lesson-buy-btn.png');
        background-repeat: no-repeat;
        color: #fff;
        line-height: 40px;
        font-size: 16px;
      }
      span {
        display: block;
        font-size: 14px;
        color: #ff7b48;
      }
      .key-btn {
        display: inline-block;
        border-bottom: 1px solid #ff7b48;
        text-align: center;
        font-size: 18px;
        color: #ff7b48;
      }
    }
  }
</style>
