<template>
	<div class="ucenter">
		<yt-header :navShow="true"></yt-header>
		<div class="main-content">
      <div class="ucenter-box">
        <div class="ucenter-head">
          <div class="ucenter-avatar">
            <VueImgInputer v-model="picValue" theme="material" size="small" :imgSrc="userInfo.headimg"></VueImgInputer>
          </div>
          <p class="name">{{userInfo.cname}}</p>
        </div>
        <div class="ucenter-info" v-show="childShow">
          <!-- cname -->
          <div class="cname section">
            <div class="info-input clearfix">
              <h3 class="info-title fl-l">姓名</h3>
              <el-input class="fl-r" v-model="userInfo.cname" :disabled="disabled"></el-input>
            </div>
            <span>用于高等教育课程证书登记与发放，不会以任何形式向第三方透漏</span>
          </div>
          <!-- sex -->
          <div class="sex section">
            <div class="info-radio clearfix">
              <h3 class="info-title fl-l">性别</h3>
              <el-radio-group class="fl-r" v-model="userInfo.sex" v-show="!disabled">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
                <el-radio :label="2">保密</el-radio>
              </el-radio-group>
              <p class="sex-text fl-r" v-show="disabled">{{sexText(userInfo.sex)}}</p>
            </div>
          </div>
          <!-- country -->
          <div class="country section">
            <div class="info-input clearfix">
              <h3 class="info-title fl-l">国籍</h3>
              <el-select class="fl-r" v-model="userInfo.country_c" placeholder="请选择" v-show="!disabled">
                <el-option v-for="country in countryList" :key="country.index" :label="country.countryname" :value="country.id"></el-option>
              </el-select>
              <p class="country-text fl-r" v-show="disabled">{{userInfo.country_c}}</p>
            </div>
          </div>
          <!-- birthday -->
          <div class="birthday flex section">
            <div class="info-date clearfix">
              <h3 class="info-title fl-l">出生日期</h3>
              <el-date-picker class="fl-r" v-model="userInfo.birthday" type="date" :disabled="disabled"></el-date-picker>
            </div>
          </div>
          <!-- email -->
          <div class="email section">
            <div class="info-input clearfix">
              <h3 class="info-title fl-l">常用邮箱</h3>
              <el-input class="fl-r" v-model="userInfo.email" placeholder="请输入常用邮箱" :disabled="disabled"></el-input>
            </div>
            <span>用于接收来自平台和课程的邮件通知，非常重要</span>
            <!-- <button class="sendsms" @click="sendMailSms()" v-show="!disabled">发送验证码</button> -->
          </div>
          <!-- phone -->
          <div class="phone section">
            <div class="info-input clearfix">
              <h3 class="info-title fl-l">手机号码</h3>
              <el-input class="fl-r" v-model="userInfo.phone" placeholder="请输入手机号码" :disabled="disabled"></el-input>
            </div>
            <span>用于优质课程的学习提醒等服务，手机号不会对外公开，请放心</span>
            <!-- <button class="sendsms" @click="sendPhoneSms()" v-show="!disabled">发送验证码</button> -->
          </div>
          <!-- pwd -->
          <div class="restpwd section">
            <div class="info-input clearfix">
              <h3 class="info-title fl-l">密码</h3>
              <button class="restpwd-btn fl-r">修改密码</button>
            </div>
          </div>
          <div class="info-btn">
            <button class="save-userinfo" @click="saveUserInfo()" v-show="!disabled">保存</button>
            <button class="edit-userinfo" @click="editUserInfo()" v-show="disabled">编辑</button>
          </div>
          <div class="userinfo-showflag" @click="showStatus()">
            <i class="icon-arrow-top"></i>
          </div>
        </div>
        <child-create @createStatus="createStatus" v-show="createShow"></child-create>
        <child-list v-show="listShow" ref="childList"></child-list>
      </div>
		</div>
		<yt-footer></yt-footer>
	</div>
