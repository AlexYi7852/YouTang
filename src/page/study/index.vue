<template>
  <div class="study">
    <yt-header :navShow="true"></yt-header>
    <!-- main -->
    <div class="main-content flex">
      <router-view></router-view>
      <my-lesson></my-lesson>
    </div>
    <yt-footer></yt-footer>
  </div>
</template>

<script>
import ytHeader from '../../components/header/yt-header'
import ytFooter from '../../components/footer/yt-footer'
import myLesson from '../../components/common/my-lesson'

export default {
  components: {
    'yt-header': ytHeader,
    'yt-footer': ytFooter,
    'my-lesson': myLesson
  },
  mounted(){
    this.checkLogin();
  },
  methods:{
    checkLogin(){
			if(!window.localStorage.getItem('id')){
        this.$router.push('/login');
      }else{
        if (!window.localStorage.getItem('child')) {
          this.$router.push('/usercenter');
        }
      }
		}
  }
}
</script>

<style lang="less" scoped>
.study{
    width: 100%;
    .main-content{
      margin: 52px auto;
      width: 1200px;
    }
}
</style>
