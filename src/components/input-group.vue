<template>
    <div class="input-group flex-between flex-center" :class="{'dirty': selfDirty&&!allRight}">
        <div v-if='readonly' class='readonly'></div>
            <!-- <textarea v-resetInput type="text" ref='textarea' v-if='type=="address"' :readonly="readonly" :class="{'rey':readonly}" :value="value" @blur.prevent="handleInput" :placeholder="placeholder" @focus="onFocus" @blur="onBlur" :maxlength="maxlength"></textarea> -->
            <!-- <input v-resetInput type="text"  :readonly="readonly" :class="{'rey':readonly}" :value="value" @input="handleInput"  :placeholder="placeholder" @focus="onFocus" @blur="onBlur" :maxlength="maxlength"> -->
            <!-- <div class="ps-container" v-show="!isFocus">
                <p class="ps" v-if="value && type == 'mobile' && !comment.isPhoneNo(value)">*手机号格式有误</p>
                <p class="ps" v-else-if="value && type == 'idcard' && !comment.isCardNo(value)">*身份证号格式有误</p>
                <p class="ps" v-else-if="value && type == 'name' && !comment.isNameNo(value)">*姓名格式有误</p>
                <p class="ps" v-else-if="value && type == 'code' && !comment.isCodeNo(value)">*验证码格式有误</p>
                <p class="ps" v-else-if="value && type == 'email' && !comment.isEmailNo(value)">*邮箱格式有误</p>
                <p class="ps" v-else-if="value && type == 'address' && !comment.isAdressNo(value)">*地址格式有误</p>
                
            </div> -->
            <label for="">{{label}}</label>
            <input v-resetInput  :type="[type == 'mobile'?'tel':'text']" :readonly="readonly" :class="{'rey':readonly}" :value="value" @input="handleInput" :placeholder="placeholder" @focus="onFocus" @blur="onBlur" :maxlength="maxlength">
            <!-- <p class='errMsg'>{{errMsg[type]}}</p> -->
    </div>
</template>
<script lang='ts'>
import * as comment from "@/util/js/common";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
import { Component, Emit, Prop, Watch, Vue } from "vue-property-decorator";
@Component({})
export default class extends Vue {
    @Prop({ default: "" })
    value!: string;
    @Prop({ default: "" })
    label!: string;
    @Prop({ default: "" })
    placeholder!: string;
    @Prop({ default: "" })
    dirty!: string;
    @Prop({ default: "" })
    maxlength!: number;
    @Prop({ default: true })
    type!: string;
    @Prop({ default: false })
    readonly!: boolean;
    public selfDirty: boolean = false;
    public isFocus: boolean = false;
    public errMsg:anyObj={
        'mobile':'手机号格式有误',
        'idcard':'身份证格式有误',
        'name':'姓名格式有误'
    }
    
    get allRight() {
        console.log(this.type,comment.isCardNo(this.value));
        switch (this.type) {
            case "mobile":
                return comment.isPhoneNo(this.value);

            case "idcard":
                return comment.isCardNo(this.value);

            case "name":
                return comment.isNameNo(this.value);

            case "code":
                return comment.isCodeNo(this.value);

            case "email":
                return comment.isEmailNo(this.value);

            case "address":
                return comment.isAdressNo(this.value);

            default:
                true;
        }
    }

    mounted(): void {}

    handleInput(event: MouseEvent) {
        var value = (event.target as HTMLInputElement).value;
        this.$emit("input", value);
    }
    onFocus(event: MouseEvent) {
        if (isAndroid) {
            setTimeout(() => {
                // (event.target as HTMLElement).scrollIntoViewIfNeeded();
            }, 1000);
        }
  this.selfDirty = false;
        this.isFocus = true;
    }
    onBlur() {
        this.selfDirty = true;
        this.isFocus = false;
        // this.$emit("blur");
    }

    @Watch("dirty")
    private onDirtyChange(value: boolean) {
        if (value) {
            this.selfDirty = true;
        }
    }
}
</script>
<style scoped>
.input-group {
    position: relative;
    height: 1.173333rem;
    line-height: 0.586667rem;
    padding: 0.266667rem 0.32rem;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: none;
    margin-bottom: 0.213333rem;
}

.readonly {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}
label{
    width:26%;
    text-align: right;
    padding-right:.266667rem;
    color:#B2B2B2;
    
}
input,
textarea {
    width: 100%;
    border: none;
    font-size: 0.373333rem;
    color: #333;
    outline: none;
    line-height: 0.586667rem;
    -webkit-user-select: auto;
     background: rgba(245, 245, 245, 1);

}
textarea {
    height: 0.586667rem;
}
input.rey,
textarea.rey {
    color: #ccc;
}
/* .dirty input,.dirty label{
   color: #ff0000;
} */
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: #B2B2B2;
}
input.dirty::-webkit-input-placeholder {
    color: #ff0000;
}


</style>