<template>
  <transition name="cover">
      <div class="cover" v-show="coverShow" @click="isHide" v-if="item">
        <ul>
            <li class="item-main">
                <div class="info-title">
                     <p>{{typeDistinguish(item.type)}}</p>
                     <h2>{{item.title}}</h2>
                </div>
                <div class="info-time">
                     <p>上课时间：{{moment.unix(item.datetimes).format('MM月DD日 HH:mm')}}</p>
                </div>
                <div class="teacher-info">
                     <div class="teacher-img">
                          <img :src="item.headimg" alt="">
                    </div>
                    <div class="star flex">
                        <i class="icon-star-orange"></i>
                        <i class="icon-star-orange"></i>
                        <i class="icon-star-orange"></i>
                        <i class="icon-star-orange"></i>
                        <i class="icon-star-orange"></i>
                    </div>
                    <div class="teacher-text">
                        <p class="teacher-name"><span>本节老师：</span>{{item.cname}}</p>
                        <p class="teacher-school"><span>毕业院校：</span>{{item.text}}</p>
                        <p class="teacher-desc"><span>老师简介：</span>{{item.information}}</p>
                    </div>
                </div>
                <div class="classroom-btn" v-show="routerShow()">
                    <button :disabled="cs" @click="tolink(item.id,item.type)" :class="{disabled: cs}">{{classroomStatus(item.datetimes)}}</button>
                </div>
            </li>
        </ul>
      </div>
  </transition>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      coverShow: false,
      cs: ''
    };
  },
  watch: {
    $route: "routerShow"
  },
  methods: {
    typeDistinguish(item) {
      let text = "";
      switch (item) {
        case "0":
          text = "1v1";
          break;
        case "1":
          text = "1v4";
          break;
        case "2":
          text = "直播课";
          break;
        case "3":
          text = "首次测评";
          break;
      }
      return text;
    },
    routerShow() {
      if (this.$route.path === "/study/mycourse/complete") {
        return false;
      } 
      else {
        return true;
      }
    },
    classroomStatus(item){
			const newDate = new Date();
			let text='';
			let date = parseInt(item+'000');
            let startClass = date - 600000;
			if (Number(newDate) < startClass) {
				this.cs = true;
				text = '等待开课'
			}else{
				this.cs = false;
				text = '进入教室'
			}
            return text;
        },
    
    isShow() {
      this.coverShow = true;
    },
    isHide() {
      this.coverShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.cover {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  background: rgba(102, 102, 102, 0.5);
  .item-main {
    position: absolute;
    padding: 10px;
    width: 250px;
    height: 470px;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    margin-left: -125px;
    margin-top: -235px;
    background: #fff;
    .info-title {
      text-align: center;
      p {
        text-align: center;
        font-size: 18px;
        color: #ff7b48;
      }
      h2 {
        font-size: 20px;
        font-weight: 500;
        color: #ff7b48;
      }
      span {
        font-size: 14px;
        color: #999999;
      }
    }
    .info-time {
      margin-top: 10px;
      p {
        text-align: center;
        font-size: 16px;
        color: #ff7b48;
      }
    }
    .teacher-info {
      margin-top: 10px;
      .teacher-img {
        overflow: hidden;
        margin: 0 auto;
        width: 60px;
        height: 60px;
        border: 3px solid #ff7b48;
        border-radius: 100%;
        img {
          float: left;
          width: 60px;
        }
      }
      .star {
        margin: 10px auto;
        width: 125px;
        .icon-star-orange {
          display: inline-block;
          margin-right: 5px;
          width: 20px;
          height: 20px;
          background: url("../../../../static/img/icon-star-orange.png") center
            no-repeat;
        }
      }
      .teacher-text {
        font-size: 14px;
        p {
          color: #999999;
          span {
            color: #ff7b48;
          }
        }
        .teacher-desc {
          overflow: hidden;
          height: 125px;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
    .classroom-btn {
      margin-top: 20px;
      text-align: center;
      button {
        display: inline-block;
        width: 135px;
        height: 32px;
        font-size: 14px;
        line-height: 30px;
        border: 0;
        background-image: url("../../../../static/img/button.png");
        background-size: 135px 32px;
        color: #fff;
      }
    }
  }
}
&.cover-enter-active,
&.cover-leave-active {
  transition: all 1s;
}
&.cover-enter,
&.cover-leave-active {
  opacity: 0;
  background: rgba(7, 17, 27, 0);
}
</style>
