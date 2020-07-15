<template>
    <div class="page">
        <div class="view flex-jcenter flex-center">
            <router-link to='/poster'>生成我的专属海报</router-link>
            <router-link to='/success'>查看我的历史数据</router-link>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import moment from "moment";
// import "swiper/dist/css/swiper.css";
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import html2canvas from "html2canvas"; 
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


    created() {}
    mounted() {
     
    }

 
}
</script> 
<style  scoped>
    .view{
        position: fixed;
        height:100%;
        width:100%;
    }
    .view>a{
        width:3.833333rem;
        height:1.466667rem;
        line-height: 1.466667rem;
        border-radius: .133333rem;
        background:#d44439;
        margin:0 .266667rem;
        text-align: center;
        color:#fff;
    }
</style>

  


