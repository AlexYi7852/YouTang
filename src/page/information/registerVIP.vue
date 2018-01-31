<template>
  <div class="register-vip">
    <div class="nav">
      <div class="text">优唐中文</div>
      <div class="text" :style="{ cursor: 'pointer' }" @click="back">返回</div>
    </div>
    <div class="main">
      <div class="main-wrapper">
        <div class="title">优唐会员注册</div>
        <div class="title">普通会员15/月; 高级VIP会员450元/年</div>
        <div class="table">
          <div class="name">
            <div class="input">
              <input type="text" placeholder="用户名" size="50">
              <div class="text">用户只能把汉字、字母、数字、下划线，不能以下划线开头</div>
            </div>
            <div class="input">
              <input type="text" placeholder="密码" size="50">
              <div class="text">密码最少6位数</div>
            </div>
            <div class="input">
              <input type="text" placeholder="确认密码" size="50">
              <div class="text"></div>
            </div>
            <div class="input">
              <input type="text" placeholder="邮箱" size="50">
              <div class="text">用于找回密码等验证信息</div>
            </div>
            <div class="input">
              <input type="text" placeholder="激活码" size="50">
              <div class="text">请输入邀请码信息</div>
            </div>
          </div>
          <div class="option">
            <div class="number">选填码</div><br>
            <input type="text" placeholder="企业名称" size="50"><br>
            <input type="text" placeholder="企业邮箱" size="50">
            <div class="button" @click="showCover">注册</div>
          </div>
        </div>
      </div>
    </div>
    <yt-footer></yt-footer>
    <cover-one :prompt="prompt" :cancel="cancel" :sure="sure" ref="coverOne"></cover-one>
  </div>
</template>

<script>
  import coverOne from './coverOne'
  import ytFooter from '../../components/footer/yt-footer'
  export default {
    components: { ytFooter, coverOne },
    data () {
      return {
        prompt: '注册已通过，请等待审核',
        cancel: '取消',
        sure: '确定'
      }
    },
    methods: {
      back () {
        this.$router.push('/information')
      },
      showCover () {
        this.$refs.coverOne.showCover()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .register-vip
    width: 100%
    .nav
      width: 100%
      height: 50px
      background: #f6c8be
      .text
        width:  49%
        text-align: center
        display: inline-block
        line-height: 50px
    .main
      width: 100%
      height: 732px
    .main-wrapper
      width: 1200px
      height: 100%
      padding: 20px
      margin: 42px auto
      text-align: center
      .title
        font-weight: 600
        line-height: 30px
      .table
        width: 740px
        height: 540px
        border-radius: 10px
        box-shadow: 0 0  60px 10px #f6c8be
        margin: 50px auto
        background: #fff
        .name
          text-align: center
          .input
            margin: 0 auto
            width: 380px
            height: 60px
            padding-top: 20px
            .text
              float: left
              color: #666
              font-size: 12px
            input
              border: none
              font-weight: 600
              border-bottom: 1px solid
              height: 30px
              margin: 10px 0
        .option
          text-align: center
          width: 380px
          height: 150px
          margin: 50px auto 0 auto
          .number
            width: 100px
            color:  #666
            margin: 0 auto -15px auto
            text-align: center
          input
            border: none
            font-weight: 600
            border-bottom: 1px solid
            height: 40px
          .button
            width: 160px
            height: 44px
            line-height: 44px
            color: #fff
            cursor: pointer
            margin: 20px auto
            background: url("../../../static/img/icon-information-button-active.png")
</style>
