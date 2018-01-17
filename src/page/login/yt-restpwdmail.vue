<template>
    <div class="rest-mail">
        <div class="form-wrapper">
            <div class="account flex">
                <p class="input-title">邮箱账号:</p>
                <div class="input-row">
                    <input type="mail" name="account" class="form-control" v-model="restMail" placeholder="输入邮箱账号">
                </div>
            </div>
            <div class="smscode flex">
                <p class="input-title">验证码:</p>
                <div class="input-row">
                    <input type="tel" name="smscode" class="form-control" v-model="restSms" maxlength="6" placeholder="输入验证码">
                    <button class="btn" @click='daojishi()' :disabled='isDisabled'>{{time}}</button>
                    <div class="page-polite">
                    </div>
                </div>
            </div>
            <div class="password flex">
                <p class="input-title"> 新密码:</p>
                <div class="input-row">
                    <input type="password" name="password" class="form-control" v-model="newPwd" placeholder="输入新密码">
                </div>
            </div>
            <div class="password flex">
                <p class="input-title">确认密码:</p>
                <div class="input-row">
                    <input type="password" name="password" class="form-control" v-model="qrNewPwd" placeholder="确认新密码">
                </div>
            </div>
        </div>
        <div class="btn-area">
            <button class="btn" id="submitRegister" @click="rest()">修改密码</button>
        </div>
    </div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default {
    data(){
        return{
            restMail: '',
            restSms: '',
            time: '发送验证码',
            isdaojishi: false,
            isDisabled: false,
            newPwd: '',
            qrNewPwd: ''
        }
    },
    methods:{
        // 验证码获取
        daojishi:function() {
            let that = this;
            // 验证是否为空
            if (this.restMail == '') {
                let alert = {
                    message: '请输入邮箱',
                    type: 'warning'
                }
                this.alertOpen(alert.message,alert.type);
            }else{
                // 计时器
                this.time = 60;
                this.isDisabled=true;
                this.isdaojishi=true;
                let interval = window.setInterval(function() {
                    if ((this.time--) <= 0) {
                        this.time = '重新发送';
                        this.isdaojishi = false;
                        this.isDisabled = false;
                        window.clearInterval(interval);
                    }
                }.bind(this), 1000);
                // md5验证
                let sendsms = {
                    'email': this.restMail,
                    'type': '10'
                },
                keys = Object.keys(sendsms),
                i, len = keys.length;
                keys.sort();
                let p = '';
                for (i = 0; i < len; i++) {
                    let k = keys[i];
                    p += k+'='+sendsms[k]+'&';
                }
                p = p.substring(0,p.length-1);
                let tokens = md5('ilovewan' + p + 'banghanchen');
                // ajax
                let url = `/api/v1/sms/email?${p}`;
                axios.get(url)
                .then(function (response) {
                    console.log(response.data.errMsg);
                })
                .catch(function (error) {
                    let alert = {
                        message: '发送验证码失败',
                        type: 'error'
                    }
                    that.alertOpen(alert.message,alert.type);
                })
            }
        },
        // 邮箱修改密码
        rest(){
            let that = this;
            if (this.restMail == '' || this.restSms == '' || this.newPwd == '' || this.qrNewPwd == '') {
                let alert = {
                    message: '请填写完整的资料',
                    type: 'warning'
                }
                this.alertOpen(alert.message,alert.type);
            }else{
                if (this.newPwd.length >= 6) {
                    if (this.newPwd == this.qrNewPwd) {
                        // md5验证
                        let login = {
                            'email': this.restMail,
                            'password': this.newPwd,
                            'post_type': 'find_password',
                            'smscode': this.restSms
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
                        let url = '/api/v1/users/web_found';
                        let formData = new FormData();
                        formData.append('email', this.restMail);
                        formData.append('password', this.newPwd);
                        formData.append('post_type', 'find_password');
                        formData.append('smscode', this.restSms);
                        let config = {
                            headers:{
                                versions: '1',
                                tokens: tokens,
                                'content-type': 'multipart/form-data'
                            }
                        }
                        axios.post(url,formData,config)
                        .then(function (response) {
                            console.log(response);
                            if (response.data.errCode == 0) {
                                that.$alert('修改密码成功', response.data.errMsg, {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        window.location.href = '/login'
                                    }
                                });
                            }else{
                                let alert = {
                                    message: response.data.errMsg,
                                    type: 'error'
                                }
                                that.alertOpen(alert.message,alert.type);
                            }
                        })
                    }else{
                        let alert = {
                            message: '两次密码输入的不一致，请重新输入',
                            type: 'warning'
                        }
                        this.alertOpen(alert.message,alert.type);
                    }
                }else{
                    let alert = {
                        message: '密码过短，请输入6位或6位以上的密码',
                        type: 'warning'
                    }
                    this.alertOpen(alert.message,alert.type);
                }
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
    margin-top: 40px;
    .account{
        margin-top: 20px;
        border-bottom: 1px solid #ff7b48;
        p{
            min-width: 65px;
            line-height: 40px;
            color: #ff7b48;
        }
    }
    .smscode{
        margin-top: 20px;
        border-bottom: 1px solid #ff7b48;
        p{
            width: 65px;
            line-height: 40px;
            color: #ff7b48;
        }
        .input-row{
            display: flex;
            align-items: center;
            .btn{
                margin-left: 10px;
                width: 120px;
                height: 40px;
                border: 0;
                background: #FFFFFF;
                font-size: 14px;
                color: #F9763D;
                cursor: pointer;
            }
        }
    }
    .password{
        margin-top: 20px;
        border-bottom: 1px solid #ff7b48;
        p{
            min-width: 65px;
            line-height: 40px;
            color: #ff7b48;
        }
    }
    .input-title{
        font-size: 14px;
        color: #555;
    }
    .input-row{
        width: 100%;
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
    margin-top: 50px;
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