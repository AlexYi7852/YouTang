<template>
  <footer class="yt-footer">
    <div class="footer-btn" @click="tab()" v-show="!footerShow">
      <p>联系我们</p>
    </div>
    <transition name="footer-fade">
      <div class="footer-mian" v-show="footerShow">
        <div class="footer-container clearfix">
          <div class="footer-info fl-l">
            <h2>联系我们</h2>
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
    </transition>
  </footer>
</template>

<script>
export default {
  data(){
    return{
      footerShow: true
    }
  },
  methods:{
    tab(){
      this.footerShow = true;
    }
  }
}
</script>

<style lang="less" scoped>
.yt-footer{
    width: 100%;
    .footer-btn{
      overflow: hidden;
      margin: 0 auto;
      width: 133px;
      height: 43px;
      background: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/footer-bg.png') center;
      cursor: pointer;
      p{
        font-size: 16px;
        line-height: 50px;
        text-align: center;
        color: #fff;
      }
    }
    .footer-mian{
      width: 100%;
      height: 150px;
      background-color: #f6c8be;
      &.footer-fade-enter-active, &.footer-fade-leave-active{
        transition: all 1s
      }
      &.footer-fade-enter, &.footer-fade-leave-active{
        opacity: 0;
        background: rgba(7, 17, 27, 0)
      }
      .footer-container{
        margin: 0 auto;
        width: 1200px;
        height: 150px;
        .footer-info{
          h2{
            margin-top: 5px;
            font-size: 24px;
            color: #2e4374;
          }
          p{
            margin-top: 5px;
            font-size: 14px;
            color: #2e4374;
          }
        }
        .footer-qrcode{
          .wechat-code{
            margin-top: 20px;
            width: 80px;
            img{
              width: 80px;
              height: 80px;
              background-color: #eee;
            }
            p{
              margin-top: 10px;
              font-size: 14px;
              color: #fff;
            }
          }
          .service{
            margin-left: 30px;
          }
        }
      }
    }
}
</style>
