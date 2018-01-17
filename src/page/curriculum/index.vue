<template>
  <div class="app" ref="app">
    <div class="transparent" @mouseover="enterNav"></div>
    <div class="back-top" @click="backTop" v-show="backTopShow"></div>
    <page :currentPage="currentPage" style="z-index: 99">
      <div class="page-one-title">
        <div class="top">
          <transition name="move">
            <div class="title" v-show="currentPage === 1">以新HSK和新YCT为参考标准</div>
          </transition>
          <transition name="move">
            <div class="title" v-show="currentPage === 1">生动有趣的课程内容</div>
          </transition>
          <transition name="move">
            <div class="title" v-show="currentPage === 1">真正面向<span>华人儿童和青少年</span>的课程体系</div>
          </transition>
        </div>
      </div>
      <div class="page-one-corner">
        <transition name="move">
          <div class="footer" v-show="currentPage === 1">HSK是一项国际汉语能力标准化考试,重点考察汉语非第一语言的考生在生活、学习和工作中运用汉语进行交际的能力</div>
        </transition>
        <transition name="move">
          <div class="footer" v-show="currentPage === 1">YCT是一项国际汉语能力标准化考试,考察汉语非第一语言的中小学生在日常生活和学习中运用汉语的能力</div>
        </transition>
      </div>
    </page>
    <page :currentPage="currentPage">
      <div class="page-two">
        <transition name="move">
          <div class="top" v-show="currentPage === 2">
            <div class="title">我们的课程</div><br>
            <span>标准课程+精品公开课</span><br>
            <span>学习最美华语,掌握标准发音,感受中国文化</span>
          </div>
        </transition>
        <div class="course-type">
          <div class="course-item" v-for="course in courseTypeList">
            <div class="img" :style="course.styleObject"></div>
            <div class="title">
              <div class="title-title">{{ course.title }}</div>
              <div class="title-time">{{ course.time }}</div>
            </div>
            <div class="text">
              <span>{{ course.text1 }}</span><br>
              <span>{{ course.text2 }}</span><br>
              <span :style="{ color: course.color }">{{ course.text3 }}</span>
            </div>
          </div>
        </div>
      </div>
    </page>
    <page :currentPage="currentPage">
      <div class="page-three">
        <transition name="move">
          <div class="top" v-show="currentPage === 3">
            <div class="title">主修进阶课程体系</div>
            <span>快速掌握600个核心字词，900个基础汉字</span><br>
            <span>口语表达能力、阅读能力、写作能力综合提升自主知识产权教材、课件</span>
          </div>
        </transition>
      </div>
    </page>
    <page :currentPage="currentPage">
      <div class="page-four">
        <transition name="move">
          <div class="top" v-show="currentPage === 4">多主体文化拓展</div>
        </transition>
        <div class="theme-main">
          <div class="flip-button">
            <div class="prev button" @click="prevTheme"></div>
          </div>
          <div class="theme-wrapper">
            <ul class="theme-item" :class="boxAnimateClass" v-for="(theme, index) in themeList" :id="'themeItem'+index">
              <li>
                <div class="theme-enter" v-show="theme.isEnter" @mouseenter="themeEnter(index)">
                  <img :src="theme.img" :style="theme.styleObject">
                </div>
                <router-link :to="theme.href">
                  <div class="theme-leave" v-show="!theme.isEnter" @mouseleave="themeLeave(index)">
                    <div class="name">{{ theme.name }}</div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="flip-button right">
            <div class="next button" @click="nextTheme"></div>
          </div>
        </div>
      </div>
      <pageFooter></pageFooter>
    </page>
    <page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage" :option="controllerOption"></page-controller>
    <ytNav :navShow="navShow" :style="{ position: 'absolute',zIndex: '10000'}"></ytNav>
  </div>
</template>

