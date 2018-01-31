<template>
    <div class="cart-four cart-info">
        <div class="item-list">
            <ul class="clearfix">
                <li class="course-item" v-for="fc in fcs" :key="fc.index">
                    <div class="item-title">
                        <h2>{{fc.title_cn}}</h2>
                        <p>{{fc.desc_cn}}</p>
                    </div>
                    <div class="item-price">
                        <p class="discount-price">{{currency(fc.currency_code)}}:{{fc.discount_price}}</p>
                    </div>
                    <div class="item-btn">
                        <button class="buy-btn" @click="buyInfo(fc.title_cn,fc.id,fc.discount_price,fc.currency_code)">立即购买</button>
                    </div>
                    <div class="border"></div>
                </li>
            </ul>
        </div>
        <el-dialog :visible.sync="dialogPayVisible">
            <div class="switch-show" v-show="!qrcodeShow">
                <div class="dialog-title">
                    <h3>本次需花费</h3>
                    <p>
                        <span>{{currency(dialogCurrency_code)}}</span>{{dialogDiscount_price}}<i>/{{dialogTitle_cn}}</i>
                    </p>
                </div>
                <div class="radio">
                    <p>请选择支付方式</p>
                    <el-radio-group v-model="radio">
                        <el-radio :label="0">微信支付</el-radio>
                        <!-- <el-radio :label="1">Payssion</el-radio> -->
                    </el-radio-group>
                </div>
            </div>
            <div class="wx-qrcode" v-show="qrcodeShow">
                <img :src="wxpayInfo.wxurl" alt="">
                <p>请使用微信扫描二维码支付</p>
            </div>
            <div slot="footer" class="dialog-footer" v-show="!qrcodeShow">
                <el-button @click="dialogPayVisible = false">取 消</el-button>
                <el-button type="primary" @click="buy()" v-show="paySelect">确 定</el-button>
                <!-- payssion -->
                <!-- <form name="payssion_payment" action="https://www.payssion.com/payment/create.html" method="post" v-show="!paySelect">
					<input type="hidden" name="api_key" v-model="payssionInfo.api_key">
					<input type="hidden" name="api_sig" v-model="payssionInfo.api_sig">
					<input type="hidden" name="pm_id" v-model="payssionInfo.pm_id">
					<input type="hidden" name="order_id" v-model="payssionInfo.order_id">
					<input type="hidden" name="description" v-model="payssionInfo.description">
					<input type="hidden" name="amount" v-model="payssionInfo.amount">
					<input type="hidden" name="currency" v-model="payssionInfo.currency">
					<input type="hidden" name="return_url" v-model="payssionInfo.return_url">
					<input type ="submit" class="payssion-btn" value ="确定">
				</form> -->
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import common from '../../../components/common'

