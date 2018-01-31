<template>
  <transition name="cover">
    <div class="cover" v-show="coverIsShow" @click="coverHide">
      <div class="popup">
        <img class="img" src="https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/calendar.png">
        <div class="text">您确定预约当前选择的{{ classType }}上课时间</div>
        <div class="button-item">
          <div class="button cancel" @click="coverHide">取消</div>
          <div class="button sure" @click.stop.prevent="submitData()">确定</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import common from "../common";

export default {
  data() {
    return {
      coverIsShow: false,
      timeStamp: ""
    };
  },
  props: {
    classType: {
      type: String,
      require: true,
      default: "一对一"
    },
    courseId: {
      type: String,
      require: true,
      default: ""
    }
  },
  methods: {
    coverShow(timeStamp) {
      this.timeStamp = timeStamp;
      this.coverIsShow = true;
    },
    coverHide() {
      this.coverIsShow = false;
    },
    submitData() {
      this.coverIsShow = false;
      if (this.$route.path === "/reservation/oneByOne") {
        //   一对一接口
        let url = "/api/v1/onebyone/webmakeclass";
        let data = {
          time: this.timeStamp,
          role_id: window.localStorage.child
        };
        let config = {
          headers: {
            versions: "1",
            tokens: common.sortMd5(data),
            as: 3
          }
        };
        axios.post(url, data, config).then(response => {
          if (response.data.errCode === 70001) {
            this.$alert(response.data.errMsg, {
              confirmButtonText: "确定"
            });
          } else if (response.data.errCode === 70002) {
            this.$alert(response.data.errMsg, {
              confirmButtonText: "确定"
            });
          } else {
            this.$alert(response.data.errMsg, {
              confirmButtonText: "确定"
            });
          }
        });
      } else if (this.$route.path === "/reservation/firstEval") {
        // 首次测评接口
        let url = "/api/v1/makelesson/webtestlesson";
        let data = {
          time: this.timeStamp,
          role_id: window.localStorage.child
        };
        let config = {
          headers: {
            versions: "1",
            tokens: common.sortMd5(data),
            as: 3
          }
        };
        axios.post(url, data, config).then(response => {
          console.log(this.timeStamp);
          if (response.data.errCode === 0) {
            this.$alert(response.data.errMsg, {
              confirmButtonText: "确定"
            });
          } else {
            this.$alert(response.data.errMsg, {
              confirmButtonText: "确定"
            });
          }
        });
      } else if (this.$route.path === "/reservation/oneByFour") {
        // 一对四接口
        let url = "/api/v1/web_onefouryuyue";
        let data = {
          user_id: window.localStorage.id, //	用户id
          statusid: this.courseId,
          role_id: window.localStorage.child
        };
        let config = {
          headers: {
            versions: "1",
            tokens: common.sortMd5(data),
            as: 3
          }
        };
        axios.post(url, data, config).then(response => {
          if (response.data.errCode === 0) {
            this.$alert(response.data.errMsg, {
              confirmButtonText: "确定"
            });
          } else if (response.data.errCode === 60004) {
            this.$alert(response.data.errMsg, {
              confirmButtonText: "确定"
            });
          } else {
            this.$alert(response.data.errMsg, {
              confirmButtonText: "确定"
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.cover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(102, 102, 102, 0.5);
  z-index: 1000;

  &.cover-enter-active, &.cover-leave-active {
    transition: all 1s;
  }

  &.cover-enter, &.cover-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }

  .popup {
    position: absolute;
    width: 500px;
    height: 400px;
    top: 50%;
    left: 50%;
    z-index: 10000;
    border-radius: 10px;
    margin-left: -250px;
    margin-top: -200px;
    padding: 20px;
    background: #fff;

    .img {
      width: 240px;
      height: 160px;
      margin: 20px 110px;
    }

    .text {
      text-align: center;
    }

    .button-item {
      margin-top: 60px;

      .button {
        display: inline-block;
        width: 200px;
        height: 44px;
        color: #fff;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
      }

      .cancel {
        float: left;
        margin-left: 10px;
        background: url('../../../static/img/icon-reservation-button-cancel.jpg') no-repeat;
      }

      .sure {
        float: right;
        margin-right: 10px;
        background: url('../../../static/img/icon-reservation-button-sure.png');
      }
    }
  }
}
</style>
