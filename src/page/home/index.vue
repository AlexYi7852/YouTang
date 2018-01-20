<template>
  <div class="app" ref="app">
    <div class="transparent" @mouseover="enterNav"></div>
    <div class="back-top" @click="backTop" style="z-index: 100" v-show="backTopShow"></div>
    <page :currentPage="currentPage" style="z-index: 99">
      <section class="animate" ref="section1">
          <ul class="page-one-title">
            <transition  name="move">
              <li class="text" v-show="currentPage === 1">
                <p>学好中文发音</p>
                <span>Learn standard pronunciation</span>
              </li>
            </transition>
            <transition  name="move">
              <li class="text" v-show="currentPage === 1">
                <p>用好核心字词</p>
                <span>Use the core words well</span>
              </li>
            </transition>
            <transition  name="move">
              <li class="text" v-show="currentPage === 1">
                <p>让孩子在快乐学习中</p>
                <span>Let the child be in a happy study</span>
              </li>
            </transition>
            <transition  name="move">
              <li class="text" v-show="currentPage === 1">
                <p>掌握最美中文</p>
                <span>Mastering the most beautiful Chinese</span>
              </li>
            </transition>
          </ul>
      </section>
    </page>
    <page :currentPage="currentPage">
      <section class="animate">
        <transition name="move">
          <div class="page-two-title" v-show="currentPage === 2">
            视频在线教学，在家和老师面对面互动,<br>全中文沉浸式课堂环境，随时随地高效学习
          </div>
        </transition>
      </section>
    </page>
    <page :currentPage="currentPage">
      <section class="animate">
        <div class="page-three">
          <transition name="move">
            <div class="top" v-show="currentPage === 3">
              <div class="title">我们的优势</div>
              <span class="text">自主研发教材，名校老师授课多元化课程形式，<br>满足个性化学习需求</span>
            </div>
          </transition>
          <div class="main">
            <div class="main-wrapper" v-for="main in mainList">
              <img :src="main.img" class="img" :style="main.style"><br>
              <span class="text">{{ main.text }}</span>
            </div>
          </div>
        </div>
      </section>
    </page>
    <page :currentPage="currentPage">
      <section class="animate">
        <div class="page-four">
          <transition  name="move">
            <div class="top" v-show="currentPage === 4">
              <div class="title">精选优质教师</div>
              <div class="text">著名高校和重点中学的优秀老师为学生授课<br>让孩子们在快乐中学习汉语，感受汉语言的美妙</div>
            </div>
          </transition>
          <div class="main">
            <div class="main-wrapper">
              <p class="title">严格筛选</p>
              <div class="text"><span>三轮</span>面试，全面评估老师综合素质<br>和能力<br>录取率低于<span>5%</span>,
                '优中选优'，只<br>选最合适的老师<br>多轮<span>在线试讲</span>，教学专业度和课堂<br>感染力双轨评审
              </div>
              <img src="https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/eval-01.png" class="img">
            </div>
            <div class="main-wrapper">
              <p class="title">专业培训</p>
              <div class="text">入职后三个月内，累计<span>100小时</span><br>培训<br>线上教学<span>模拟演练</span>，
                教学方法定<br>期研讨<br>儿童<span>心理学</span>和教育理论学习,文<br>化素养扩展
              </div>
              <img src="https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/eval-02.png" class="img">
            </div>
            <div class="main-wrapper">
              <p class="title">系统考核</p>
              <div class="text">实行老师等级晋升以及末位<span>淘汰</span><br>机制<br>每三个月对老师的综合表现进行<br>
                <span>全面考评</span><br>授课质量<span>持续督查</span>, 家长及学员<br>的反馈及时落实
              </div>
              <img src="https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/eval-03.png" class="img">
            </div>
          </div>
          <div class="cover"></div>
        </div>
      </section>
    </page>
    <page :currentPage="currentPage">
      <section class="animate">
        <div class="teacher-wrapper">
          <div class="teacher-item">
            <ul v-for="(teacher, index) in teacherList">
              <li>
                <div :style="teacher.styleLeaveObject" v-show="!teacher.isEnter" class="teacher-default" @mouseenter="enter(index)">
                  <div class="teacher-img" :style="teacher.styleImgObject"></div>
                </div>
                <div class="teacher-enter" v-show="teacher.isEnter" @mouseleave="leave(index)">
                  <div class="big"  :style="teacher.styleBigObject" ></div>
                  <div class="middle" :style="teacher.styleMiddleObject"></div>
                  <div class="small" :style="teacher.styleSmallObject">
                    <div class="small-img" :style="teacher.styleSmallImg"></div>
                    <div class="small-name">{{ teacher.name }}老师</div>
                    <div class="small-text">{{ teacher.info }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <pageFooter></pageFooter>
    </page>
    <page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage" :option="controllerOption"></page-controller>
    <ytHeader :navShow="navShow" :style="{ position: 'absolute',zIndex: '10000'}"></ytHeader>
  </div>
</template>

<script>
  import Page from './page'
  import PageController from './pageController'
  import ytHeader from '../../components/header/yt-header'
  import pageFooter from '../../components/footer/home-footer'
  export default {
    name: 'app',
    components: { ytHeader, Page, PageController, pageFooter },
    data () {
      return {
        mainList: [
          { style: { width: '109px', height: '105px' }, img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/main-01.jpg', text: '生动有趣的学习体验' },
          { style: { width: '120px', height: '97px' }, img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/main-02.jpg', text: '零距离在线课堂' },
          { style: { width: '109px', height: '102px' }, img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/main-03.jpg', text: '经验丰富的专业师资' },
          { style: { width: '113px', height: '105px' }, img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/main-04.jpg', text: '个性化启发式教学' },
          { style: { width: '99px', height: '104px' }, img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/main-05.jpg', text: '多主题文化拓展课程' },
          { style: { width: '118px', height: '112px' }, img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/main-06.jpg', text: '快速掌握600字词' }
        ],
        currentPage: 1,
        backTopShow: false,
        navShow: true,
        teacherList: [
          {
            name: '杨子',
            isEnter: false,
            styleSmallImg: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-01.png\')', 'background-size': 'cover' },
            styleBigObject: { width: '340px', height: '340px', left: '-100px', bottom: '50px', 'background': '#ff7b48' },
            styleSmallObject: { width: '220px', height: '220px', left: '-40px', bottom: '110px', 'background': '#ff7b48' },
            styleMiddleObject: { width: '280px', height: '280px', left: '-70px', bottom: '80px', 'background': '#ff7b48' },
            info: '杨子老师毕业于北京外国语大学。开朗阳光，热情幽默。她已有超过两年的从教经历，曾教过日本、德国、英国、南非和海外华人华侨学生学习中文',
            styleLeaveObject: { width: '80px', height: '80px', left: '30px', bottom: '180px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/yangzi.png\')', 'background-size': 'cover' },
            styleImgObject: { width: '50px', height: '50px', left: '15.5px', bottom: '15px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-01.png\')', 'background-size': 'cover' }
          },
          {
            name: '陈春霖',
            isEnter: false,
            styleSmallImg: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-02.png\')', 'background-size': 'cover' },
            styleBigObject: { width: '340px', height: '340px', left: '20px', bottom: '-25px', 'background': '#ff7b48' },
            styleSmallObject: { width: '220px', height: '220px', left: '80px', bottom: '35px', 'background': '#ff7b48' },
            styleMiddleObject: { width: '280px', height: '280px', left: '50px', bottom: '5px', 'background': '#ff7b48' },
            info: '陈春霖老师毕业于北京语言大学，曾先后任教清华大学对外汉语研究中心、北京语言大学汉语学院留学生中文课程，擅长多方位激发学生的学习兴趣，引导学生发现中文学习的快乐。',
            styleLeaveObject: { width: '130px', height: '130px', left: '125px', bottom: '80px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/limengyuan.png\')', 'background-size': 'cover' },
            styleImgObject: { width: '90px', height: '90px', left: '20px', bottom: '20px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-02.png\')', 'background-size': 'cover' }
          },
          {
            name: '袁梦',
            isEnter: false,
            info: '袁梦老师毕业于北京师范大学。热爱教育，擅长和孩子沟通，拥有丰富的教学经验，曾向多个国家的学生教授中文。',
            styleSmallImg: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-03.png\')', 'background-size': 'cover' },
            styleBigObject: { width: '340px', height: '340px', left: '240px', top: '40px', 'background': '#ff7b48' },
            styleSmallObject: { width: '220px', height: '220px', left: '300px', top: '100px', 'background': '#ff7b48' },
            styleMiddleObject: { width: '280px', height: '280px', left: '270px', top: '70px', 'background': '#ff7b48' },
            styleImgObject: { width: '70px', height: '70px', left: '25px', top: '25px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-03.png\')', 'background-size': 'cover' },
            styleLeaveObject: { width: '120px', height: '120px', left: '350px', top: '150px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/yuanmeng.png\')', 'background-size': 'cover' }
          },
          {
            name: '杨镜洁',
            isEnter: false,
            styleSmallImg: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-04.png\')', 'background-size': 'cover' },
            styleBigObject: { width: '340px', height: '340px', top: 'calc(50% - 170px)', left: 'calc(50% - 170px)', 'background': '#ff7b48' },
            styleSmallObject: { width: '220px', height: '220px', top: 'calc(50% - 110px)', left: 'calc(50% - 110px)', 'background': '#ff7b48' },
            styleMiddleObject: { width: '280px', height: '280px', top: 'calc(50% - 140px)', left: 'calc(50% - 140px)', 'background': '#ff7b48' },
            info: '杨镜洁老师毕业于北京外国语大学。了解很多中国传统文化知识，曾到美丽的斯里兰做对外汉语教师志愿者,喜欢与小朋友相处交流。擅长古筝、唱歌、喜欢运动',
            styleImgObject: { width: '160px', height: '160px', left: '50px', top: '50px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-04.png\')', 'background-size': 'cover' },
            styleLeaveObject: { width: '260px', height: '260px', left: 'calc(50% - 130px)', top: 'calc(50% - 130px)', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/yangjingjie.png\')', 'background-size': 'cover' }
          },
          {
            name: '周桐同',
            isEnter: false,
            styleSmallImg: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-05.png\')', 'background-size': 'cover' },
            styleBigObject: { width: '340px', height: '340px', right: '295px', bottom: '-75px', 'background': '#ff7b48' },
            styleSmallObject: { width: '220px', height: '220px', right: '355px', bottom: '-15px', 'background': '#ff7b48' },
            styleMiddleObject: { width: '280px', height: '280px', right: '325px', bottom: '-45px', 'background': '#ff7b48' },
            info: '周桐同老师毕业于北京师范大学。热爱华语言文学，普通话标准且喜爱书法。生于 1998 年， 与孩子们年龄差别较小，且性格活泼，善于与孩子沟通交流',
            styleImgObject: { width: '50px', height: '50px', right: '14px', bottom: '15px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-05.png\')', 'background-size': 'cover' },
            styleLeaveObject: { width: '80px', height: '80px', right: '425px', bottom: '55px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/zhoutongtong.png\')', 'background-size': 'cover' }
          },
          {
            name: '陈晓蓓',
            isEnter: false,
            styleSmallImg: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-06.png\')', 'background-size': 'cover' },
            styleBigObject: { width: '340px', height: '340px', right: '180px', top: '200px', 'background': '#ff7b48' },
            styleSmallObject: { width: '220px', height: '220px', right: '240px', top: '260px', 'background': '#ff7b48' },
            styleMiddleObject: { width: '280px', height: '280px', right: '210px', top: '230px', 'background': '#ff7b48' },
            info: '陈晓蓓老师毕业于北京大学。长期教外国朋友学习华语，善于将专业的理论知识应用于教学实践。她性格开朗，寓教于乐，对小朋友们很有耐心。兴趣爱好广泛，擅长二胡、写作',
            styleImgObject: { width: '144px', height: '144px', right: '41px', top: '39px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/teacher-06.png\')', 'background-size': 'cover' },
            styleLeaveObject: { width: '220px', height: '220px', right: '230px', top: '250px', 'background': 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/chenxiaobei.png\')', 'background-size': 'cover' }
          }
        ],
        options: [
          { styleObject: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/01.png\')center', 'background-size': 'cover' }, isCenter: true },
          { styleObject: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/02.png\')center', 'background-size': 'cover' }, isCenter: true },
          { styleObject: { background: '#fff', color: '#fff' }, isCenter: true },
          { styleObject: { background: '#f8dcd6', color: '#fff' }, isCenter: true },
          { styleObject: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/050.png\')center', 'background-size': 'cover' }, isCenter: true }
        ],
        controllerOption: { arrowsType: false, navbar: true, highlight: true, loop: false }
      }
    },
    computed: {
      pageNum () {   // 总page数
        return this.options.length
      }
    },
    methods: {
      enterNav () {
        this.navShow = true
      },
      leaveNav () {
        this.navShow = false
      },
      enter (index) {
        this.teacherList[index].isEnter = true
      },
      leave (index) {
        this.teacherList[index].isEnter = false
      },
      backTop () {
        this.backToTop()
      },
      backToTop() {
        if (this.currentPage <= 1) {
          return
        }
        this.changePage(this.currentPage - 1)
        setTimeout(() => {
          this.backToTop()
        }, 150)
      },
      firstPage(){
        this.changePage(this.currentPage);
      },
      changePage (index) {
        // beforeLeave Hook
        let beforeIndex = this.currentPage
        this.currentPage = index
        if (this.currentPage >= 2) {
          this.backTopShow = true
        }
        else {
          this.backTopShow = false
        }
        if (beforeIndex < index) {
          this.navShow = false
        }
        else if (beforeIndex > index) {
          this.navShow = true
        }
      }
    },
    mounted () {
      this.firstPage();
      this.$children.forEach((child, index) => {
        // 动态设置各个page内的options
        if (child.option === null) {
          let childOption = this.options[index]
          this.$set(childOption, 'index', index + 1)
          child.option = childOption
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .app
    height: 100%
    width: 100%
    .transparent
      position: absolute
      width: 100%
      height: 60px
      z-index: 9999
    .back-top
      position: fixed
      width: 50px
      height: 50px
      bottom: 80px
      right: 100px
      z-index: 99
      border-radius: 10px
      background: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/back-top.png')
    .back-top:hover
      opacity : 1
      background: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/back-bottom.png')
    .animate
      height: 100%
      width: 100%
      transition: all 1s ease-out 0s
      .page-one-title
        margin: 0 auto
        margin-top: 150px
        width: 800px
        font-size: 30px
        line-height: 60px
        color: #ff7b48
        .text
          position: relative
          text-align: center
          &.move-enter-active, &.move-leave-active
            transition: .5s linear
          &.move-enter, &.move-leave-active
            transform: translateY(500%)
          p
            position: relative
            display: inline-block
            z-index: 99
          span
            position: absolute
            top: 20px
            left: 0
            width: 100%
            text-align: center
            color: #dedede
        .text:nth-child(1)
          transition-delay: .3s
        .text:nth-child(2)
          transition-delay: .4s
        .text:nth-child(3)
          transition-delay: .5s
        .text:nth-child(4)
          transition-delay: .6s
      .page-two-title
        margin-top: 80px
        line-height: 30px
        text-align: center
        font-size: 20px
        color: #fff
        &.move-enter-active, &.move-leave-active
          transition: .5s linear
          transition-delay: .5s
        &.move-enter, &.move-leave-active
          transform: translateY(-200%)
      .page-three
        width: 1200px
        margin: 90px auto
        .top
          text-align: center
          &.move-enter-active, &.move-leave-active
            transition: .5s linear
            transition-delay: .5s
          &.move-enter, &.move-leave-active
            transform: translateY(-200%)
          .title
            color: #ff7b48
            font-size: 32px
            margin-bottom: 10px
          .text
            line-height: 30px
            color: #666
        .main
          width: 1200px
          height: 300px
          margin-top: 180px
          .main-wrapper
            float: left
            width: 200px
            height: 150px
            margin: 0 100px 50px 100px
            text-align: center
            .text
              color: #ff7b48
      .page-four
        width: 1200px
        margin: 150px auto
        .top
          text-align: center
          margin-top: -60px
          &.move-enter-active, &.move-leave-active
            transition: .5s linear
            transition-delay: .5s
          &.move-enter, &.move-leave-active
            transform: translateY(-200%)
          .title
            color: #ff7b48
            font-size: 32px
            margin-bottom: 10px
          .text
            color: #fff
            font-size: 24px
        .main
          width: 1200px
          height: 360px
          z-index: 0
          margin: 160px auto auto auto
          .main-wrapper
            float: left
            width: 260px
            height: 360px
            margin: 0 70px
            background: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/eval.png')
            background-size: 100% 100%
            .title
              color: #ff7b48
              font-weight: 800
              margin-top: 20px
              text-align center
            .text
              padding: 0 25px
              font-size: 14px
              color: #a0a0a0
              margin-top: 10px
              line-height: 20px
              text-align: left
              span
                color: #ff7b48
                font-weight: 600
            .img
              margin: 105px 84px auto
              width: 95px
              height: 75px
        .cover
          width: 1200px
          height: 100px
          position: absolute
          z-index: 1
          margin-top: -45px
          background: url("https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/fugaiceng.png")
          background-size: cover
      .teacher-wrapper
        position: relative
        margin: 0 auto
        width: calc(100% - 200px)
        height: calc(100% - 150px)
        .teacher-item
          margin: 0 auto
          width: 1200px
          height: 100%
          ul
            list-style: none
            li
              list-style: none
              .teacher-default
                cursor: pointer
                position: absolute
                z-index: 0
                .teacher-img
                  position: absolute
                  border-radius: 50%
                  z-index: 1
              .teacher-enter
                cursor: pointer
                .big
                  position: absolute
                  border-radius: 50%
                  z-index: 999
                  opacity : .3
                .middle
                  position: absolute
                  border-radius: 50%
                  opacity : .7
                  z-index: 1000
                .small
                  position: absolute
                  border-radius: 50%
                  z-index: 1001
                  .small-img
                    width: 50px
                    height: 50px
                    margin: 10px auto
                    border-radius: 50%
                  .small-name
                    margin: -5px 68px
                    color: #fff
                  .small-text
                    font-size: 12px
                    margin-top: 10px
                    line-height: 20px
                    padding: 0 20px
                    text-align: center
                    color: #fff
    .footer-main
      position: absolute
      width: 100%
      height: 150px
      bottom: 0
      background-color: #f6c8be
      .footer-container
        margin: 0 auto
        width: 1200px
        height: 150px
        .footer-info
          margin-top: 15px
          h2
            margin-top: 10px
            margin-bottom: 10px
            font-size: 28px
            color: #2e4374
            img
              vertical-align: middle
              margin-left: 20px
          p
            font-size: 16px
            color: #2e4374
        .footer-qrcode
          .wechat-code
            width: 80px
            margin-top: 30px
            margin-left: 30px
            img
              width: 70px
              height: 70px
            p
              font-size: 14px
              color: #fff
</style>
