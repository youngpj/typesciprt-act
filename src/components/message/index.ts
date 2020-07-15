import Vue from "vue";
import alert from "@/components/message/alert.vue";
import loading from "@/components/message/loading.vue";
import toast from "@/components/message/toast.vue";
const Alerts = Vue.extend(alert);
const Loading = Vue.extend(loading);
const Toast = Vue.extend(toast);
var instance:any, instanceLoading:any, instanceToast:any;
//初始化alert
const initInstance = () => {
    instance = new Alerts({
        el: document.createElement("div") 
    });
};

const message:Function|any = function() {

}
message.alert = (title:string, content?:string, callback?:string) => {
    if (!instance) {
        initInstance();
        document.body.appendChild(instance.$el); 
    }
    instance.title = title;
    instance.content = content;
    instance.callback = callback;
    instance.type = 'alert';
    Vue.nextTick(() => {
        instance.visible = true;
    });
}
message.confirm = (title:string, content?:string, callback?:string, leftBtn?:string, rightBtn?:string) => {
    if (!instance) {
        initInstance();
        document.body.appendChild(instance.$el);
    }
    instance.title = title;
    instance.content = content;
    instance.callback = callback;
    instance.type = 'confirm';
    leftBtn ? instance.leftBtn = leftBtn : '';
    rightBtn ? instance.rightBtn = rightBtn : '';
    Vue.nextTick(() => {
        instance.visible = true;
    });
}
//loading
message.$showLoading = (title?:string) => {
    if (instanceLoading) {
        return instanceLoading
    }
    instanceLoading = new Loading({
        el: document.createElement("div")
    });
    document.body.appendChild(instanceLoading.$el);
    instanceLoading.title = title;
    Vue.nextTick(() => {
        instanceLoading.visible = true;
    });
}
message.$hideLoading = (title?:string) => {
    if (!instanceLoading) return;
    setTimeout(() => {
        if (instanceLoading&&instanceLoading.$el) {
            instanceLoading.$el.parentNode.removeChild(instanceLoading.$el);
            instanceLoading.$destroy()
        }
        if (instanceLoading) {
            instanceLoading = undefined
        }
    }, 300);
    instanceLoading.visible = false;
   
}
//toast
message.toast = (title:string) => {
    instanceToast = new Toast({
        el: document.createElement("div")
    });
    document.body.appendChild(instanceToast.$el);
    instanceToast.title = title;
    instanceToast.visible = true;
}
console.log(message);
function install() {
    Vue.prototype.$message = message
    Vue.prototype.$toast = message.toast  
    Vue.prototype.$showLoading = message.$showLoading
    Vue.prototype.$hideLoading = message.$hideLoading
}
export default {
    install
}