<template>
<div class="undone">
    <!-- 时间轴模式 -->
    <div class="timeline">
        <div class="month-title">
            <h1><span>{{titleMonth}}</span>月</h1>
        </div>
        <div class="timeline-main">
            <div class="line-list">
                <ul class="flex">
                    <li class="item-column" v-for="(item,index) in items" :key="index" :style="{ marginLeft: cHeight + 'px', marginRight: cHeight + 'px' }">
                        <div class="column" :style="{height: item[0]+ 'px' }"></div>
                        <div class="round" @click="getDialogInfo(index)" :style="{ top: (-item[0] - 10 - jumpRound) + 'px' }" :class="dataIndex==index?'animate':''"></div>
                        <courseBox :child-msg="item" v-show="dataIndex==index? show:''"></courseBox>
                        <div class="showbox" @click="showHide()" v-show="dataIndex==index? show:''"></div>
                    </li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="day-list">
                <ul class="flex">
                    <li class="list-item" v-for="(item, index) in items" :key="item.index" :style="{ marginLeft: cHeight + 'px', marginRight: cHeight + 'px' }">
                        <p class="item-day">{{index}}th</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="date-select clearfix">
            <el-select v-model="value" placeholder="请选择">
                <el-option v-for="date in dates" :key="date" :label="date" :value="date"></el-option>
            </el-select>
        </div>
        <div class="switch-mode clearfix">
            <router-link to="/study/mycourse/readUndone">
                <el-button>切换阅读模式</el-button>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import courseBox from '../../../components/common/course-info'
import common from '../../../components/common'

export default {
    components: { courseBox },
    data(){
        return{
            titleMonth: this.moment().format('MM'),     //标题当前月份
            items: [],                                  //当前月份数据
            dates: [],                                  //当前月往后的12个月
            cHeight: '',                                //时间轴柱间距
            jumpRound: 0,                               //点击弹起动画
            dataIndex: null,                            //循环课程信息索引
            show: true,                                 //显示
            value: ''
        }
    },
    mounted(){
        this.last_year_month();
      this.getDate()
    },
    watch:{
        'value':'getOutLesson'
    },
    methods: {
      getDate(){
        let date = this.moment.unix(this.$route.query.timestamp).format('DD')
        this.getDialogInfo(date)
      },
        // 获取当前月往后的12个月
        last_year_month(){
            let result = [];
            let now = this.moment().month();
            for (let i = 0; i < 12; i++) {
                let b = this.moment().month(now + i).format('YYYY年MM月');
                result.push(b);
            }
            this.dates = result;
            this.value = result[0];
        },
        // 获取未上的课时间与详情
        getOutLesson(){
            // 初始化日期
            let year = parseInt(this.value.substring(0,4));
            let month = parseInt(this.value.substring(5,7)) - 1;
            let d = new Date();
            d.setFullYear(year,month,1);
            d.setHours(0,0,0);
            let data = {
                user_id: window.localStorage.getItem('child'),
                mouth: this.moment(d).unix()
            }
            let config = {
                headers:{
                    tokens: common.sortMd5(data)
                }
            }
            // ajax
			let url = '/api/v1/course/weboutlesson';
            axios.post(url, data ,config).then((response) => {
                this.titleMonth = month + 1;
                if (response.data.errCode == 0) {
                    this.items = response.data.data;
                    let keys = Object.keys(this.items);
                    this.columnHeight(keys.length);
                }
                else if (response.data.errCode == 60002) {
                    this.items = '';
                    this.$alert('本月还没有未上的课程，请先预约课程', '系统提示', {
                        confirmButtonText: '确定',
                    })
                }
            })
        },
        // 时间轴柱间距
        columnHeight(num){
            let a = (862 - num * 50) / (2 * num);
            this.cHeight = a;
        },
        // 切换课程弹窗
        getDialogInfo(index) {
            this.dataIndex=index;
            this.animated = "animate";
        },
        // 点击消失
        showHide(){
            this.dataIndex = null;
        }
    }
}
</script>


<style lang="less" scoped>
.undone{
    .timeline{
        padding: 14px;
        .month-title{
            margin-left: 10px;
            h1{
                font-size: 80px;
                line-height: 88px;
                font-weight: 500;
                color: #d5d9e3;
                span{
                    font-size: 88px;
                }
            }
        }
        .timeline-main{
            margin-top: 10px;
            width: 100%;
            height: 400px;
            .line-list{
                margin: 0 20px;
                height: 370px;
                .item-column{
                    position: relative;
                    bottom: -360px;
                    width: 50px;
                    height: 10px;
                    .column{
                        position: absolute;
                        bottom: 0px;
                        left: 22px;
                        width: 6px;
                        height: 0px;
                        background-color: #ff7b48;
                        transition: all .5s;
                    }
                    .round{
                        position: absolute;
                        top: -20px;
                        left: 5px;
                        width: 40px;
                        height: 40px;
                        background-image: url('../../../../static/img/icon-timeline-round.png');
                        background-position: center;
                        background-repeat: no-repeat;
                        transition: all .5s;
                        cursor: pointer;
                        z-index: 99;
                    }
                    .animate{
                        animation: bounce .8s;
                    }
                }
            }
            .line{
                width: 100%;
                height: 2px;
                background-color: #ff7b48;
            }
            .day-list{
                margin: 5px 20px;
                .list-item{
                    width: 50px;
                    .item-day{
                        text-align: center;
                        font-size: 14px;
                        color: #ff7b48;
                    }
                }
            }
        }
        .date-select{
            margin-top: 10px;
            #date{
                float: right;
                width: 128px;
                height: 30px;
                font-size: 16px;
                border: 0;
                outline: 0;
                color: #ff7b48;
            }
        }
        .switch-mode{
            margin-top: 14px;
            .el-button{
                float: right;
                padding: 0;
                width: 126px;
                height: 28px;
                line-height: 28px;
                border: 1px solid #ff7b48;
                border-radius: 8px;
                background-color: transparent;
                color: #ff7b48;
                cursor: pointer;
            }
        }
    }
}
@keyframes bounce { 50% { transform: translateY(-100px); } 100% { transform: translateY(0px); } }
.el-select{
    float: right;
}
</style>
