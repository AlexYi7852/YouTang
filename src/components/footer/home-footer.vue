<template>
  <div class="page-footer">
    <div class="footer-main">
      <div class="footer-container clearfix">
        <div class="footer-info fl-l">
          <h2>联系我们<img src="https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/star.png"></h2>
          <p class="footer-email">邮箱：info@wbhchina.com</p>
          <p class="footer-tel">电话：010-65585630</p>
          <p class="footer-adress">地址：北京市朝阳区东亿国际传媒产业园3号楼</p>
          <p class="footer-beian">京ICP备17047043号-1</p>
        </div>
        <div class="footer-qrcode fl-r clearfix">
          <div class="wechat-code public fl-l">
            <img src="../../../static/img/wx-public.jpg" alt="">
            <p>微信公众号</p>
          </div>
          <div class="wechat-code service fl-l">
            <img src="../../../static/img/wx-service.jpg" alt="">
            <p>客服二维码</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page-footer'
  }
</script>

<style lang="stylus" scoped>
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
        margin-top: 5px
        h2
          margin-top: 5px
          margin-bottom: 5px
          font-size: 28px
          color: #2e4374
          img
            vertical-align: middle
            margin-left: 20px
        p
          font-size: 14px
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
