<template>
    <div class="cart">
        <yt-header :navShow="true"></yt-header>
        <!-- main -->
        <div class="main-content flex">
            <div class="cart-main">
                <div class="course-menu">
                    <el-menu :default-active="activeIndex" class="el-menu-demo flex" mode="horizontal">
                        <router-link to="/cart/four">
                            <el-menu-item index="1">
                                <span>一对四课程包</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/cart/one">
                            <el-menu-item index="2">
                                <span>一对一课程包</span>
                            </el-menu-item>
                        </router-link>
                    </el-menu>
                </div>
                <div class="course-main">
                    <router-view></router-view>
                </div>
            </div>
            <my-lesson></my-lesson>
        </div>
        <yt-footer></yt-footer>
    </div>
</template>

<script>
import ytHeader from '../../components/header/yt-header'
import ytFooter from '../../components/footer/yt-footer'
import myLesson from '../../components/common/my-lesson'

export default {
    components: {
        'yt-header': ytHeader,
        'yt-footer': ytFooter,
        'my-lesson': myLesson
    },
	data(){
		return{
            activeIndex: '1',
		}
	},
	mounted(){
        this.getPath();
        this.checkLogin();

    },
    watch:{
        '$route': 'getPath'
    },
	methods: {
        checkLogin(){
            if(!window.localStorage.getItem('id')){
                this.$router.push('/login');
            }else{
                if (!window.localStorage.getItem('child')) {
                    this.$router.push('/usercenter');
                }
            }
        },
        getPath(){
	        let path = this.$route.path
            if(path === "/cart/one"){
	            this.activeIndex = '2'
            }else{
                this.activeIndex = '1'
            }
        }
	}
}
</script>

<style lang="less" scoped>
.cart{
    width: 100%;
    .main-content{
        margin: 60px auto;
        width: 1200px;
        .cart-main{
            margin-right: 20px;
            width: 930px;
            height: 660px;
            background-color: #fff;
            border-radius: 20px;
            overflow: hidden;
            .course-menu{
                width: 100%;
                .el-menu{
                    height: 38px;
                    border-radius: 20px 20px 0 0;
                    box-shadow: 0px 5px 8px #f6f5f5;
                    a{
                        display: inline-block;
                        margin: 0 10%;
                        width: 30%;
                        height: 38px;
                        text-align: center;
                        li{
                            width: 100%;
                            height: 32px;
                            line-height: 38px;
                            font-size: 16px;
                            span{
                                padding: 0 3px 2px;
                                border-bottom: 1px solid #fff;
                            }
                        }
                        li:hover{
                            background-color: transparent;
                        }
                        li:focus{
                            background-color: transparent;
                        }
                    }
                }
                .el-menu-item.is-active span{
                    color: #ff7b48;
                    border-bottom: 1px solid #ff7b48;
                }
                .el-menu--horizontal{
                    border: 0;
                }
            }
            .course-main{
                width: 100%;
                height: 660px - 38px;
                background-image: url('https://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/course-bg.png');
                background-repeat: no-repeat;
                background-position: center bottom;
            }
        }
    }
}
</style>