export default {
    data(){
        return{
            user_ip: '',
            fcs: '',
            dialogPayVisible: false,    //弹窗显示
            dialogCurrency_code: '',    //弹窗信息货币符号
            dialogShopid: '',           //弹窗信息商品id
            dialogDiscount_price: '',   //弹窗信息-价格
            dialogTitle_cn: '',         //弹窗信息-标题
            radio: 0,                   //支付方式选择
            orderInfo: '',              //获取后台微信订单信息
            qrcodeShow: false,          //二维码显示控制
            wxpayInfo: '',              //支付二维码信息
            timestamp: '',              //当前时间戳
            timeExpire: '',             //订单失效时间
            intervalid: '',             //定时器控制二维码回调
            paySelect: true,           //选择支付方式控制按钮显示
            payssionInfo: ''            //payssion信息
        }
    },
	mounted(){
        this.get_userip();
    },
    watch:{
        dialogPayVisible: function (val) {
            this.qrcodeShow = false;
            this.wxpayInfo.wxurl = '';
            clearInterval(this.intervalid);
        }
    },
    methods:{
        // 获取IP
        get_userip(){
			let that=this;
			axios.get('/api/v1/getip')
			.then(function (response) {
				if (response.data.errCode == 0) {
					that.user_ip = response.data.data.ip;
			 		that.cartDetails();
				}else{
					console.log('IP地址错误');
				}
			})
        },
        // 购物中心详情
		cartDetails(){
			let that=this;
			let userid = `countIp=${this.user_ip}`
			// ajax
			let url = `/api/v1/goodslist?${userid}`;
			axios.get(url,userid)
			.then(function (response) {
				if (response.data.errCode == 0) {
                    that.fcs = response.data.data['1v4'];
				}else{
					console.log('没有数据');
				}
			})
        },
        // 点击购买弹窗
		buyInfo(desc,shopid,price,code){
            this.dialogTitle_cn = desc;
            this.dialogShopid = shopid;
            this.dialogDiscount_price = price;
            this.dialogCurrency_code = code;
            this.dialogPayVisible = true;
		},
		currency(item){
			let text='';
            switch(item){
                case "USD":
                    text='$';
                    break;
                case "EUR":
                    text='€';
                    break;
                case "GBP":
                    text='￡';
                    break;
                case "RMB":
                    text='¥';
                    break;
            }
            return text;
        },
        // 点击购买
        buy(){
            if (this.radio == 0) {
                this.wxpay();
                this.qrcodeShow = true;
            }else{
                this.payssion();
            }
        },
        // 创建微信订单
        wxpay(){
            let that = this;
            let info = {
                userid: window.localStorage.getItem('token_id'),
                shopid: this.dialogShopid,
                amount_y: this.dialogDiscount_price,
                merchantAccountId: this.dialogCurrency_code
            }
            // ajax
            let url = '/api/v1/web_wxpay_orderid';
            let config = {
				headers:{
					versions: '1',
					tokens: common.sortMd5(info),
				}
            }
            axios.post(url,info,config).then((response) => {
                console.log(response);
                if (response.data.errCode == 0) {
                    this.orderInfo = response.data.data;
                    this.wxpay_payment();
                }else{
                    console.log('系统错误')
                }
            })
        },
        // 微信扫码支付
        wxpay_payment(){
            let info = {
                id: this.orderInfo.id,
                user_id: window.localStorage.getItem('token_id')
            }
            // ajax
            let url = `/api/v1/web_wxpay_payment?${common.sort(info)}`;
            axios.get(url,info).then((response) => {
                if (response.data.errCode == 0) {
                    this.wxpayInfo = response.data.data;
                    this.intervalid = setInterval(() => {
                        this.wxpay_orderquery();
                    }, 3000)
                }else{
                    console.log('系统错误1')
                }
            })
        },
        // 微信二维码查询回调
        wxpay_orderquery(){
            let timestamp = this.moment().format('YYYYMMDDhhmmss'); // 当前时间
            let timeExpire = this.wxpayInfo.time_expire; // 订单失效时间
            if(timestamp > timeExpire){  // 当前时间大于失效时间时，清除轮询
                clearInterval(this.intervalid)
            }else{
                axios.get(`/api/v1/web_wxpay_orderquery?order_no=${this.wxpayInfo.order_no}`).then((response) => {
                    if (response.data.data.trade_state == "SUCCESS") {
                        clearInterval(this.intervalid);
                        this.dialogPayVisible = false;
                        this.$alert(`您已成功购买${this.dialogTitle_cn}`, '购买成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/cart');
                            }
                        })
                    }else if(response.data.data.trade_state == "NOTPAY"){
                        console.log('等待支付');
                    }else{
                        clearInterval(this.intervalid);
                        this.dialogPayVisible = false;
                        this.$alert('购买失败', '系统错误', {
                            confirmButtonText: '确定',
                        })
                    }
                })
            }

        }
        // // payssion支付初始化
        // payssion(){
        //     // api_sig加密
        //     // action="https://sandbox.payssion.com/payment/create.html"
        //     let tokens = md5(`a75a65a0e8d51021|sofort|${res.discount_price}|${this.$route.query.code}|${order}|b857d99fec1e808667c1644536f9b03d`);	//正式
        //     // let tokens = md5(`81b745fccf799912|sofort|${res.discount_price}|${this.$route.query.code}|${order}|92fdb2ef095969bad1f3bcab32390181`);	//沙箱
        //     let info = {
        //         api_key: 'a75a65a0e8d51021',	//正式
        //         // api_key: '81b745fccf799912',	//沙箱
        //         pm_id: 'sofort',
        //         amount: res.discount_price,
        //         currency: this.$route.query.code,
        //         description: res.title_en,
        //         order_id: order,
        //         api_sig: tokens,
        //         return_url: `${window.location.protocol}//${window.location.host}/cart/paystatus`
        //     }
        //     this.payssionInfo = info;
        // }
    }
}
</script>

<style lang="less" scoped>
.cart-four{
    padding-top: 120px;
    .item-list{
        padding: 0px 40px;
        .course-item{
            position: relative;
            float: left;
            margin-right: 35px;
            width: 260px;
            height: 380px;
            background-color: #fff;
            border-radius: 12px;
            .item-title{
                margin-top: 60px;
                h2{
                    text-align: center;
                    font-size: 20px;
                    font-weight: 500;
                    color: #333;
                }
                p{
                    margin-top: 10px;
                    text-align: center;
                    font-size: 14px;
                    color: #666;
                }
            }
            .item-price{
                margin-top: 40px;
                p{
                    text-align: center;
                    font-size: 24px;
                    color: #ff7b48;
                }
            }
            .item-btn{
                margin-top: 80px;
                text-align: center;
                .buy-btn{
                    position: relative;
                    display: inline-block;
                    width: 140px;
                    height: 40px;
                    background-color: #fff;
                    background-image: url('../../../../static/img/button.png');
                    background-size: 100%;
                    border: 0;
                    font-size: 14px;
                    color: #fff;
                    z-index: 99;
                    cursor: pointer;
                }
            }
            .border{
                position: absolute;
                top: -6px;
                left: -6px;
                width: 260px;
                height: 380px;
                border: 1px solid #ff7b48;
                border-radius: 12px;
            }
        }
        .course-item:nth-child(3){
            margin-right: 0;
        }
    }
}
</style>
