<template>
    <div class="input-group flex" :class="{'dirty': selfDirty&&!allRight}">
        <label for="">{{label}}</label>
        <input type="text" v-resetInput :placeholder='placeholder' :value="value" @input="handleInput" @focus="onFocus" @blur="onBlur" :class="{'dirty': selfDirty}" maxlength="4">

        <div class="send-btn" @click.stop="handleClick">{{ smsTxt }}</div>
    </div>
</template>
<script>
import SmsToastGroup from "@/components/sms-toast-group.vue";
import { isPhoneNo } from "@/util/js/common";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
import * as comment from "@/util/js/common";
export default {
    data: function() {
        return {
            smsTxt: "发送验证码",
            lock: false,
            selfDirty: false,
            isFocus: false,
            errorValue: false
        };
    },
    props: ["value", "label", "placeholder", "dirty", "phone"],
    methods: {
        handleInput(evt) {
            var value = event.target.value;
            this.$emit("input", value);
        },
        handleClick() {
            if (!isPhoneNo(this.phone)) {
                this.$toast("手机号码格式错误");
                return;
            }
            if (this.lock) return;
            this.selfDirty = true;
            const SmsToast = Vue.extend(SmsToastGroup);
            let instance = new SmsToast({
                el: document.createElement("div")
            });
            document.body.appendChild(instance.$el);
            Vue.nextTick(() => {
                instance.captchaVisiable = true;
                instance.phone = this.phone;
                instance.callback = this.countDown;
            });
        },
        countDown: function(_callback) {
            var t = 60,
                _this = this;

            var run = function() {
                _this.currentValue = _this.value;
                _this.smsTxt = `${t}s`;

                if (t >= 0) {
                    t--;
                    setTimeout(() => {
                        run();
                    }, 1000);
                } else {
                    _this.lock = false;
                    _callback && _callback();
                    _this.smsTxt = "发送验证码";
                }
            };

            _this.lock = true;
            run();
        },
        onFocus(evt) {
            if (isAndroid) {
                setTimeout(() => {
                    evt.target.scrollIntoView();
                }, 1000);
            }

            this.isFocus = true;
              this.selfDirty = false;
        },
        onBlur() {
            this.isFocus = false;
            this.selfDirty = true;
        },
        isCodeNo(str) {
            var pattern = /^\d{4}$/;
            return pattern.test(str);
        }
    },
    computed: {
         allRight() {
            return comment.isCodeNo(this.value);
        }
    },
    watch: {
        dirty: function(v) {
            if (v) {
                this.selfDirty = true;
            }
        },
        value: function(value) {
            if (value && !this.isCodeNo(value)) {
                this.errorValue = true;
            } else {
                this.errorValue = false;
            }
        }
    }
};
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

label {
    width: 21%;
    text-align: right;
    padding-right: 0.266667rem;
     color:#B2B2B2;
}

input {
    display: block;
    border: none;
    width: 3.6rem;
    font-size: 0.373333rem;
    color: #333333;
    outline: none;
    line-height: 0.533333rem;
    background: rgba(245, 245, 245, 1);
}
/* .dirty input,.dirty label{
   color: #ff0000;
} */
input::-webkit-input-placeholder {
    color: #b2b2b2;
}

.send-btn {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 0.46rem;
    line-height: 0.553333rem;
    text-align: center;
    font-size: 0.373333rem;
    color: rgba(23, 65, 233, 1);
    width: 2.666667rem;
    border-left: 1px solid #979797;
}
</style>