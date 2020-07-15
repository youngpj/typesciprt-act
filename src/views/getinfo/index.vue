<template>
    <div class="page">
        <div class="view">
            <img src="~img/bg.jpg" alt="">
            <div class="getInfo " v-if='!success'>
                <p class='infoTitle'>夜间开课 时间自由 实用指数100%</p>
                <div class="inputBox">
                    <div class="inputLi">
                        <input-group type='name' label="姓名:" maxlength='4' v-model='name'></input-group>
                        <!-- <input type="text" placeholder="姓名:" v-model='name' @blur='checkInfo($event,"name")' maxlength='32'>
                        <p v-show='nameError' class='errorInfo'>* 请输入正确的姓名</p> -->
                    </div>
                    <div class="inputLi">
                        <input-group type='mobile' maxlength='11' label="手机号:" v-model='phone'></input-group>
                        <!-- <input type="tel" placeholder="手机号:" v-model='phone' @blur='checkInfo($event,"phone")' maxlength='11'>
                        <p v-show='phoneError' class='errorInfo'>* 请输入正确的手机号</p> -->
                    </div>
                    <div class="inputLi">
                        <sms-group v-model="smsCode" :phone='phone' label="验证码:" />
                    </div>
                </div>
                <div class="orderBtn" @click='getUser'>
                    立即报名
                </div>
                <p class='btnInfo'>限前30名免费</p>

            </div>
            <div class="getInfo suc_box" v-else>
                <div class="suc_title">
                    终身就业+时间自由+收入可观
                </div>
                <p class='suc_content'>
                    恭喜你报名成功!<br/> 工作人员将在3-5个工作日内与您联系。
                </p>
                <p class='suc_text'>体验后，送价值470元健康体检</p>
            </div>

        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import InputGroup from "@/components/input-group.vue";
