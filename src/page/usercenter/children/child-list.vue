<template>
<div class="child-list">
    <div class="list-main">
        <ul class="flex" v-show="mainShow">
            <li class="child-box" v-for="item in items" :key="item.index">
                <div class="child-head">
                    <div class="child-avatar">
                        <img :src="item.headurl" alt="">
                    </div>
                    <div class="child-name">
                        <p class="cname">{{item.name}}</p>
                    </div>
                </div>
                <div class="child-form">
                    <!-- sex -->
                    <div class="sex section">
                        <div class="info-input clearfix">
                            <h3 class="info-title fl-l">性别</h3>
                            <p class="fl-r">{{sexText(item.sex)}}</p>
                        </div>
                    </div>
                    <!-- birthday -->
                    <div class="birthday section">
                        <div class="info-input clearfix">
                            <h3 class="info-title fl-l">年龄</h3>
                            <p class="fl-r">{{item.ages}}岁</p>
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
                            <p class="fl-r">{{item.level}}级</p>
                        </div>
                    </div>
                    <!-- complete -->
                    <div class="complete section">
                        <div class="info-input clearfix">
                            <h3 class="info-title fl-l">已上课时</h3>
                            <p class="fl-r">{{item.yes}}</p>
                        </div>
                    </div>
                    <!-- undone -->
                    <div class="undone section">
                        <div class="info-input clearfix">
                            <h3 class="info-title fl-l">未上课时</h3>
                            <p class="fl-r">{{item.no}}</p>
                        </div>
                    </div>
                    <div class="child-btn">
                        <button class="edit-childinfo" @click="editChild(item)">编辑</button>
                        <button class="checked-childinfo" @click="checkedChild(item.id,item.name)">选中角色</button>
                    </div>
                </div>
            </li>
        </ul>
        <div class="add-child-btn" @click="createChild()" v-show="mainShow">
          <i class="icon-add"></i>
        </div>
       <edit-child @updataStatus="updataStatus" :msg="editChildInfo" v-show="editShow"></edit-child>
       <append-child v-show="addShow"></append-child>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import editChild from './edit-child'
import appendChild from './append-child'
import common from '../../../components/common'

export default {
    components: {
        'edit-child': editChild,
        'append-child': appendChild,
    },
    data(){
        return{
            items: '',
            show: this.flag,
            editShow: false,
            mainShow: true,
            addShow: false,
            editChildInfo: ''
        }
    },
    mounted(){
        this.getChildList();
    },
    watch:{
        show: function () {
            console.log(1);
        }
    },
    methods:{
        // 获取孩子列表
        getChildList(){
            let that=this;
			// md5验证
			let userid = {
				'user_id': window.localStorage.getItem('id')
			}
			// ajax
			let url = `/api/v1/webget_userroles?${common.sort(userid)}`;
			axios.get(url,userid)
			.then(function (response) {
				if (response.data.errCode == 0) {
                    that.items = response.data.data;
				}else{
                    console.log('获取角色列表失败');
				}
			})
        },
        editChild(item){
            this.editChildInfo = item;
            this.editShow = true;
            this.mainShow = false;
        },
        createChild(){
            this.mainShow = false;
            this.addShow = true;
        },
        // 选择角色
        checkedChild(id,name){
            window.localStorage.setItem('child',id);
            this.$alert(`您已选择${name}，请赶快去约课学习吧~`, '', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$router.push('/study');
                }
            })
        },
        // 控制编辑显示
        updataStatus(value){
            this.editShow = true;
        },
        sexText(item){
            let text='';
            switch(item){
                case '0':
                    text='女';
                    break;
                case '1':
                    text='男';
                    break;
                case '2':
                    text='保密';
                    break;
            }
            return text;
        }
    }
}
</script>

<style lang="less" scoped>
.list-main{ position: relative; margin-top: 60px;
    .child-box{
        padding: 20px; margin: 0 auto; width: 250px; height: 450px; box-shadow: 0px 0px 10px 3px #ffefe9; border-radius: 10px;
        .child-head{ position: relative; top: -60px;
            .child-avatar{ margin: 0 auto; width: 80px; height: 80px; border-radius: 100%; overflow: hidden; box-shadow: 0px 0px 10px 3px #ffefe9; background-color: #fff;
            }
            .child-name{ margin: 10px auto; width: 60px; border-bottom: 1px solid #ff7b48;
                .cname{ width: 60px; height: 27px; overflow: hidden; font-size: 18px; color: #666; border: 0;  outline: 0; text-align: center;}
            }
        }
        .child-form{ margin-top: -20px;
            .section{ position: relative; margin: 0 auto; margin-bottom: 20px; width: 100%;
                .info-input{ width: 100%; border-bottom: 1px solid #666666;}
                .info-title{ display: inline-block; font-size: 18px; color: #666666;}
                p{ line-height: 20px; font-size: 18px; color: #ff7b48;}
            }
            .child-btn{ text-align: center;
                button{ display: inline-block; width: 80px; height: 30px; margin-right: 10px; font-size: 14px; border: 1px solid #ff7b48; background-color: #fff; border-radius: 20px; color: #ff7b48; cursor: pointer;}
            }
        }
    }
    .add-child-btn {
        position: absolute;
        bottom: -70px;
        left: 570px;
        width: 60px;
        height: 60px;
        text-align: center;
        border-radius: 100%;
        box-shadow: 0px 0px 2px 5px #ffefe9;
        cursor: pointer;
        .icon-add {
          display: inline-block;
          margin-top: 18px;
          width: 24px;
          height: 24px;
          background-image: url('../../../../static/img/icon-addchild.png');
          background-position: center;
          background-repeat: no-repeat;
        }
    }
}

</style>
