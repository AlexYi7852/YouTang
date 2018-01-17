<template>
<div class="login-box">
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
        <div class="login-cont" v-show="!status">
            <yt-tabmail v-show="loginShow"></yt-tabmail>
            <yt-tabtel v-show="!loginShow"></yt-tabtel>
        </div>
        <div class="restpwd-cont" v-show="status">
            <yt-restpwdmail v-show="restShow"></yt-restpwdmail>
            <yt-restpwdtel v-show="!restShow"></yt-restpwdtel>
        </div>
        <span class="resetpwd-tab" @click="resetpwd()" v-show="!status">找回密码</span>
        <span class="login-tab" @click="login()" v-show="status">现在登录</span>
    </div>
</div>
</template>

<script>
import tabtel from './yt-tabtel'
import tabmail from './yt-tabmail'
import ytRestPwdMail from './yt-restpwdmail'
import ytRestPwdTel from './yt-restpwdtel'

export default {
    components: {
        'yt-tabtel': tabtel,
        'yt-tabmail': tabmail,
        'yt-restpwdmail': ytRestPwdMail,        
        'yt-restpwdtel': ytRestPwdTel
    },
    data(){
        return{
        loginShow: true,
        restShow: true,
        num: 1,
        status: false
        }
    },
    methods: {
        selectFocus(num){
            if (num == 1) {
                this.num = num;
                this.loginShow = true;
                this.restShow = true;
            }else{
                this.num = num;
                this.loginShow = false;
                this.restShow = false;
            }
        },
        resetpwd(){
            this.status = true;
        },
        login(){
            this.status = false;
        }
    }
}
</script>

<style lang="less" scoped>
.login-box {
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
.resetpwd-tab{ position: absolute; bottom: 80px; right: 40px; font-size: 14px; color: #666; cursor: pointer;}
.login-tab{ position: absolute; bottom: 30px; right: 40px; font-size: 14px; color: #666; cursor: pointer;}
</style>
