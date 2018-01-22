<template>
<transition name="el-fade-in-linear">
    <div class="course-info-box">
        <el-carousel indicator-position="none" :autoplay="false">
            <el-carousel-item :style="{height: 470 + 'px'}" v-for="item in items" :key="item.index">
                <div class="box-main">
                    <div class="info-title">
                        <p>{{typeDistinguish(item.type)}}</p>
                        <h2>{{item.title}}</h2>
                    </div>
                    <div class="info-time">
                        <p>上课时间：{{moment.unix(item.datetimes).format('MM月DD日 HH:mm')}}</p>
                    </div>
                    <div class="teacher-info">
                        <div class="teacher-img">
                            <img :src="item.headimg" alt="">
                        </div>
                        <div class="star flex">
                            <i class="icon-star-orange"></i>
                            <i class="icon-star-orange"></i>
                            <i class="icon-star-orange"></i>
                            <i class="icon-star-orange"></i>
                            <i class="icon-star-orange"></i>
                        </div>
                        <div class="teacher-text">
                            <p class="teacher-name"><span>本节老师：</span>{{item.cname}}</p>
                            <p class="teacher-school"><span>毕业院校：</span>{{item.text}}</p>
                            <p class="teacher-desc"><span>老师简介：</span>{{item.information}}</p>
                        </div>
                    </div>
                    <div class="classroom-btn" v-show="routerShow()">
                        <button :disabled="cs" @click="tolink(item.id,item.type)" :class="{disabled: cs}">{{classroomStatus(item.datetimes)}}</button>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</transition>
</template>

<script>
import axios from 'axios'
import common from '../common'

export default {
    props: [ 'childMsg' ],
    data(){
        return{
            items: this.childMsg,
            cs: '',
            tk_url: ''
        }
    },
    mounted(){
        this.arrayLike();
    },
    watch:{
        '$route':'routerShow'
    },
    methods:{
        // 处理课程数据
        arrayLike(){
            let arr = Array.from(this.childMsg);
            arr.shift();
            this.items = arr;
        },
        typeDistinguish(item){
            let text='';
            switch(item){
                case "0":
                    text='1v1';
                    break;
                case "1":
                    text='1v4';
                    break;
                case "2":
                    text='直播课';
                    break;
                case "3":
                    text='首次测评';
                    break;
            }
            return text;
        },
        // 判断路由状态
        routerShow(){
            if (this.$route.path === '/study/mycourse/complete') {
                return false;
            }
            else{
                return true;
            }
        },
        // 判断开课时间
        classroomStatus(item){
			const newDate = new Date();
			let text='';
			let date = parseInt(item+'000');
            let startClass = date - 600000;
			if (Number(newDate) < startClass) {
				this.cs = true;
				text = '等待开课'
			}else{
				this.cs = false;
				text = '进入教室'
			}
            return text;
        },
        // 跳转上课地址
		tolink(lesson,type){
			let that=this;
			let ls = window.localStorage.getItem('id');
			if (type == 3) {
				type = 1;
			}else{
				type = parseInt(type) + 1;
			}
			// md5验证
			let talk_cloud = {
				'schid': lesson,
				'type': '2',
				'user_id': ls,
				'lesson_type': type
			}
			// ajax
			let url = '/api/v1/talk_cloud/url';
			let config = {
				headers:{
					versions: '1',
					tokens: common.sortMd5(talk_cloud)
				}
			}
			axios.post(url,talk_cloud,config)
			.then(function (response) {
                that.tk_url = response.data.data.url;
                window.location.href = that.tk_url;
			})
		}
    }
}
</script>

<style lang="less" scoped>
.course-info-box{
    position: absolute;
    width: 250px;
    height: 470px;
    top: -460px;
    left: -125px;
    z-index: 99;
    .box-main{
        padding: 10px;
        width: 250px;
        height: 470px;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 10px;
        .info-title{
            text-align: center;
            p{
                text-align: center;
                font-size: 18px;
                color: #ff7b48;
            }
            h2{
                font-size: 20px;
                font-weight: 500;
                color: #ff7b48;
            }
            span{
                font-size: 14px;
                color: #999999;
            }
        }
        .info-time{
            margin-top: 10px;
            p{
                text-align: center;
                font-size: 16px;
                color: #ff7b48;
            }
        }
        .teacher-info{
            margin-top: 10px;
            .teacher-img{
                overflow: hidden;
                margin: 0 auto;
                width: 60px;
                height: 60px;
                border: 3px solid #ff7b48;
                border-radius: 100%;
                img{
                    float: left;
                    width: 60px;
                }
            }
            .star{
                margin: 10px auto;
                width: 125px;
                .icon-star-orange{
                    display: inline-block;
                    margin-right: 5px;
                    width: 20px;
                    height: 20px;
                    background: url('../../../static/img/icon-star-orange.png') center no-repeat;
                }
            }
            .teacher-text{
                font-size: 14px;
                p{
                    color: #999999;
                    span{
                        color: #ff7b48;
                    }
                }
                .teacher-desc{
                    overflow: hidden;
                    height: 125px;
                    word-break:break-all;
                    display:-webkit-box;
                    -webkit-line-clamp:6;
                    -webkit-box-orient:vertical;
                    overflow:hidden;
                }
            }
        }
        .classroom-btn{
            margin-top: 20px;
            text-align: center;
            button{
                display: inline-block;
                width: 135px;
                height: 32px;
                font-size: 14px;
                line-height: 30px;
                border: 0;
                background-image: url('../../../static/img/button.png');
                background-size: 135px 32px;
                color: #fff;
            }
        }
    }
}
.el-carousel{
    height: 470px;
}
</style>
