<template>
  <div class="home" ref="home" v-on:mousewheel="changePage">
    <div class="back-top" @click="backTop"></div>
    <transition name="move">
      <div v-show="lastPage === 0" class="page one" :class="{ 'page-down ': pageDown, 'page-up': pageUp }">
        <ytHeader :navShow="navShow"></ytHeader>
      </div>
    </transition>
    <transition name="move">
      <div v-show="lastPage === 1" class="page two" :class="{ 'page-down ': pageDown, 'page-up': pageUp }"> </div>
    </transition>
    <transition name="move">
      <div v-show="lastPage === 2" class="page three" :class="{ 'page-down ': pageDown, 'page-up': pageUp }">
        <div class="wrapper">
          <div class="top">
            <div class="title">我们的优势</div>
            <span class="text">自主研发教材，名校老师授课多元化课程形式，<br>满足个性化学习需求</span>
          </div>
          <div class="main">
            <div class="main-wrapper" v-for="main in mainList">
              <img :src="main.img" class="img"><br>
              <span class="text">{{ main.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="move">
      <div v-show="lastPage === 3" class="page four" :class="{ 'page-down ': pageDown, 'page-up': pageUp }">
        <div class="wrapper">
          <div class="top">
            <div class="title">精选优质教师</div>
            <div class="text">著名高校和重点中学的优秀老师为学生授课<br>让孩子们在快乐中学习汉语，感受汉语言的美妙</div>
          </div>
          <div class="main">
            <div class="main-wrapper">
              <p class="title">严格筛选</p>
              <div class="text"><span>三轮</span>面试，全面评估老师综合素质<br>和能力<br>录取率低于<span>10%</span>,
                '优中选优，只<br>选最合适的老师<br>多轮<span>在线试讲</span>，教学专业度和课堂<br>感染力双轨评审
              </div>
              <img src="../../../static/img/eval-01.png" class="img">
            </div>
            <div class="main-wrapper">
              <p class="title">专业培训</p>
              <div class="text">入职后三个月内，累计<span>100小时</span><br>培训<br>线上教学<span>模拟演练</span>，
                教学方法定<br>期研讨<br>儿童<span>心理学</span>和教育理论学习,文<br>化素养扩展
              </div>
              <img src="../../../static/img/eval-02.png" class="img">
            </div>
            <div class="main-wrapper">
              <p class="title">系统考核</p>
              <div class="text">实行老师等级晋升以及末位<span>淘汰</span><br>机制<br>每三个月对老师的综合表现进行<br>
                <span>全面考评</span><br>授课质量<span>持续督查</span>, 家长及学员<br>的反馈及时落实
              </div>
              <img src="../../../static/img/eval-03.png" class="img">
            </div>
          </div>
          <div class="cover"></div>
        </div>
      </div>
    </transition>
    <transition name="move">
      <div v-show="lastPage === 4" class="page five" :class="{ 'page-down ': pageDown, 'page-up': pageUp }">
        <div class="teacher-wrapper">
          <div class="teacher-item"></div>
          <div class="teacher-item"></div>
          <div class="teacher-item"></div>
          <div class="teacher-item"></div>
          <div class="teacher-item"></div>
          <div class="teacher-item"></div>
        </div>
      </div>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
  import ytHeader from '../../components/header/yt-header'

  export default {
    components: { ytHeader },
    data () {
      return {
        pageDown: false,
        pageUp: false,
        lastPage: 0,
        navShow: true,
        mainList: [
          {img: '../../../static/img/main-01.jpg', text: '生动有趣的学习体验'},
          {img: '../../../static/img/main-02.jpg', text: '零距离在线课堂'},
          {img: '../../../static/img/main-03.jpg', text: '经验丰富的专业师资'},
          {img: '../../../static/img/main-04.jpg', text: '个性化启发式教学'},
          {img: '../../../static/img/main-05.jpg', text: '多主题文化拓展课程'},
          {img: '../../../static/img/main-06.jpg', text: '快速掌握600字词'}
        ]
      }
    },
    created () {

    },
    mounted () {
    },
    methods: {
      backTop () {
        this.$refs.home.scrollTop = 0
        this.lastPage = 0
        this.navShow = true
      },
      changePage (event) {
        if (event.deltaY > 0) {
          this.navShow = false
          this.pageDown = true
          let page = this.lastPage + 1
          page = page > 4 ? 4 : page
          this.$refs.home.scrollTop = page * document.body.clientHeight
          this.lastPage = page
        }
        else {
          this.navShow = true
          this.pageUp = true
          let page = this.lastPage - 1
          page = page < 0 ? 0 : page
          this.$refs.home.scrollTop = page * document.body.clientHeight
          this.lastPage = page
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet" scoped>
  .home
    position: relative
    width: 100%
    height: 100%
    .back-top
      position: fixed
      width: 50px
      height: 50px
      bottom: 80px
      right: 160px
      border-radius: 10px
      background: url("../../../static/img/back-top.png")
    .page
      width: 100%
      height: 100%
      z-index: 1
    .page-down
      &.move-enter-active, &.move-leave-active
        transition: all 1s linear
      &.move-enter, &.move-leave-active
        z-index: 0;
        transform: translate3d(0, 100%, 0);
    .page-up
      &.move-enter-active, &.move-leave-active
        transition: all 1s linear
      &.move-enter, &.move-leave-active
        z-index: 0;
        transform: translate3d(0, -100%, 0);
    .one
      background: url('../../../static/img/home-01.jpg') no-repeat
      background-size: center center
    .two
      background: url('../../../static/img/home-02.jpg') no-repeat
      background-size: 100% 100%
      background-position: center center
    .three
      background: #fff
      .wrapper
        width: 1000px
        margin: 0 auto
        padding-top: 80px
        .top
          text-align: center
          .title
            color: #ff7b48
            font-size: 32px
            margin-bottom: 10px
          .text
            line-height: 30px
            color: #666
        .main
          width: 1000px
          height: 300px
          margin-top: 80px
          .main-wrapper
            float: left
            width: 200px
            height: 150px
            margin: 0 66px 50px 66px
            text-align: center
            .img
              width: 100px
              height: 100px
              padding-bottom: 20px
            .text
              color: #ff7b48
    .four
      background: #f8dcd6
      background-size: 100% 100%
      .wrapper
        width: 1000px
        margin: 0 auto
        padding-top: 80px
        .top
          text-align: center
          .title
            color: #ff7b48
            font-size: 32px
            margin-bottom: 10px
          .text
            color: #fff
            font-size: 24px
        .main
          width: 1000px
          height: 360px
          z-index: 0
          margin: 40px auto auto auto
          .main-wrapper
            float: left
            width: 260px
            height: 360px
            margin: 0 36.5px
            background: url('../../../static/img/eval.png')
            background-size: 100% 100%
            .title
              color: #ff7b48
              font-weight: 800
              margin-left: 20px !important
            .text
              font-size: 14px
              color: #a0a0a0
              line-height: 20px
              text-align: center
              span
                color: #ff7b48
                font-weight: 600
            .img
              margin: 120px 85px auto
              width: 95px
              height: 75px
        .cover
          width: 100%
          height: 100px
          z-index: 1
          margin-top: -35px
          background: url("../../../static/img/cover.png")
    .five
      background: url('../../../static/img/home-05.jpg') no-repeat
      background-size: 100% 100%
      background-position: center center
      .teacher-wrapper
        position: relative
        width: 1200px
        margin: 0 auto
        border: 1px solid red

</style>