</template>

<script>
import VueImgInputer from 'vue-img-inputer'
import ytHeader from '../../components/header/yt-header'
import ytFooter from '../../components/footer/yt-footer'
import childCreate from './children/child-create'
import childList from './children/child-list'
import axios from 'axios'
import common from '../../components/common'

export default {
  components: {
    'yt-header': ytHeader,
    'yt-footer': ytFooter,
    'child-create': childCreate,
    'child-list': childList,
    VueImgInputer
  },
  data() {
    return {
      userInfo: [],
      picValue: '',
      countryList: [],
      disabled: false,
      childShow: true,
      createShow: false,
      listShow: false,
      listFlag: false
    }
  },
  mounted(){
    this.checkLogin();
    this.getUserInfo();
    this.getCountryList();
  },
  methods: {
    createStatus (value) {
      this.listShow = false
      this.$refs.childList.getChildList()
    },
    checkLogin(){
      if(!window.localStorage.getItem('id')){
        this.$router.push('/login');
      }else{
        if (!window.localStorage.getItem('child')) {
          this.$alert('请完善您的个人信息并添加一个或多个角色', '请完善信息', {
            confirmButtonText: '确定',
          })
        }
      }
    },
    // 获取用户信息
    getUserInfo(){
			let that=this;
			// md5验证
			let userid = {
				'id': window.localStorage.getItem('id')
			}
			// ajax
			let url = `/api/v1/web_studentuser_info?${common.sort(userid)}`;
			axios.get(url,userid).then((response) => {
				if (response.data.errCode == 0) {
          that.userInfo = response.data.data;
          that.userInfo.sex = parseInt(that.userInfo.sex);
          // 日期类型转换
          if (that.userInfo.birthday == '0') {
            that.userInfo.birthday = that.moment().toDate();
          }else {
            that.userInfo.birthday = that.moment.unix(that.userInfo.birthday).toDate();
          }
				}else{
          that.$alert(response.data.errMsg, '系统错误', {
						confirmButtonText: '确定',
					})
				}
			})
    },
    // 查询国家列表
    getCountryList(){
      let that=this;
			// ajax
			axios.get('/api/v1/country/countryinfo')
			.then(function (response) {
				if (response.data.errCode == 0) {
          that.countryList = response.data.data;
				}else{
          that.$alert(response.data.errMsg, '系统错误', {
						confirmButtonText: '确定',
					})
				}
			})
    },
    // 保存用户信息
    saveUserInfo(){
			let that=this;
			// md5验证
			let data = {
        'id': window.localStorage.getItem('id'),
        'cname': this.userInfo.cname,
        'country': this.userInfo.country_c,
        'sex': this.userInfo.sex,
        'birthday': this.moment(this.userInfo.birthday).unix(),
        'headimg': this.picValue
			}
			// ajax
			let url = '/api/v1/users/web_update';
      let formData = new FormData();
      formData.append('id', window.localStorage.getItem('id'));
      formData.append('cname', this.userInfo.cname);
      formData.append('country', this.userInfo.country_c);
      formData.append('sex', this.userInfo.sex);
      formData.append('birthday', this.moment(this.userInfo.birthday).unix());
      formData.append('headimg', this.picValue);
			let config = {
				headers:{
					versions: '1',
					tokens: common.sortMd5(data),
          as: '3'
				}
      }
			axios.post(url,formData,config)
			.then(function (response) {
				if (response.data.errCode == 0) {
          console.log('保存成功！');
          that.disabled = true;
          that.getUserInfo();
				}else{
          that.$alert(response.data.errMsg, '系统错误', {
						confirmButtonText: '确定',
					})
				}
			})
    },
    // 编辑用户信息
    editUserInfo(){
      this.disabled = false;
    },
    sexText(item){
      let text='';
      switch(item){
          case 0:
              text='女';
              break;
          case 1:
              text='男';
              break;
          case 2:
              text='保密';
              break;
      }
      return text;
    },
    // 切换显示
    showStatus(){
      let userId = { 'userId': window.localStorage.id}
      let url = '/api/v1/sonstatus/webson'
      axios.post(url, userId).then((response) => {
        if(response.data.errCode === 0) {
          if (response.data.data.nt_role == '1') {
            this.childShow = false;
            this.listShow = true;
          }else{
            this.childShow = false;
            this.createShow = true;
          }
        }
      })
    },
    sendMailSms(){

    }
  }
}
</script>

