<template>
  <div class="login">
    <yt-header :navShow="true"></yt-header>
    <div class="login-bg">
      <div class="container">
        <div class="login-cont">
          <div class="login-right">
            <div class="login-wrapper">
              <transition name="el-fade-in">
                <div class="register-text" v-show="logStatus">
                  <h1 class="text-title">还没有账号？</h1>
                  <button class="text-button" @click="switchStatus(1)">点击注册</button>
                  <!-- <p>领取免费体验课</p> -->
                  <p></p>
                </div>
              </transition>
              <transition name="el-fade-in">
                <div class="login-text" v-show="!logStatus">
                  <h1 class="text-title">已注册账号？</h1>
                  <button class="text-button" @click="switchStatus(2)">点击登录</button>
                </div>
              </transition>
              <div class="cont-box" :class="boxAnimateClass">
                  <yt-login v-show="logStatus"></yt-login>
                  <yt-register v-show="!logStatus"></yt-register>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <yt-footer :style="{ position: 'absolute',bottom: '0'}"></yt-footer>
  </div>
</template>

<script>
import ytHeader from '../../components/header/yt-header'
import ytFooter from '../../components/footer/yt-footer'
import ytLogin from './yt-login'
import ytRegister from './yt-register'
import Hub from '../../components/hub'

export default {
  components: {
    'yt-header': ytHeader,
    'yt-footer': ytFooter,
    'yt-login': ytLogin,
    'yt-register': ytRegister
  },
  data(){
    return{
      boxAnimateClass: '',
      logStatus: true
    }
  },
  mounted(){
    this.checkLogin();
  },
  methods: {
    switchStatus(item){
      if (item == 1) {
        this.logStatus = false;
        this.boxAnimateClass = 'box-transform-left'
      } else if (item == 2){
        this.logStatus = true;
        this.boxAnimateClass = 'box-transform-right'
      }
    },
    checkLogin(){
			if(window.localStorage.getItem('id')){
				this.$router.push('/study');
			}
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .login{ width: 100%; height: 100%; background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/login-bg.jpg'); background-repeat: no-repeat; background-position: center; background-size: cover;}
  .login-bg{ width: 100%; height: calc(~'100% - 70px');
    .container{ position: relative; height: 100%;
      .login-cont{ float: right; display: table; width: 800px; height: 100%; }
      .login-right{ display: table-cell; vertical-align: middle; width: 100%;
        .login-wrapper{ position: relative; width: 100%; height: 380px; border-radius: 10px; background-color: #ff8c60;
          .register-text{ position: absolute; bottom: 20px; left: 70px; width: 200px; text-align: center;
            .text-title{ text-align: center; font-size: 30px; color: #fff;}
            .text-button{ margin-top: 10px; width: 168px; height: 44px; border: 2px solid #fff; background-color: transparent; border-radius: 5px; font-size: 14px; color: #fff; cursor: pointer;}
            p{ margin-top: 5px; text-align: center; font-size: 14px; color: #fff;}
          }
          .login-text{ position: absolute; bottom: 40px; right: 70px; width: 200px; text-align: center;
            .text-title{ text-align: center; font-size: 30px; color: #fff;}
            .text-button{ margin-top: 10px; width: 168px; height: 44px; border: 2px solid #fff; background-color: transparent; border-radius: 5px; font-size: 14px; color: #fff; cursor: pointer;}
            p{ margin-top: 5px; text-align: center; font-size: 14px; color: #fff;}
          }
          .cont-box{ width: 360px; height: 480px; border-radius: 5px; background-color: #fff;transform: translateX(350px) translateY(-50px); transition: all .5s;}
          .box-transform-left{ transform: translateX(70px) translateY(-50px);}
        }
      }
    }
  }
</style>
