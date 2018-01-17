<template>
    <div class="myscore">
        <div class="score-head">
            <p><span>1对1</span> {{moment.unix(grade.datetimes).format('MM月DD日')}}{{grade.title}}</p>
            <p><span>成绩：</span>lv.{{lv.level}}级<span style="margin-left: 5px;">老师：</span>{{grade.name}}</p>
        </div>
        <div class="score-title">
            <h1>我们为您测评的中文等级为<span>{{lv.level}}级</span></h1>
            <h3>建议从{{lv.level}}级课程开始学起。祝您学习愉快！</h3>
        </div>
        <div class="score-main flex">
            <ul class="score-list">
                <li class="grad-1">
                    <i class="icon-y"></i>
                    <p>优唐中文分级</p>
                </li>
                <li class="grad-2">
                    <i class="icon-r"></i>
                    <p>词汇量</p>
                </li>
                <li class="grad-3">
                    <i class="icon-p"></i>
                    <p>新<span>YCT</span>中小学生考试</p>
                    <div class="show-box">
                        <p><span>*</span>YCT是一项国际汉语能力标准化考试，考查汉语非第一语言的中小学生在日常生活和学习中运用汉语的能力。</p>
                    </div>
                </li>
                <li class="grad-4">
                    <i class="icon-b"></i>
                    <p>新<span>HSK</span>汉语水平考试</p>
                    <div class="show-box">
                        <p><span>*</span>HSK是一项国际汉语能力标准化考试，重点考查汉语非第一语言的考生在生活、学习和工作中运用汉语进行交际的能力。</p>
                    </div>
                </li>
            </ul>
            <div class="score-img">
                <img :src="lv.url" alt="">
                <p><span>*</span>{{lv.desc}}</p>
            </div>
        </div>
        <div class="skill-list">
            <ul class="clearfix">
                <li v-for="(skill, index) in skills" :key="skill.index">
                    <i class="icon-skill box-icon"></i>
                    <div class="show-box">
                        <i class="icon-skill"></i>
                        <p>{{skill.desc}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default {
  	data() {
		return {
			grade: [],
            lv: [],
            skills: []
		}
	},
	mounted(){
        this.gradesList();
		this.ecaluation();
	},
	methods:{
		// 我的成绩列表渲染
		gradesList(){
			let that=this;
			// md5验证
			let user_id = {
				'role_id': window.localStorage.getItem('child')
			},
			keys = Object.keys(user_id),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+user_id[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5(`ilovewan${p}banghanchen`);
			// ajax
			let url = '/api/v1/grades/webget_grades';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.post(url,user_id,config)
			.then(function (response) {
				if (response.data.errCode == 0) {
                    that.grade = response.data.data[0];
				}else{
					that.null_text = '您还没有进行过测评，没有成绩可供显示'
					that.show = true;
					console.log('没有数据');
				}
			})
		},
		// 测评详情
		ecaluation(){
			let that=this;
			// md5验证
			let info = {
				'role_id': window.localStorage.getItem('child')
			},
			keys = Object.keys(info),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+info[k]+'&';
			}
			p = p.substring(0,p.length-1);
			// ajax
			let url = `/api/v1/webuser_ecaluation?${p}`;
			axios.get(url,info)
			.then(function (response) {
                console.log(response);
				if (response.data.errCode == 0) {
                    if (response.data.data == '') {
                        that.$alert('您还没有完成测评，请先预约课程或者完成测评课', '系统提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                that.$router.push('/reservation');
                            }
                        })
                    }else{
                        that.lv = response.data.data[0];
                        response.data.data.shift();
                        that.skills = response.data.data;
                    }

				}else{
					console.log('没有数据');
				}
			})
        }
    }
}
</script>

<style lang="less" scoped>
.myscore{
    padding: 0 30px;
    margin-right: 20px;
    width: 930px;
    height: 660px;
    background-color: #fff;
    border-radius: 20px;
    .score-head{
        position: relative;
        top: -14px;
        margin: 0 auto;
        width: 323px;
        height: 65px;
        background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/score-head.png');
        p{
            padding-top: 5px;
            text-align: center;
            font-size: 16px;
            color: #fff;
            span{
                color: #2e4374;
            }
        }
    }
    .score-title{
        margin-top: 20px;
        h1{
            text-align: center;
            font-size: 30px;
            color: #ff7b48;
            span{
                color: #2e4374;
            }
        }
        h3{
            margin-top: 10px;
            text-align: center;
            font-size: 18px;
            color: #2e4374;
        }
    }
    .score-main{
        position: relative;
        margin-top: 40px;
        width: 100%;
        height: 260px;
        .score-list{
            margin-left: 30px;
            padding-top: 110px;
            width: 185px;
            li{
                margin-bottom: 5px;
                i{
                    display: inline-block;
                    margin-right: 5px;
                    width: 10px;
                    height: 10px;
                    border-radius: 100%;
                }
                p{
                    display: inline-block;
                    font-size: 16px;
                    color: #cdcdcd;
                    span{
                        color: #ff682e;
                    }
                }
                .icon-y{
                    background-color: #ffc100;
                }
                .icon-r{
                    background-color: #ff682e;
                }
                .icon-p{
                    background-color: #f3b0a1;
                }
                .icon-b{
                    background-color: #38569a;
                }
                .show-box{
                    display: none;
                    position: absolute;
                    top: 0px;
                    left: 245px;
                    padding: 50px;
                    width: 365px;
                    height: 220px;
                    background-color: #fff;
                    box-shadow: 0px 1px 8px 2px #e0e0e0;
                }
            }
            .grad-3:hover .show-box{
                display: block;

            }
            .grad-4:hover .show-box{
                display: block;
            }
        }
        .score-img{
            margin-left: 30px;
            width: 365px;
            height: 260px;
            overflow: hidden;
            img{
                width: 100%;
                height: 220px;
            }
            p{
                margin-top: 10px;
                text-align: center;
                font-size: 16px;
                color: #707070;
                span{
                    color: #ff682e;
                }
            }
        }
    }
    .skill-list{
        margin-top: 20px;
        ul{
            li{
                position: relative;
                width: 20%;
                height: 150px;
                float: left;
                transition: all .5s;
                border-radius: 12px;
                box-shadow: 0px 1px 3px 4px #fff;
                .icon-skill{
                    display: block;
                    margin: 0 auto;
                    width: 48px;
                    height: 48px;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .box-icon{
                    margin: 51px auto;
                }
                .show-box{
                    position: absolute;
                    top: 0;
                    left: 0;
                    padding: 0 12px;
                    width: 100%;
                    height: 100%;
                    font-size: 12px;
                    background-color: #fff;
                    color: #ff7b48;
                    opacity:0;
                    filter: alpha(opacity=0);
                    -webkit-transition: opacity .5s ease-in-out;
                    -moz-transition: opacity .5s ease-in-out;
                    -o-transition: opacity .5s ease-in-out;
                    transition: opacity .5s ease-in-out;
                    p{
                        letter-spacing: 0px;
                    }
                }
            }
            li:hover{
                box-shadow: 0px 1px 3px 4px #f4f4f4;
                cursor: pointer;
            }
            li:hover .show-box{
                opacity:1;
                filter: alpha(opacity=1);
            }
            li:nth-child(1) .icon-skill{ background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/icon-listen.png');}
            li:nth-child(2) .icon-skill{ background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/icon-talk.png');}
            li:nth-child(3) .icon-skill{ background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/icon-read.png');}
            li:nth-child(4) .icon-skill{ background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/icon-write.png');}
            li:nth-child(5) .icon-skill{ background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/icon-chinese.png');}
        }
    }
}
</style>