import SmsGroup from "@/components/sms-group.vue";
import * as comment from "@/util/js/common";
import config from "@/config";
interface swiperObj {
    [propName: string]: any;
}
@Component({
    name: "getinfo",
    components: {
        InputGroup,
        SmsGroup
    }
})
export default class extends Vue {
    constructor() {
        super();
    }
    public success: boolean = false;
    public name: string = "";
    public phone: string = "";
    public smsCode: string = "";
    public nickName: string = "";
    created() {
        let oid = this.$url.parseUrl("oid");
        if (oid) {
            this.getJoined();
            this.getNickName();
        }
    }
    mounted() {
        this.getLocation();
        setTimeout(() => {
            this.$hmt.trackEvent("customer_landing", "r5s");
        }, 3000);
    }
    private getJoined() {
        this.$Http
            .post(`/stay/agent-poster/already`, {
                activityKey: config.activeId,
                channelId: this.$url.parseUrl("oid"),
                originId: this.$url.parseUrl("agentoid")
            })
            .then((res: any) => {
                if (res.data.data == true) {
                    this.success = true;
                }
            });
    }
    getNickName() {
        this.$Http
            .get(`/stay/agent-poster/origin-info/${this.$url.parseUrl("oid")}`)
            .then((res: any) => {
                if (res.data.code == "000000") {
                    console.log(res.data.data);
                    this.nickName = res.data.data.nickname;
                } else {
                    this.$toast(res.data.msg);
                }
                this.$hideLoading();
            })
            .catch(() => {
                this.$hideLoading();
                this.$toast("服务端异常");
            });
    }
    private getUser() {
        if (!comment.isNameNo(this.name)) {
            this.$toast("请输入正确的姓名");
            return;
        } else if (!comment.isPhoneNo(this.phone)) {
            this.$toast("手机号码格式错误");
            return;
        } else if (!comment.isCodeNo(this.smsCode)) {
            this.$toast("验证码错误");
            return;
        }
        this.$showLoading();
        let source = this.$url.parseUrl("source") || "d";
        // let liveCity=sessionStorage.getItem("userCity");
        let optionValue = JSON.stringify({ putCity: source });
        this.$Http
            .post(`/stay/info/add`, {
                activityKey: config.activeId,
                channelId: this.$url.parseUrl("oid"),
                channelType: "wechat",
                mobile: this.phone,
                name: this.name,
                nickName: this.nickName,
                originId: this.$url.parseUrl("agentoid"),
                smsCode: this.smsCode,
                source: this.$url.parseUrl("source")
            })
            .then((res: any) => {
                if (res.data.code == "000000") {
                    if (res.data.data.stayInfoFlag == "0") {
                        this.success = true;
                        this.$hmt.trackEvent("leads", "join");
                    } else if (
                        res.data.code == "000000" &&
                        res.data.data.stayInfoFlag !== "0"
                    ) {
                        this.$toast("此手机号码已参加活动");
                    }
                } else {
                    this.$toast(res.data.msg);
                }
                this.$hideLoading();
            })
            .catch(() => {
                this.$hideLoading();
                this.$toast("服务端异常");
            });
    }
    getLocation() {
        let that = this;
        wx.ready(() => {
            wx.getLocation({
                type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function(res: any) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    that.getCity(latitude, longitude);
                },
                fail: function(err: any) {
                    that.$toast("请开启微信定位");
                    setTimeout(() => {
                        wx.closeWindow();
                    }, 3000);
                },
                cancel: function(err: any) {
                    wx.closeWindow();
                }
            });
        });
    }
    getCity(latitude: any, longitude: any) {
        this.$Http
            .get(
                `/ins/api/facade/file/getCity?location=${longitude},${latitude}&coordsys=gps`
            )
            .then((res: any) => {
                if (res.data.attachment.city != "上海市") {
                    this.$message.alert(
                        "",
                        "此次活动仅针对上海地区开放",
                        () => {
                            wx.closeWindow();
                        }
                    );
                }
            });
    }
    get allRight() {
        return (
            comment.isNameNo(this.name) &&
            comment.isPhoneNo(this.phone) &&
            comment.isCodeNo(this.smsCode)
        );
    }
}
</script> 
<style  scoped>
.view {
    background: #ffc059;
    overflow: hidden;
}
.header {
    position: absolute;
    top: 0.24rem;
    width: 100%;
}
.header > img {
    height: 0.646667rem;
    margin-left: 0.266667rem;
}
.header > p {
    width: 1.76rem;
    height: 0.666667rem;
    background: rgba(222, 73, 79, 1);
    border-radius: 2.666667rem 0px 0px 100px;
    font-size: 0.373333rem;
    line-height: 0.666667rem;
    color: #fff;
    text-align: center;
}
.getInfo {
    width: 9.253333rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    padding: 0 0.266667rem 0.813333rem;
    margin: 0 auto 0.433333rem;
}
.infoTitle {
    font-size: 0.533333rem;
    font-weight: 500;
    color: rgba(121, 36, 13, 1);
    text-align: center;
    padding: 0.266667rem 0 0.86rem;
    font-weight: 900;
}
label {
    width: 26%;
    text-align: right;
    padding-right: 0.266667rem;
}
.inputLi > input {
    width: 100%;
    height: 1.173333rem;
    line-height: 0.586667rem;
    padding: 0.266667rem 0.32rem;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: none;
    margin-bottom: 0.213333rem;
}
.orderBtn {
    width: 7.6rem;
    height: 1.226667rem;
    background: linear-gradient(
        360deg,
        rgba(246, 55, 23, 1) 0%,
        rgba(254, 214, 154, 1) 100%
    );
    border-radius: 0.613333rem;
    line-height: 1.226667rem;
    font-size: 0.64rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin: 0.96rem auto 0;
}
.rey {
    background: linear-gradient(
        180deg,
        rgba(227, 227, 227, 1) 0%,
        rgba(159, 159, 159, 1) 100%
    );
}
.suc_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.866667rem 0 3.733333rem;
}
.suc_title {
    font-size: 0.593333rem;
    font-weight: 900;
    color: rgba(197, 57, 71, 1);
    line-height: 0.96rem;
    margin-bottom: 1.066667rem;
    position: relative;
    text-align: center;
}
.suc_title::after {
    position: absolute;
    content: "";
    bottom: 10%;
    left: 0;
    height: 0.213333rem;
    background: rgba(248, 231, 28, 1);
    border-radius: 0.106667rem;
    opacity: 0.35;
    width: 100%;
}
.suc_content {
    font-size: 0.373333rem;
    font-weight: 400;
    color: rgba(109, 51, 57, 1);
    line-height: 0.586667rem;
    width: 8.4rem;
    text-align: center;
}
.btnInfo {
    height: 0.666667rem;
    font-size: 0.48rem;
    font-weight: 500;
    color: rgba(255, 103, 0, 1);
    line-height: 0.666667rem;
    text-align: center;
    margin-top: 0.333333rem;
}
.suc_text {
    margin-top: 0.533333rem;
    color: rgba(197, 57, 71, 1);
}
</style>

  


