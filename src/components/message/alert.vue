<template>
    <div class="overplay" v-show='visible'>
        <div class='alert'>
            <div class="dialog-content">
                <div class="title">
                    {{title}}
                </div>
                <p v-html='content'></p>
            </div>
            <div @click="makeSure" v-if='type=="alert"' class='makesure'>确定</div>
            <div v-else class='flex message makesure'>
                <div @click='makeSure(leftBtn)'>{{leftBtn}}</div>
                <div @click='makeSure(rightBtn)'>{{rightBtn}}</div>
            </div>
        </div>
    </div>
</template> 

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class extends Vue {
    @Prop({ default: "确定" })
    rightBtn!: string;
    @Prop({ default: "" })
    title!: string;
    @Prop({ default: "" })
    content!: string;
    @Prop({ default: "" })
    callback!: Function;
    @Prop({ default: "alert" })
    type!: string;
    @Prop({ default: "取消" })
    leftBtn!: string;
    @Prop({ default: "" })
    article_id!: string;
    public visible: boolean = false;

    public makeSure(btn: string) {
        this.visible = false;
        if (this.callback) {
            if (this.type == "confirm") {
                this.callback(btn);
            } else {
                this.callback();
            }
        }
    }
}
</script>
<style scoped>
.overplay {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
}
.alert {
    position: absolute;
    top: 34%;
    left: 50%;
    transform: translateX(-50%) scale(1);
    width: 7.2rem;
    border-radius: 0.266667rem;
    background-color: rgb(255, 255, 255);
    transition: all 0.38s ease 0s;
    opacity: 1;
    overflow: hidden;
    text-align: center;
    z-index: 10;
}
.dialog-content {
    min-height: 2.26667rem;
    border-bottom: 1px solid rgb(238, 238, 238);
    text-align: center;
    padding-top: 0.453333rem;
    padding-bottom: 0.253333rem;
    line-height: 0.613333rem;
}
.title {
    font-size: 0.4533333333333333rem;
    font-weight: 600;
    min-height: 0.5533333333333333rem;
}
.flex {
    display: flex;
}
.dialog-content > p {
    font-size: 0.3466666666666667rem;
    color: #333;
    padding: 0 0.533333rem;
}
.message > div {
    width: 50%;
    text-align: center;
    font-size: 0.4233333333333333rem;
    color: #007aff;
    text-align: center;
    height: 1.1733333333333333rem;
    line-height: 1.1733333333333333rem;
}
.message > div:first-of-type {
    border-right: 1px solid #eee;
    color: #333;
}
.makesure {
    font-size: 0.4233333333333333rem;
    line-height: 2.2;
}
</style>
