import axios from 'axios'
import Http from '@/plugins/modules/http'
import Vue from 'vue'
import config from '@/config'
import message from '@/components/message'
import url from './modules/url'
import hmt from './modules/action'
import {uuid} from '@/util/js/utils'
import resetInput from '@/plugins/modules/reset-display'
let userid=localStorage.getItem('userid');
let sessionid=sessionStorage.getItem('sessionid');
if(!sessionid){
    sessionid=uuid()
    sessionStorage.setItem('sessionid',sessionid);
}
if(!userid){
    userid=uuid()
    localStorage.setItem('userid',userid);
}
var maidian:anyObj = {
    reqUrl: '/track/action',
    project_name: config.project_name,
    element: "trackEvent",
    url: document.URL,
    sessionid:sessionid,
    userid:userid
}

let source:string|null=url.parseUrl('source');
let openid:string|null=url.parseUrl('oid');
let from:string|null=url.parseUrl('agentoid');
if(source){
    maidian.source=source 
}
if(from){
    maidian.from=from 
}
if(openid){
    maidian.openid=openid 
    maidian.oid=openid 
}
var init = function () {
    Vue.prototype.axios = axios;
    Vue.use(Http, { domain: config.domain })
    Vue.use(message)
    Vue.use(url)
    Vue.use(hmt, maidian)
    Vue.use(resetInput)

}
declare module 'vue/types/vue' {
    interface Vue {
        axios: any
        $Http: any
        $message: any
        $toast: any
        $alert: any
        $showLoading: any
        $hideLoading: any
        $url: any
        $hmt: any
    }
}

export default init;  