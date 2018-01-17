<template>
  <div class="reservation">
    <yt-header :navShow="true"></yt-header>
    <yt-header></yt-header>
    <div class="reservation-wrapper">
      <div class="reservation-left">
        <Calendar></Calendar>
        <div class="course-wrapper">
          <div class="title-list">
            <router-link class="title left" to="/reservation/oneByFour" v-show="userStatus">一对四课程</router-link>
            <router-link class="title right" to="/reservation/oneByOne" v-show="userStatus">一对一课程</router-link>
            <router-link class="title first" to="/reservation/firstEval" v-show="!userStatus">首次测评课</router-link>
          </div>
          <div class="course-main">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <my-lesson></my-lesson>
    </div>
    <yt-footer></yt-footer>
  </div>
</template>

<script>
  import axios from 'axios'
  import md5 from 'blueimp-md5'

  import ytHeader from '../../components/header/yt-header'
  import ytFooter from '../../components/footer/yt-footer'
  import myLesson from '../../components/common/my-lesson'
  import OneByOne from './children/onebyone'
  import OneByFour from './children/onebyfour'
  import Calendar from './children/calendar'

  export default {
    components: { ytHeader, ytFooter, myLesson, OneByOne, OneByFour, Calendar },
    data () {
      return {
        userStatus: ''
      }
    },
    mounted () {
      this.checkLogin();
      this.getUserInfo();
    },
    methods : {
      checkLogin(){
        if(!window.localStorage.getItem('id')){
          this.$router.push('/login');
        }else{
          if (!window.localStorage.getItem('child')) {
            this.$router.push('/usercenter');
          }
        }
      },
      getUserInfo () {
        let that = this;
        // md5验证
        let info = {
            'role_id': window.localStorage.getItem('child')
          },
          keys = Object.keys(info),
          i, len = keys.length;
        keys.sort();
        let p = '';
        for (i = 0; i < len; i++) {
          let k = keys[i];
          p += k + '=' + info[k] + '&';
        }
        p = p.substring(0, p.length - 1);
        let tokens = md5(`ilovewan${p}banghanchen`);
        // ajax
        let url = '/api/v1/makelesson/webteststatus';
        let config = {
          headers: {
            versions: '1',
            tokens: tokens,
          }
        }
        axios.post(url, info, config).then((response) => {
          if (response.data.data.first.status === '1') {
            that.userStatus = false
            this.$router.push('/reservation/firstEval')
          }else if (response.data.data.first.status === '2') {
            that.userStatus = true
            this.$router.push('/reservation/oneByFour')
          }else if (response.data.data.first.status === '3') {
            that.userStatus = false
            this.$router.push('/reservation/firstEval')
          }else if (response.data.data.first.status === '4') {
            this.$alert('请等待上课', '', {
              confirmButtonText: '确定',
              callback: action => {
                  this.$router.push('/study');
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .reservation
    .reservation-wrapper
      width: 1200px
      height: 662px
      top: 100px
      margin: 51px auto
      .reservation-left
        float: left
        width: 932px
        height: 662px
        .course-wrapper
          width: 100%
          height: 460px
          margin-top: 20px
          background: url("https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/course-main.png")
          .title-list
            display: flex
            width: 100%
            height: 38px
            .title
              flex: 1
              line-height: 38px
              text-align: center
              color: #adadad
              text-decoration : none
              background: #fff
            .router-link-exact-active
              color: #ff7b48
            .title:hover
              color: #ff7b48
              /*text-decoration : underline*/
            .first
              border-top-left-radius: 25px
              border-top-right-radius: 25px
              font-size: 20px
            .left
              border-top-left-radius: 25px
            .right
              border-top-right-radius: 25px
          /*.course-main*/
            /*background: */
</style>
