<template>
  <div class="client">
    <ytHeader :navShow="true"></ytHeader>
    <div class="main">
      <div class="main-wrapper">
        <div class="main-item" v-for="(client, index) in clientList" :key="client.index">
          <img class="img" :src="client.img" alt="">
          <div class="title">{{ client.title }}</div>
          <div class="text-main">
            <div class="edition">软件系统建议:{{ client.edition }}</div>
            <div class="load1">下载方法一:{{ client.load1 }}</div>
            <div class="text-load">"{{ client.textLoad }}" 下载</div>
            <div class="load2">下载方法二:{{ client.load2 }}</div>
            <div class="load3" :style="{ color: client.color }">{{ client.load3 }}</div>
            <img :src="client.QRcode" alt="" class="qr-code">
          </div>
        </div>
      </div>
    </div>
    <ytFooter :style="{position: 'absolute', bottom: '0px'}"></ytFooter>
  </div>
</template>

<script>
  import ytHeader from '../../components/header/yt-header'
  import ytFooter from '../../components/footer/yt-footer'
  export default {
    components: { ytHeader, ytFooter },
    data () {
      return {
        isActive: '',
        clientList: [
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/client-iPad.png',
            styleObject: { width: '72px', height: '84px' },
            title: 'iPad客户端下载',
            edition: 'iOS9.0或更高版本',
            load1: '前往APP Store搜索',
            textLoad: '优唐中文HD',
            load2: '扫一扫二维码下载',
            load3: 'gege',
            color: '#fff',
            QRcode: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/qrcode/qr-ipad.png',
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/client-iPhone.png',
            styleObject: { width: '72px', height: '84px' },
            title: 'iPhone客户端下载',
            edition: 'iOS9.0或更高版本',
            load1: '前往APP Store搜索',
            textLoad: '优唐中文',
            load2: '扫一扫二维码下载',
            load3: 'heh',
            color: '#fff',
            QRcode: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/qrcode/qr-iphone.jpg',
          },
          {
            img: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/client-Android.png',
            styleObject: { width: '72px', height: '84px' },
            title: '安卓客户端下载',
            edition: 'Android4.4以上版本',
            load1: '下载到本地',
            textLoad: '优唐中文',
            load2: '前往google play 搜索',
            load3: '下载方法三: 扫一扫二维码下载',
            QRcode: 'https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/qrcode/qr-android.png',
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .client
    width: 100%
    height: 100%
    background: url("https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/client-background.jpg")
    .main
      width: 1260px
      height: calc(100% - 475px)
      margin: 132px auto
      .main-wrapper
        width: 100%
        height: 500px
        display: table-cell
        text-align:center
        vertical-align:middle
        .main-item
          width: 360px
          height: 100%
          margin: 0 30px
          color: #333
          border-radius: 10px
          display: inline-block
          background: #fff
          .img
            margin: 30px 20px 20px
          .title
            font-size: 20px
            letter-spacing: 3px
            font-weight: 600
          div
            letter-spacing: 1px
            margin: 8px
          .qr-code
            width: 150px
            height: 150px
            margin: 8px 0 15px
    @media screen and (max-width: 1440px)
      .main
        width: 1140px
        height: calc(100% - 475px)
        margin: 90px auto
        .main-wrapper
          width: 100%
          height: 400px
          display: table-cell
          text-align:center
          vertical-align:middle
          .main-item
            width: 320px
            margin: 0 30px
            color: #333
            border-radius: 10px
            display: inline-block
            background: #fff
            .img
              margin: 20px 10px 10px
            .title
              font-size: 18px
              letter-spacing: 3px
              font-weight: 600
            div
              letter-spacing: 1px
              margin: 8px
              font-size: 14px
            .qr-code
              width: 120px
              height: 120px
              margin: 8px 0
</style>
