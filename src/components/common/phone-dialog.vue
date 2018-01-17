<template>
    <div class="phone-dialog dialog">
        <div class="dialog-box">
            <div class="dialog-text">
                <span>验证码已发送至邮箱</span>
                <p>{{userEmail}}</p>
            </div>
            <div class="dialog-input">
                <input type="text" maxlength="6">
                <p>{{time}}s后重新获取</p>
            </div>
            <div class="dialog-btn">
                <button class="dialog-ok">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['phoneIsDoalog','changePhone'],
    data() {
        return {
            userEmail: '',
            time: ''
        }
    },
    methods:{
        
    }
}
</script>


<style lang="less" scoped>
.dialog{
  .el-input{ width: 80%;}
}
</style>