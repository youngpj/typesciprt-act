<template>
    <transition name='fade' @after-leave='afterleave'>
        <div class='toastBox' v-show='visible'>
            <div class="toast">
                {{title}}
            </div>
        </div>
    </transition>
</template>

  

<script lang='ts'>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class extends Vue {
    @Prop({ default: "" })
    title!: string;
    public visible: boolean = false;
    mounted(): void {
        setTimeout(() => {
            this.visible = false;
        }, 2000);
    }

    private afterleave() {
       (this.$el.parentNode as HTMLElement).removeChild(this.$el);
        this.$destroy();
    }
}
</script>
<style scope>
.toastBox {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 4.933333rem;
    padding: 0.18666666666666668rem 0.3466666666666667rem 0.26666666666666666rem;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    opacity: 1;
    font-size: 0.48rem;
    line-height: 0.8rem;
    border-radius: 0.12rem;
    text-align: center;
    z-index: 10;
}

.fade-enter-active {
    transition: all 0.3s ease;
}
.fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
