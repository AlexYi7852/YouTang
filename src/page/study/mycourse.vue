<template>
<div class="mycourse">
    <div class="course-menu">
        <el-menu :default-active="activeIndex" class="el-menu-demo flex" mode="horizontal">
            <router-link :to="undoneRouterLink">
                <el-menu-item index="1">
                    <span>未上课程</span>
                </el-menu-item>
            </router-link>
            <router-link :to="completeRouterLink">
                <el-menu-item index="2">
                    <span>已上课程</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
    <div class="course-main">
        <router-view></router-view>
    </div>
</div>
</template>

<script>

export default {
	data() {
		return {
            undoneRouterLink: '',
            completeRouterLink: '',
			activeIndex: '1'
		};
    },
    mounted(){
        this.getPath();
        this.changeRouterLink();
    },
    watch: {
        '$route': 'changeRouterLink'
    },
	methods: {
        changeRouterLink(){
            if (this.$route.path === '/study/mycourse/undone' || this.$route.path === '/study/mycourse/complete'){
                this.completeRouterLink = '/study/mycourse/complete'
                this.undoneRouterLink = '/study/mycourse/undone'
            } 
            else{
                this.undoneRouterLink = '/study/mycourse/readUndone'
                this.completeRouterLink = '/study/mycourse/readComplete'
            }
        },
	    getPath(){
	        let path = this.$route.path
            if(path === "/study/mycourse/complete" || path === '/study/mycourse/readComplete'){
	            this.activeIndex = '2'
            }
        }
	}
}
</script>

<style lang="less" scoped>
.mycourse{
    margin-right: 20px;
    width: 930px;
    height: 660px;
    background-color: #fff;
    border-radius: 20px;
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
        background-size: 930px 350px;
    }
}
</style>
