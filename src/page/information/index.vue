<template>
  <div class="information">
    <yt-header :navShow="true"></yt-header>
    <div class="main-wrapper">
      <div class="main-item clearfix" v-for="main in mainList" :key="main.index" @click="showCover">
        <div class="img fl-l"><img :src="main.img"></div>
        <div class="info fl-l">
          <div class="title">{{ main.title }}</div>
          <div class="time">{{ main.time }}</div>
          <div class="text">{{ main.text }}</div>
        </div>
      </div>
    </div>
    <cover-one ref="coverOne"></cover-one>
    <yt-footer></yt-footer>
  </div>
</template>

<script>
  import ytHeader from '../../components/header/yt-header'
  import ytFooter from '../../components/footer/yt-footer'
  import coverOne from './coverOne'
  export default {
    components: { ytHeader, ytFooter, coverOne },
    data () {
      return {
        mainList: [
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/mainImg-01.png',
            title: '五千年中华文化，经典传承！（知识点）',
            time: '2017-11-08 12:50:35 阅读(0)',
            text: '在中国国学文化中，经典的名句比比皆是。这些经典在很长一段时间，是中国人品质和内涵的一种代表，今天一起来领略一下，上下五千年的文化魅力。'
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/mainImg-02.png',
            title: '中华文化，博大精深！',
            time: '2017-11-08 12:50:35 阅读(0)',
            text: '独具特色的语言文字，浩如烟海的文化典籍，名扬世界的科技工艺，异彩纷呈的文学艺术，充满智慧的中国哲学，完备而深刻的道德伦理等，共同组成博大精深的中国文化！'
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/mainImg-03.png',
            title: '中国八大传统文化！',
            time: '2017-11-08 12:50:35 阅读(0)',
            text: '有些文化是最能代表中国五千年的积淀的，是我们应该发扬光大的！'
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/mainImg-04.png',
            title: '汉字：中华文化的独特符号',
            time: '2017-11-5 12:50:35 阅读（0）',
            text: '中华文化历史悠久，内涵丰富。能够代表中华文化的符号数量众多，其中最具有代表性的，一定非汉字莫属。'
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/mainImg-05.png',
            title: '一句被洗白并展现无比荣光的中华文化精髓',
            time: '2017-11-4 12:50:35 阅读（0）',
            text: '“人不为己，天诛地灭”。有多少人把这句话捧为立身的经典，但当你知道这句话的庐山真面目，是不是会感到羞愧呢。'
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/mainImg-06.jpg',
            title: '中华文化之对联',
            time: '2017-11-3 12:50:35 阅读（0）',
            text: '对联文化：汉族传统文化之一，又称楹联或对子，是写在纸、布上或刻在竹子、木头、柱子上的对偶语句。对联的内容可以是写景状物，也可以是写人叙事。'
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/mainImg-07.png',
            title: '守望中华文化',
            time: '2017-11-1 12:50:35 阅读（0）',
            text: '从远古的茹毛饮血、钻木取火，到唐尧、虞舜的文明曙光，春秋烽火、秦国兵马、大汉伟业、盛唐辉煌……有袅袅炊烟与彩霞齐飞，琴瑟鼓乐与长风共鸣，更有战马引颈长嘶，雄鹰翱翔长空，仓储五谷千年留香，棚圈六畜兆百世兴旺。'
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/mainImg-08.jpg',
            title: '温习中华文化 做最好的自己！',
            time: '2017-10-28 12:50:35 阅读（0）',
            text: '一般的社会大众，即使受了十几年的现代教育，未必有机会阅读和享受到这些令人振奋、反思的精警字句。'
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/mainImg-09.png',
            title: '中华古典文化――宋词',
            time: '2017-10-25 12:50:35 阅读（0）',
            text: '词起源于隋，稍盛于唐，鼎盛于宋。宋词是中华词文化的顶峰时期，标志着宋代文学的最高成就，长短不一是词的显著特点，看似长短不一没有章法，却又有词牌限制字数，在无序中又显规整。'
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/mainImg-10.jpg',
            title: '中华文化见证-铜钱',
            time: '2017-10-20 12:50:35 阅读（0）',
            text: '华夏文明上下五千年，历史文化源远流长。每一个历史发展的阶段都是我们国家成长的足迹，铜币也正是这历史银河中组成的重要部分。'
          }
        ]
      }
    },
    methods: {
      showCover () {
        this.$refs.coverOne.showCover()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .information
    width: 100%
    .main-wrapper
      width: 1200px
      margin: 65px auto
      .main-item
        width: 100%
        margin-top: 20px
        padding-bottom 20px
        cursor: pointer
        /*background: #fff*/
        border-bottom: 1px solid #f6c8be
        .img
          float: left
          width: 200px
        .info
          float: right
          width: calc(100% - 200px)
          height: 160px
          padding: 20px
          diaplay: inline-block
          .title
            font-size: 20px
          .time
            color: #999
            margin: 10px 0
            line-height: 30px
          .text
            color: #999
            line-height: 30px
</style>
