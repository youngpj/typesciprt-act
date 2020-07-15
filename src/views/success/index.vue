<template>
    <div class="page">
        <div class="view">
            <div class='content'>
                <p class='content_title'>公司总浏览:{{allWacthed}}</p>
                <p class='content_title'>公司总报名人数：{{allJoined}}</p>
            </div>

             <div class='content content_title flex-center' >
                 <img :src="avotor" alt="">{{nickName}}
            
            </div>
            <div class='content'>
                <p class='content_title'>我的海报浏览量:{{myWatched}}</p>
            </div>
            <div class='content list'>
                <p class='content_title'>留资信息:</p>
                <div ref='wrapper' class='wrapper'>
                    <div>
                        <p v-for='(item) in list' :key='item.phone+item.name' class='item'>
                            <span>{{item.name}}</span><a :href="`tel:${item.phone}`" style='color:#333'>{{item.phone}}</a>
                            <span>{{item.createTime}}</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BScroll from "@better-scroll/core";
import { debounce } from "@/util/js/common";
import config from '@/config'
@Component({
    name: "success"
})
export default class extends Vue {
    constructor() {
        super();
    }
     private phone:string = '13818552576';
    private allJoined: number = 0;
    private allWacthed: number = 0;
    private myWatched: number = 0;
    private scroll: any;
    private list = [];
    private addPage: number = 0;
    private page: number = 1;
    private nickName=''
    private avotor=''
    created() {
        this.getAllJoined();
        this.getAllWatched();
        this.getList();
        this.getMyWatched();
        this.getNickName()
    }
    mounted() {
        this.scroll = new (<any>BScroll)(this.$refs.wrapper, {
            preventDefault:false,
            click: true
        });
    }
    getNickName(){
         this.$Http
            .get(`/stay/agent-poster/origin-info/${ this.$url.parseUrl("oid")}`)
            .then((res: any) => {
                if (res.data.code == "000000") {
                 this.nickName=res.data.data.nickname;
                 this.avotor=res.data.data.headimgurl
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
    getAllJoined() {
        this.$Http
            .post(`/stay/agent-poster/company-apply`, {
                activityKey: config.activeId,
                channelId: this.$url.parseUrl("oid"),
                channelType: "WECHAT"
            })
            .then((res: any) => {
                if (res.data.code == "000000") {
                    this.allJoined = res.data.data;
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
    getAllWatched() {
        this.$Http
            .post(`/stay/agent-poster/company-browse`, {
                activityKey: config.activeId,
                originId: this.$url.parseUrl("oid"),
                channelType: "WECHAT "
            })
            .then((res: any) => {
                if (res.data.code == "000000") {
                    this.allWacthed = res.data.data;
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
    getMyWatched() {
        this.$Http
            .post(`/stay/agent-poster/own-browse`, {
                activityKey: config.activeId,
                channelId: this.$url.parseUrl("oid"),
                channelType: "WECHAT ",
                originId: this.$url.parseUrl("oid")
            })
            .then((res: any) => {
                if (res.data.code == "000000") {
                    this.myWatched = res.data.data;
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
    fun = debounce(() => {
        this.getList();
    }, 300);
    getList() {
        let pageSize = 10;
        this.$Http
            .post(`/stay/agent-poster/page-list`, {
                activityKey: config.activeId,
                originId: this.$url.parseUrl("oid"),
                channelType: "WECHAT ",
                page: this.page++,
                pageSize: pageSize
            })
            .then((res: any) => {
                if (res.data.code == "000000") {
                    this.addPage = res.data.data.list.length;
                    if (this.addPage > 0) {
                        this.list = this.list.concat(res.data.data.list);
                    }
                    this.$nextTick(() => {
                        this.scroll.refresh();
                        this.scroll.on("scrollEnd", (pos: any) => {
                            if (this.scroll.y <= this.scroll.maxScrollY + 100) {
                                if (this.addPage == pageSize) {
                                    console.log(
                                        this.list.length,
                                        res.data.data.list
                                    );
                                    this.fun();
                                }
                            }
                        });
                    });
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
}
</script> 
<style scoped>
.view {
    padding: 0.586667rem 0.266667rem 0;
    background: #fff;
    height: 100%;
    width: 100%;
    position: fixed;
}
.content {
    border: 1px solid #666;
    margin-bottom: 0.533333rem;
    padding: 0.133333rem 0.133333rem;
}
.content>img{
    width:1.066667rem;
    height: 1.066667rem;
    border-radius: 100%;
    margin-right:.133333rem;
}
.content_title {
    font-size: 0.426667rem;
    font-weight: 900;
    line-height: 2;
}
.list {
}
.wrapper {
    height: 3.8rem;
    overflow: hidden;
}
.item {
    display: flex;
    justify-content: space-between;
    line-height: 2;
}
.item > span:first-of-type {
    width: 20%;
    overflow: hidden;
    height: 0.7rem;
}
</style>

  


