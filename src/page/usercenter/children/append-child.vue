<template>
  <div class="append-child">
    <div class="child-box">
      <div class="child-head">
        <div class="child-avatar">
          <VueImgInputer v-model="picValue" theme="material" size="small" :imgSrc="child.headurl"></VueImgInputer>
        </div>
        <div class="child-name">
          <input type="text" class="cname" v-model="child.name" placeholder="名字" maxlength="4">
        </div>
      </div>
      <div class="child-form">
        <!-- sex -->
        <div class="sex section">
          <div class="info-input clearfix">
            <h3 class="info-title fl-l">性别</h3>
            <el-radio-group class="fl-r" v-model="child.sex">
              <el-radio :label="1">男孩</el-radio>
              <el-radio :label="0">女孩</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- ages -->
        <div class="ages section">
          <div class="info-date clearfix">
            <h3 class="info-title fl-l">年龄</h3>
            <el-input class="fl-r" v-model="child.ages" type="text" maxlength="2"></el-input>
          </div>
        </div>
        <!-- reward -->
        <div class="reward section">
          <div class="info-input clearfix">
            <h3 class="info-title fl-l">奖励</h3>
            <p class="fl-r">0</p>
          </div>
        </div>
        <!-- level -->
        <div class="reward section">
          <div class="info-input clearfix">
            <h3 class="info-title fl-l">当前等级</h3>
            <p class="fl-r">0</p>
          </div>
        </div>
        <!-- complete -->
        <div class="complete section">
          <div class="info-input clearfix">
            <h3 class="info-title fl-l">已上课时</h3>
            <p class="fl-r">0</p>
          </div>
        </div>
        <!-- undone -->
        <div class="undone section">
          <div class="info-input clearfix">
            <h3 class="info-title fl-l">未上课时</h3>
            <p class="fl-r">0</p>
          </div>
        </div>
        <div class="savechild-btn">
          <button class="save-childinfo" @click="saveChildInfo()">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import VueImgInputer from 'vue-img-inputer'
  import common from '../../../components/common'

  export default {
    components: {
      VueImgInputer,
    },
    data() {
      return {
        child: {
            headurl: '../../../../static/img/child-avatar.png',
            name: '',
            sex: '',
            ages: ''
        },
        picValue: ''
      }
    },
    methods: {
      // 保存孩子信息
      saveChildInfo() {
        let data = {
          'user_id': window.localStorage.id,
          'name': this.child.name,
          'sex': this.child.sex,
          'ages': this.child.ages,
          'headurl': this.picValue
        }
        let formData = new FormData();
        formData.append('user_id', window.localStorage.id );
        formData.append('name', this.child.name);
        formData.append('sex', this.child.sex);
        formData.append('ages', this.child.ages);
        formData.append('headurl', this.picValue);
        let config = {
          headers:{
            versions: '1',
            tokens: common.sortMd5(data),
            as: '3'
          }
        }
        let url = '/api/v1/webinsert_userrole'
        axios.post(url, formData, config).then((response) => {
          if (response.data.errCode === 0) {
            this.createShow = true;
            window.localStorage.setItem('child',response.data.data.id);
            this.$alert('添加孩子成功', '成功', {
                confirmButtonText: '确定',
                callback: action => {
                    // this.$emit('createStatus', false);
                    window.location.href = '/usercenter';
                }
            })
          }
          else if (response.data.errCode === 40004) {
            this.$alert(response.data.errMsg, { confirmButtonText: '确定' })
          }
          else if (response.data.errCode === 30001) {
            this.$alert(response.data.errMsg, { confirmButtonText: '确定' })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .append-child{
    .child-box {
      padding: 20px;
      margin: 0 auto;
      width: 250px;
      height: 450px;
      box-shadow: 0px 0px 10px 3px #ffefe9;
      border-radius: 10px;
      .child-head {
        position: relative;
        top: -60px;
        .child-avatar {
          margin: 0 auto;
          width: 80px;
          height: 80px;
          border-radius: 100%;
          overflow: hidden;
          box-shadow: 0px 0px 10px 3px #ffefe9;
          background-color: #fff;
        }
        .child-name {
          margin: 10px auto;
          width: 60px;
          border-bottom: 1px solid #ff7b48;
          .cname {
            width: 60px;
            font-size: 18px;
            color: #666;
            border: 0;
            outline: 0;
            text-align: center;
          }
        }
      }
      .child-form {
        margin-top: -20px;
        .section {
          position: relative;
          margin: 0 auto;
          margin-bottom: 20px;
          width: 100%;
          .info-input {
            width: 100%;
            border-bottom: 1px solid #666666;
          }
          .info-radio {
            width: 100%;
            border-bottom: 1px solid #666666;
          }
          .info-date {
            width: 100%;
            border-bottom: 1px solid #666666;
          }
          .info-title {
            display: inline-block;
            font-size: 18px;
            color: #666666;
          }
          p {
            line-height: 20px;
            font-size: 18px;
            color: #ff7b48;
          }
        }
        .savechild-btn {
          text-align: center;
          .save-childinfo {
            display: inline-block;
            width: 60px;
            height: 30px;
            font-size: 14px;
            border: 1px solid #ff7b48;
            background-color: #fff;
            border-radius: 20px;
            color: #ff7b48;
            cursor: pointer;
          }
        }
      }
    }
    .img-inputer--small {
      width: 80px;
      height: 80px;
      border-radius: 100%;
      overflow: hidden;
    }

    .img-inputer:hover {
      transform: scale(1);
    }
  }
</style>
