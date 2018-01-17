<template>
  <transition name="nav">
    <el-header v-show="navShow">
      <div class="header-container flex">
        <div class="logo">
          <a href="/cn"><img src="../../../static/img/logo.png"></a>
        </div>
        <nav class="nav">
          <ul class="nav-menu clearfix">
            <li>
              <router-link to="/cn" active-class="router-link-active">首页</router-link>
            </li>
            <li>
              <router-link to="/curriculum" active-class="router-link-active">课程介绍</router-link>
            </li>
            <li>
              <router-link to="/client" active-class="router-link-active">下载客户端</router-link>
            </li>
            <li>
              <router-link to="/information" active-class="router-link-active">有偿信息</router-link>
            </li>
          </ul>
        </nav>
        <div class="null"></div>
      </div>
      <div class="user-info" v-if="checkLogin()">
        <div class="user-info-nav">
          <router-link to="/usercenter">
            <div class="user-img" @click="toggle()">
              <img :src="users.headimg" alt="">
            </div>
          </router-link>
          <el-collapse-transition>
            <div class="slider-nav" v-show="toggleShow">
              <ul class="nav-menu">
                <li>
                  <router-link to="/study/mycourse" active-class="router-link-active">我的课程</router-link>
                </li>
                <li>
                  <router-link to="/reservation" active-class="router-link-active">预约课程</router-link>
                </li>
                <li>
                  <router-link to="/study/myscore" active-class="router-link-active">我的成绩</router-link>
                </li>
                <li>
                  <a class="#" @click="close()">退出</a>
                </li>
              </ul>
            </div>
          </el-collapse-transition>
        </div>
      </div>
      <div class="login" v-else>
        <ul class="flex">
          <li>
            <router-link to="/login">登录</router-link>
          </li>
          <li>
            <router-link to="/login">注册</router-link>
          </li>
        </ul>
      </div>
    </el-header>
  </transition>
</template>

<script>
  import md5 from 'blueimp-md5'
  import axios from 'axios'

  export default {
    data() {
      return {
        users: '',
        toggleShow: true,
        scrollY: 0
      }
    },
    mounted() {
      this.checkLogin();
      this.studentInfo();
    },
    props: {
      navShow: {
        type: Boolean
      }
    },
    watch: {
      "$route": "checkLogin"
    },
    methods: {
      checkLogin() {
        if (!window.localStorage.getItem('id')) {
          return false;
        } else {
          return true;
        }
      },
      close() {
        window.localStorage.clear();
        this.$router.push('/login');
      },
      studentInfo() {
        let that = this;
        let ls = window.localStorage.getItem('id');
        // md5验证
        let studentInfo = 'id=' + ls
        let tokens = md5('ilovewan' + studentInfo + 'banghanchen');
        // ajax
        let url = '/api/v1/web_studentuser_info?' + studentInfo;
        let config = {
          headers: {
            versions: '1',
            tokens: tokens,
          }
        }
        axios.get(url, studentInfo, config)
          .then(function (response) {
            that.users = response.data.data;
            if (that.users.headimg == '') {
              that.users.headimg = 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/default-avatar.jpg';
            }
          })
      },
      navScroll() {
        this.navShow = true
      },
      toggle(){
        // this.toggleShow = !this.toggleShow;
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-header {
    width: 100%;
    height: 70px;
    &.nav-enter-active, &.nav-leave-active{
      transition: .3s linear
    }
    &.nav-enter, &.nav-leave-active{
      transform: translateY(-100px)
    }
    .header-container {
      margin: 0 auto;
      width: 900px;
      height: 70px;
      background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/header-bg.png');
    }
    .logo {
      margin-left: 35px;
      width: 55px;
      line-height: 65px;
      img {
        vertical-align: middle;
        display: inline-block;
        max-width: 100%;
      }
    }
    .nav {
      padding: 0 60px;
      width: 900px - 110px;
      height: 70px;
      .nav-menu {
        width: 100%;
        li {
          list-style: none;
          float: left;
          width: 100%/4;
          a {
            display: block;
            padding: 0 15px;
            width: 100%;
            line-height: 60px;
            text-align: center;
            font-size: 16px;
            color: #FF6325;
            border-top: 6px solid #fff;
          }
          .router-link-active {
            color: #2e4374;
            background-color: #fbccc2;
            border-top: 6px solid #fb7e3e;
          }
        }
      }
    }
    .null {
      margin-right: 35px;
      width: 55px;
    }
    .login {
      position: absolute;
      top: 15px;
      right: 2%;
      width: 100px;
      height: 34px;
      background: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/components-loginbg.png') center no-repeat;
      ul {
        padding: 0 5px;
        li {
          width: 50%;
          text-align: center;
          a {
            display: inline-block;
            font-size: 14px;
            line-height: 30px;
            color: #2e4374;
          }
        }
      }
    }
    .user-info {
      position: absolute;
      top: 15px;
      right: 2%;
      width: 70px;
      .user-img {
        position: absolute;
        top: 0px;
        width: 70px;
        height: 70px;
        background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/user-avatarbg.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 100%;
        overflow: hidden;
        cursor: pointer;
        img {
          padding: 2px 3px 0px 4px;
          border-radius: 100%;
        }
      }
      .slider-nav {
        margin-top: 35px;
        padding: 45px 5px 10px;
        height: 175px;
        background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/user-navbg.png');
        background-repeat: no-repeat;
        background-position: center bottom;
        ul {
          li {
            margin-bottom: 10px;
            text-align: center;
            a {
              font-size: 14px;
              color: #2e4374;
              cursor: pointer;
            }
            .router-link-active {
              color: #ffd7a4;
            }
          }
        }
      }
    }
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
