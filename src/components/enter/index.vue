<template>
  <router-link :to="{ path:'/study/mycourse/undone', query: { timestamp: timeStamp }}">
    <div class="enter" v-show="isShow" :class="{ 'enter-classroom': enterClassroom }"></div>
  </router-link>
</template>

<script>
  import axios from 'axios'
  import common from '../common'

  export default {
    data() {
      return {
        time: this.moment().unix(),
        enterClassroom: '',
        timeStamp: '',
        isShow: ''      //显示
      }
    },
    watch: {
      '$route': 'getOutLesson'
    },
    mounted() {
      this.getOutLesson()
    },
    methods: {
      getOutLesson() {
        let data = {
          'user_id': window.localStorage.id,
          'role_id': window.localStorage.child,
          'time': this.time
        }
        let url = '/api/v1/course/soon_course'
        let config = {
          headers: {
            tokens: common.sortMd5(data)
          }
        }
        axios.post(url, data, config).then((response) => {
          if (response.data.errCode === 0) {
            this.isShow = true
            this.timeStamp = response.data.data.datetimes
            if ((this.timeStamp - this.time) < 600) {
              this.enterClassroom = true
            }
          }
          else {
            this.isShow = false
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .enter {
    position: absolute;
    width: 112px;
    height: 112px;
    right: 70px;
    bottom: 180px;
    z-index: 999;
    cursor: pointer;
    line-height: 40px;
    text-align: center;
    background: url("../../../static/img/to-class.png");
    .cover {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
      background: rgba(102, 102, 102, .5)
    }
  }

  .enter-classroom {
    background: url("../../../static/img/enter-classroom.png");
  }
</style>