<script>
  import Page from '../home/page'
  import PageController from '../home/pageController'
  import ytNav from '../../components/header/yt-header'
  import pageFooter from '../../components/footer/home-footer'

  export default {
    name: 'app',
    components: { ytNav, Page, PageController, pageFooter },
    data () {
      return {
        currentPage: 1,
        backTopShow: false,
        navShow: true,
        isEnter: true,
        boxAnimateClass: '',
        options: [
          { styleObject: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/coursePage-01.jpg\')center', 'background-size': 'cover' }},
          { styleObject: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/coursePage-02.jpg\')center', 'background-size': 'cover' }},
          { styleObject: { background: 'url(\'http://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/coursePage-03.jpg\')center', 'background-size': 'cover' }},
          { styleObject: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/coursePage-04.jpg\')center', 'background-size': 'cover' }}
        ],
        themeList: [
          // {
          //   name: '诗词成语',
          //   isEnter: true,
          //   link: '/china/poetry',
          //   img : 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/theme-img01.png',
          //   styleObject: { width: '40px', height: '48px', 'margin-left': '80px', 'margin-top': '76px' }
          // },
          // {
          //   name: '经典诵读',
          //   isEnter: true,
          //   img : 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/theme-img02.png',
          //   styleObject: { width: '31px', height: '49px', 'margin-left': '84.5px', 'margin-top': '75.5px' }
          // },
          {
            name: '中华美食',
            isEnter: true,
            href: '/china/chinafood',
            img : 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/theme-img03.png',
            styleObject: { width: '53px', height: '48px', 'margin-left': '73.5px', 'margin-top': '76px' }
          },
          {
            name: '现代中国',
            isEnter: true,
            href: '/china/newchina',
            img : 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/theme-img04.png',
            styleObject: { width: '40px', height: '49px', 'margin-left': '80px', 'margin-top': '75.5px' }
          },
          {
            name: '中华艺术',
            isEnter: true,
            href: '/china/art',
            img : 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/theme-img05.png',
            styleObject: { width: '38px', height: '48px', 'margin-left': '81px', 'margin-top': '76px' }
          },
          {
            name: '民风民俗',
            isEnter: true,
            href: '/china/folk',
            img : 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/theme-img06.png',
            styleObject: { width: '55px', height: '48px', 'margin-left': '72.5px', 'margin-top': '76px' }
          },
          {
            name: '历史文化',
            isEnter: true,
            href: '/china/story',
            img : 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/theme-img07.png',
            styleObject: { width: '58px', height: '46px', 'margin-left': '71px', 'margin-top': '77px' }
          },
          {
            name: '锦绣河山',
            isEnter: true,
            href: '/china/landscape',
            img : 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/theme-img08.png',
            styleObject: { width: '56px', height: '48px', 'margin-left': '72px', 'margin-top': '76px' }
          }
        ],
        courseTypeList: [
          {
            styleObject: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/evaluation.png\')', width: '91px', height: '100px'},
            title: '阶段性测评课', time: '每节课25分钟',
            text1 : '老师对孩子的中文水平进行全面测评',
            text2: '提供专业的测评报告及学习建议',
            text3: 'f', color: '#fdf4f2'
          },
          {
            styleObject: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/oneByFour.png\')', width: '173px', height: '100px'},
            title: '一对四课程',
            time: '每节课35分钟',
            text1 : '小班级学习氛围 孩子之间对话和互动',
            text2: '充分保证每个孩子的练习时间',
            text3: '跟小伙伴一起成长'
          },
          {
            styleObject: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/oneByOne.png\')', width: '135px', height: '100px'},
            title: '一对一课程',
            time: '每节课25分钟',
            text1 : '孩子全程保持注意力',
            text2: '学习效果倍增',
            text3: '老师根据孩子特点进行更有针对性的教学'
          },
          {
            styleObject: { background: 'url(\'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/publicCourse.png\')', width: '103px', height: '100px'},
            title: '精品公开课', time: '每节课15分钟',
            text1 : '主题多样 根据兴趣自主选择课程',
            text2: '感受中国文化的博大精深  让学中文不在无聊',
            text3: '`', color: '#fdf4f2'
          }
        ],
        controllerOption: { arrowsType: false, navbar: true, highlight: true, loop: false }
      }
    },
    computed: {
      pageNum () {  // 总page数
        return this.options.length
      },
    },
    methods: {
      themeEnter (index) {
        this.themeList[index].isEnter = false
      },
      themeLeave (index) {
        this.themeList[index].isEnter = true
      },
      nextTheme () {
        this.boxAnimateClass = 'box-transform-left'
        let theme = document.getElementById('themeItem0')
        let left = theme.style.marginLeft
        let width = theme.offsetWidth
        if (left === '-750px' ) {
          return
        }
        else if (left === '') {
          left = -width
        }
        else {
          left = (parseInt(left) + -width)
        }
        document.getElementById('themeItem0').style.marginLeft = (left + 'px')
      },
      prevTheme () {
        let theme = document.getElementById('themeItem0')
        let left = theme.style.marginLeft
        let width = theme.offsetWidth
        if (left === "-250px") {
          return
        }
        else {
          left = (parseInt(left) + width)
        }
        document.getElementById('themeItem0').style.marginLeft = (left + 'px')
      },
      enterNav () {
        this.navShow = true
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
        let beforeIndex = this.currentPage
        this.currentPage = index
        if (this.currentPage === 4) {
          this.nextTheme()
        }
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
    .page-one-title
      position: relative
      width: 1200px
      padding-top: 200px
      margin: 0 auto
      .top
        .title
          color: #666
          font-size: 30px
          letter-spacing: 3px
          line-height: 45px
          &.move-enter-active, &.move-leave-active
            transition: .5s linear
            transition-delay: .5s
          &.move-enter, &.move-leave-active
            transform: translateX(-300%)
          span
            color: #ff7b48
            font-size: 40px
    .page-one-corner
      position: absolute
      right: 18.75%
      bottom: 40px
      .footer
        color: #999
        font-size: 14px
        &.move-enter-active, &.move-leave-active
          transition: .5s linear
          transition-delay: .5s
        &.move-enter, &.move-leave-active
          transform: translateX(400%)
    .page-two
      width: 1200px
      height: 100%
      margin: 0 auto
      .top
        margin: 80px auto 150px auto
        text-align: center
        letter-spacing: 3px
        &.move-enter-active, &.move-leave-active
          transition: .5s linear
          transition-delay: .5s
        &.move-enter, &.move-leave-active
          transform: translateY(-200%)
        .title
          color: black
          font-size: 30px
          margin-bottom: -10px
        span
          color: #666
          font-size: 20px
          line-height: 30px
      .course-type
        width: 1200px
        height: 230px
        .course-item
          display: inline-block
          width: 250px
          height: 230px
          margin: 0 25px
          text-align: center
          .img
            margin: 0 auto
          .title
            margin-top: 30px
            .title-title
              color: #666
              font-size: 20px
            .title-time
              color: #666
          .text
            color: #999
            font-size: 12px
            margin-top: 10px
    .page-three
      width: 1200px
      height: 100%
      margin: 0 auto
      .top
        position: relative
        margin-top: 80px
        text-align: center
        letter-spacing: 3px
        &.move-enter-active, &.move-leave-active
          transition: .5s linear
          transition-delay: .5s
        &.move-enter, &.move-leave-active
          transform: translateY(-200%)
        .title
          color: #fff
          font-size: 30px
          margin-bottom: 10px
        span
          color: #c4c4c4
          font-size: 20px
          line-height: 35px
      .main
        position: relative
        width: 1200px
        height: 750px
        .text
          position: absolute
          width: 220px
          height: 250px
          top: 300px
          left: 150px
          color: #666
          font-size: 20px
          letter-spacing: 2px
          .line-60
            line-height: 62px
          .line-80
            height: 80px
            line-height: 30px
            padding-top: 10px
            padding-bottom: 10px
    .page-four
      width: 1200px
      height: 100%
      margin: 0 auto
      .top
        color: #fff
        font-size: 30px
        text-align: center
        margin-top: 80px
        &.move-enter-active, &.move-leave-active
          transition: .5s linear
          transition-delay: .5s
        &.move-enter, &.move-leave-active
          transform: translateY(-300%)
      .theme-main
        position: relative
        width: 1200px
        height: 230px
        margin-top: 100px
        overflow: hidden
        display: inline-block
        .flip-button
          width: 100px
          height: 230px
          display: inline-block
          .button
            width: 34px
            height: 34px
            cursor: pointer
            margin-top: 98px
          .prev
            background: url("https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/swiper-button-prev.png")
          .next
            float: right
            background: url("https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/swiper-button-next.png")
        .right
          float: right
        .theme-wrapper
          position: absolute
          width: 1000px
          height: 230px
          display: inline-block
          overflow: hidden
          white-space: nowrap
          .theme-item
            list-style: none
            display: inline-block
            vertical-align: top
            transform: translateX(0)
            transition: all .5s
            li
              list-style: none
              .theme-enter
                width: 200px
                height: 200px
                margin: 15px 25px
                background: url("https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/theme-enter.png")
              .theme-leave
                width: 230px
                height: 230px
                margin: 0 10px
                text-align: center
                cursor: pointer
                background: url("https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/theme-hover.png")
                .name
                  color: #666666
                  font-size: 20px
                  text-align: center
                  line-height: 230px
          .box-transform-left
            transform: translateX(250px)
    .main-wrapper
      height: 1200px
      width: 100%
</style>
