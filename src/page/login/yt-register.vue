<template>
<div class="register-box">
    <div class="tab-nav">
        <ul class="flex clearfix">
            <li @click="selectFocus(1)">
                <i class="icon-mail" :class="num===1?'icon-mail-focus':''"></i>
            </li>
            <li @click="selectFocus(2)">
                <i class="icon-tel" :class="num===2?'icon-tel-focus':''"></i>
            </li>
        </ul>
    </div>
    <div class="tab-cont">
        <yt-regmail v-show="loginShow"></yt-regmail>
        <yt-regtel v-show="!loginShow"></yt-regtel>
    </div>
    <router-link to="/registerVIP" class="vip-reg">会员注册</router-link>
</div>
</template>
  
<script>
  import regmail from './yt-regmail'
  import regtel from './yt-regtel'
  
  export default {
    components: {
      'yt-regmail': regmail,
      'yt-regtel': regtel
    },
    data(){
        return{
        loginShow: true,
        num: 1,
        }
    },
    methods: {
        selectFocus(num){
            if (num == 1) {
                this.num = num;
                this.loginShow = true;
            }else{
                this.num = num;
                this.loginShow = false;
            }
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.register-box {
width: 360px;
height: 480px;
}
.tab-nav{
padding-top: 10px;
.flex li{
    float: left;
    width: 50%;
    text-align: center;
    font-size: 20px;
    color: #333;
    font-family: "Hiragino Sans GB","PingFangSC-Regular",sans-serif;
    i{
    display: block;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #e5e5e5;
    background-repeat: no-repeat;
    background-position: center;
    }
    .icon-mail{ 
    background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/icon/icon-mail.png');
    background-size: 24px;
    }
    .icon-tel{ 
    background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/icon/icon-tel.png');
    background-size: 18px;
    }
    .icon-mail-focus{ 
    background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/icon/icon-mail-focus.png');
    background-size: 26px;
    border-bottom: 1px solid #ff7b48;
    }
    .icon-tel-focus{ 
    background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/icon/icon-tel-focus.png');
    background-size: 18px;
    border-bottom: 1px solid #ff7b48;
    }
}
}
.tab-cont{ padding: 0 40px;}
.vip-reg{
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #666;
}
</style>
