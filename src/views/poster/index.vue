<template>
    <div class="page">
        <div class="view">
            <!-- {{list[activeIndex].text}} -->
            <div style="flex-wrap:wrap">
                <div v-for='(item,index) in list' :key='index' class='listImg'>
                    <p style='font-size:16px;color:#333;text-align:center;line-height:26px;font-weight:900'>{{item.text}}</p>
                    <div :class="'banner'+index">
                        <div v-if='allOver'>
                            <img :src="item.shareImg" alt="">
                        </div>
                        <div v-else>
                            <img :src="item.url" @load='loadImg' alt="">
                            <div class='bottomImg'>
                                <img :src="list[0].qr" @load='loadImg' class='qr' alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class='more'>长按图片保存到手机</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import html2canvas from "html2canvas";
import config from "@/config";
@Component({
    name: "home",
    components: {
        // swiper,
        // swiperSlide
    }
})
export default class extends Vue {
    constructor() {
        super();
    }
    public num = 0;
    public dataURL = "";
    public oauthURL = config.isProduct
        ? "http://www.msjk95596.com/act/wechat/base/access_token/?state="
        : "http://test.msjk95596.com/act/wechat/base/access_token/?state=";
    public url = `${
        window.location.origin
    }/stay/qr-code/create/base64?content=`; // 二维码url
    public baseUrl = `${this.url}${this.oauthURL}${
        window.location.href.split("?")[0]
    }`;
    private list = [
        {
            shareImg: "",
            url: require("@/assets/img/banner1.jpg"),
            text: "目标人群：25-30岁职场新人",
            qr: ""
        },
        {
            shareImg: "",
            url: require("@/assets/img/banner2.jpg"),
            text: "目标人群：30-40岁中年人群",
            qr: ''
        },
        {
            shareImg: "",
            url: require("@/assets/img/banner3.jpg"),
            text: "目标人群：30-40岁中年人群",
           qr: ''
        },
        {
            shareImg: "",
            url: require("@/assets/img/banner4.jpg"),
            text: "目标人群：30-40岁中年人群",
          qr: ''
        },
        {
            shareImg: "",
            url: require("@/assets/img/banner5.jpg"),
            text: "目标人群：40岁以上人群",
           qr: ''
        }
    ];
    private allImg: number = 0;
    private allOver = false;
    created() {
         this.$showLoading("生成图片中..");
    }
    mounted() {
        this.$hmt.trackEvent("agent_landing", "generate_poster");
        this.$Http
            .get(
                `${this.baseUrl}?${encodeURIComponent(
                    `agentoid=${this.$url.parseUrl(
                        "oid"
                    )}&activeid=sh_recruit`
                )}`
            )
            .then((res: any) => {
                if (res.data.code == "000000") {
                    this.list[0].qr = "data:image/jpeg;base64," + res.data.data;
                }
            });
    }
    beforeDestroy() {
        this.$hideLoading();
    }
    loadImg(index: any) {
        this.allImg++;
        if (this.allImg == 10) {
            setTimeout(() => {
                this.cavas(0);
            }, 5000);
        }
    }
    private cavas(index: number) {
        let self = this;

        this.$nextTick(() => {
            let ref = document.querySelector(`.banner${index}`);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            html2canvas(ref as any, {
                useCORS: true,
                backgroundColor: null
                //  allowTaint: true,
                //  logging:true,
                // taintTest: false
            }).then(canvas => {
                this.dataURL = canvas
                    .toDataURL("image/png", 1.0)
                    .replace("image/png", "image/octet-stream");
                this.list[index].shareImg = this.dataURL;
                if (this.num < this.list.length - 1) {
                    this.num += 1;
                    this.cavas(this.num);
                } else {
                    this.allOver = true;
                    this.$hideLoading();
                }
                // this.$toast("请长按图片保存到本地相册");
            });
        });
    }
}
</script> 
<style  scoped>
.view {
    background: #fff;
}
.listImg {
    width: 80%;
    margin: 0 auto;
    padding: 3px;
    margin-bottom: 0.566667rem;
}
.bottomImg {
    background: url(~img/text.jpg) no-repeat;
    background-size: 100%;
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.333333rem 0.333333rem 0 0;
}
.qr {
    /* transform: translate(0, -100%); */
    height: 80%;
}
.more {
    position: fixed;
    bottom: 0.266667rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: 8rem;
    height: 1.333333rem;
    border-radius: 50px;
    text-align: center;
    line-height: 1.333333rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
}
</style>

  


