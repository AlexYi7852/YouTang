<template>
  <div class="tab-mail tab-list">
    <div class="form-wrapper">
        <div class="account flex">
            <p class="input-title">邮箱账号:</p>
            <div class="input-row">
                <input type="mail" name="account" class="form-control" autocomplete="off" v-model="loginMail" placeholder="输入邮箱账号">
            </div>
        </div>
        <div class="password flex">
            <p class="input-title">密码:</p>
            <div class="input-row">
                <input type="password" name="password" class="form-control" v-model="loginMailpwd" placeholder="输入密码">
            </div>
        </div>
    </div>
    <div class="btn-area">
        <button class="btn" id="submitLogin" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default {
    data: function(){
        return{
            loginMail: '',
            loginMailpwd: ''
        }
    },
    methods:{
        login:function(){
            let that = this;
            if (this.loginMail == '' || this.loginMailpwd == '') {
                let alert = {
                    message: '请填写完整的资料',
                    type: 'warning'
                }
                that.alertOpen(alert.message,alert.type);
            }else{
                // md5验证
                let login = {
                    'email': this.loginMail,
                    'password': this.loginMailpwd,
                    'post_type': 'login',
                },
                keys = Object.keys(login),
                i, len = keys.length;
                keys.sort();
                let p = '';
                for (i = 0; i < len; i++) {
                    let k = keys[i];
                    p += k+'='+login[k]+'&';
                }
                p = p.substring(0,p.length-1);
                let tokens = md5('ilovewan' + p + 'banghanchen');
                // ajax
                let url = '/api/v1/users/web_login';
                let formData = new FormData();
                formData.append('email', this.loginMail);
                formData.append('password', this.loginMailpwd);
                formData.append('post_type', 'login');
                let config = {
                    headers:{
                        versions: '1',
                        tokens: tokens,
                        'content-type': 'multipart/form-data'
                    }
                }
                axios.post(url,formData,config)
                .then(function (response) {
                    if (response.data.errCode == '0') {
                        console.log(response.data.data)
                        let alert = {
                            message: '登录成功',
                            type: 'success'
                        }
                        that.alertOpen(alert.message,alert.type);
                        window.localStorage.setItem('id',response.data.data.id);
                        window.localStorage.setItem('child',response.data.data.role_id);
                        window.localStorage.setItem('token_id',response.data.data.token_id);
                        window.location.href = '/study';
                    }else if(response.data.errCode == '30005'){
                        let alert = {
                            message: '用户名或密码错误',
                            type: 'error'
                        }
                        that.alertOpen(alert.message,alert.type);
                    }else{
                        let alert = {
                            message: '登录失败',
                            type: 'error'
                        }
                        that.alertOpen(alert.message,alert.type);
                    }
                })
                .catch(function (error) {
                    let alert = {
                        message: '系统错误',
                        type: 'error'
                    }
                    that.alertOpen(alert.message,alert.type);
                })
            }
        },
        alertOpen(msg,tp){
            this.$message({
                message: msg,
                type: tp
            });
        }
    }
}
</script>

<style lang="less" scoped>
.form-wrapper{ 
    margin-top: 80px;
    .account{
        margin-top: 20px;
        border-bottom: 1px solid #ff7b48;
        p{
            width: 65px;
            line-height: 40px;
            color: #ff7b48;
        }
    }
    .password{
        margin-top: 20px;
        border-bottom: 1px solid #ff7b48;
        p{
            width: 65px;
            line-height: 40px;
            color: #ff7b48;
        }
    }
    .input-title{
        font-size: 14px;
        color: #555;
    }
    .input-row{ width: calc(~'100% - 65px');
        input{
            padding-left: 15px;
            width: 100%;
            height: 40px;
            border: 0;
            background: #FFFFFF;
            outline: 0;
        }
    }
}
.btn-area{
    margin-top: 80px;
    .btn-link{
        display: block;
        margin-top: 15px;
        text-align: center;
        font-size: 16px;
        color: #F8763D;
    }
    .btn{
        width: 100%;
        height: 50px;
        background-color: #ff7b48;
        border-radius: 6px;
        box-shadow: 0px 0px 7px 3px #ece5e3;
        font-size: 16px;
        border: 0;
        color: #FFFFFF;
        cursor: pointer;
    }
}
</style>