<template>
  <transition name="fade">
    <div class="cover-one" v-show="coverShow" @click="hideCover">
      <div class="main">
        <div class="text">{{ prompt }}</div>
        <div class="button">
          <div class="cancel">{{ cancel }}</div>
          <div class="sure" @click.stop.prvent="registerVIP">{{ sure }}</div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  export default {
    props: {
      cancel: {
        type: String,
        require: true,
        default: '关闭'
      },
      sure: {
        type: String,
        require: true,
        default: '加入会员'
      },
      prompt: {
        type: String,
        require: true,
        default: '您还不是会员'
      }
    },
    data () {
      return {
        coverShow: false
      }
    },
    methods: {
      registerVIP () {
        if (this.$route.path === '/information') {
          this.$router.push('/registerVIP')
        }
        else {
          this.hideCover()
        }
      },
      showCover () {
        this.coverShow = true
      },
      hideCover () {
        this.coverShow = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .cover-one
    background: rgba(102, 102, 102, .5)
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 1000
    &.fade-enter-active, &.fade-leave-active
      transition: all 1s
    &.fade-enter, &.fade-leave-active
      opacity: 0;
      background: rgba(7, 17, 27, 0)
    .main
      position: fixed
      width: 500px
      height: 300px
      top: 50%
      left: 50%
      z-index: 10000
      text-align: center
      border-radius: 10px
      margin-top: -150px
      margin-left: -250px
      background: #fff
      .text
        font-size: 20px
        font-weight: 600
        line-height: 200px
      .button
        width: 400px
        height: 100px
        margin: 0 auto
        color: #fff
        .cancel
          float: left
          width: 160px
          height: 44px
          cursor: pointer
          line-height: 44px
          display: inline-block
          background: url("../../../static/img/icon-information-button-cancel.png")
        .sure
          float: right
          width: 160px
          height: 44px
          cursor: pointer
          line-height: 44px
          display: inline-block
          background: url("../../../static/img/icon-information-button-active.png")
</style>
