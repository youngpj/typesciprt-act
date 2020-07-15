<template>
    <div class="page">
        <div class="view">
            <div class='rule'>
                <p class="rule-title">
                    活动规则：
                </p>
                <p>1、活动时间：12月01日12:00-12月07日12:00。</p>
                <p>2、活动地域：仅限大连、上海、北京、天津的用户参与，以当前页面的提示信息为准。</p>
                <p>3、当前活动投保年龄：0-50周岁</p>
                <p>4、活动规则：</p>
                <p> （1）价值49元的奖品数量仅限前30名，先到先得；</p>
                <p> （2）每一个家庭（含父母、子女）、同一个账号/手机号码只有1次领取乐高奖品的机会；</p>
                <p> （3）奖品送货方式由工作人员与参与用户取得联系后确定；</p>
                <p> （4）工作人员无法通过电话联系超过7天的，视作自动放弃奖品；</p>
                <p> （5）若通过活动bug、一人多号、恶意传播等等非法行为刷取奖品的，将取消获奖权利；</p>
                <p> （6）活动奖品将在活动结束后15个工作日内送到参与用户手中，具体奖品样式以收到的实物为准。</p>
                <p>5、活动最终解释权归民生人寿保险股份有限公司所有。</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
    name: "notice"
})
export default class extends Vue {
    constructor() {
        super();
    }

    created() {}
    mounted() {}
}
</script> 
<style scoped>
.view {
    padding: 0.346667rem;
    background: rgba(251, 201, 66, 1);
    height: 100%;
    position: fixed;
}
.rule {
    padding: 0.186667rem 0.48rem;
    line-height: 1.8;
    background: #fff;
    height: 100%;
}
.rule > .rule-title {
    font-size: 0.426667rem;
    color: #3b3b3b;
    font-weight: 900;
    line-height: 2;
}
.rule > p {
    font-size: 0.373333rem;
    color: #3b3b3b;
}
</style>

  