<style lang="less" scoped>
.ucenter{ width: 100%; background-color: #F2F3F4; overflow: hidden;
	.main-content{ width: 100%;
    .ucenter-box{ margin: 60px auto; width: 1200px; height: 662px; background-color: #fff; border-radius: 20px;
      .ucenter-head{ position: relative; margin: 0 auto; width: 200px; height: 76px; box-shadow: 0px 5px 5px #ffefe9; border-radius: 0px 0px 25px 25px;
        .ucenter-avatar{ position: absolute; top: -40px; left: 55px; padding: 3px 4px 4px; width: 90px; height: 90px; overflow: hidden; background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/user-avatarbg.png'); background-position: center; background-size: 90px; border-radius: 100%;}
        p{ padding-top: 50px; font-size: 16px; text-align: center; color: #999999;}
      }
      .ucenter-info{ position: relative; margin: 0 auto; margin-top: 50px; padding: 20px; width: 730px; height: 480px; box-shadow: 0px 0px 10px 5px #ffefe9; border-radius: 10px;
        .section{ position: relative; margin: 0 auto; margin-bottom: 20px; width: 358px;
          .info-input{ width: 100%; border-bottom: 1px solid #666666;}
          .info-radio{ width: 100%; border-bottom: 1px solid #666666;}
          .info-date{ width: 100%; border-bottom: 1px solid #666666;}
          .info-title{ min-width: 80px; width: 80px; font-size: 18px; color: #666666;}
          p{ line-height: 20px; font-size: 18px; color: #ff7b48;}
          span{ font-size: 12px; color: #ff7b48;}
          .sendsms{ position: absolute; top: 0px; right: -150px; width: 126px; height: 30px; border: 1px solid #ff7b48; border-radius: 15px; color: #ff7b48; cursor: pointer; font-size: 14px; background-color: #fff;}
        }
        .cname{ margin-top: 10px;}
        .restpwd{
          .restpwd-btn{ border: 0; outline: 0; font-size: 18px; background-color: #fff; color: #ff7b48; cursor: pointer;}
        }
        .info-btn{ width: 100%; text-align: center;
          .save-userinfo{ display: inline-block; width: 188px; height: 44px; text-align: center; background-image: url('../../../static/img/lesson-buy-btn.png'); background-repeat: no-repeat; background-color: #fff; color: #fff; font-size: 16px; border: 0; outline: 0; cursor: pointer;}
          .edit-userinfo{ display: inline-block; width: 188px; height: 44px; text-align: center; background-image: url('../../../static/img/lesson-buy-btn.png'); background-repeat: no-repeat; background-color: #fff; color: #fff; font-size: 16px; border: 0; outline: 0; cursor: pointer;}
        }
        .userinfo-showflag{ position: absolute; bottom: -25px; left: 332px; width: 68px; height: 28px; text-align: center; background-color: #fff; border-radius: 0px 0px 36px 36px; box-shadow: 0px 5px 5px #ffefe9; cursor: pointer;
          .icon-arrow-top{ display: inline-block; width: 10px; height: 6px; background-image: url('../../../static/img/icon-arrow-top.png')}
        }
      }
    }
  }
}
.img-inputer--small{ width: 82px; height: 82px; border-radius: 100%; overflow: hidden;}
.img-inputer:hover{ transform: scale(1);}

</style>
