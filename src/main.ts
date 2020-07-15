import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import init from '@/plugins'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'amfe-flexible'
import '@/util/css/common.css'
import VueLazyload from 'vue-lazyload'
import config from './config'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1
})


type Name=number
let a:Name=333
console.log( a);

function array_func<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
      return arg;
}
console.log(array_func([4354]));



















Vue.config.productionTip = false
init()
let v = Vue.prototype;
// var testOauthURL = 'http://test.msjk95596.com/a/ap/common/life/base/auth/life/?state=',
//     oauthURL = process.env.NODE_ENV != 'production' ? 'http://test.msjk95596.com/a/ap/common/life/base/auth/life/?state=' : 'http://www.msjk95596.com/a/ap/common/life/base/auth/life/?state=';

//     console.log( process.env.NODE_ENV);

// if (!v.$url.parseUrl('token')) {
//     location.href = oauthURL + location.origin + location.pathname + encodeURIComponent(location.search);
// } else {
//     var redirectPath = v.$url.parseUrl('redirect_path');
//     if (redirectPath) {
//         var url = v.$url.deleteUrlQuery('redirect_path');
//         window.location.href = url + '#/' + redirectPath;
//     }
// }

var testOauthURL = 'http://test.msjk95596.com/act/wechat/base/access_token/?state=',
    oauthURL = process.env.NODE_ENV != 'production' ? 'http://www.msjk95596.com/act/wechat/base/access_token/?state=' : 'http://test.msjk95596.com/act/wechat/base/access_token/?state=';

if (!v.$url.parseUrl('token')) {
    location.href = oauthURL + location.origin + location.pathname + encodeURIComponent(location.search);
} else {
    var redirectPath = v.$url.parseUrl('redirect_path');
    if (redirectPath) {
        var url = v.$url.deleteUrlQuery('redirect_path');
        window.location.href = url + '#/' + redirectPath;
    }
}

var token = v.$url.parseUrl('token');
v.$Http.setHeader({
    "accessToken": 'a015d39289194238bb4439011746f55',
    token: token
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

Vue.mixin({
    beforeRouteEnter(to, from, next) {
        next((v) => {
            to.meta.madian && v.$hmt.trackPage(to.meta.madian)
        });
    }
});

//分享 过期优化
let data = window.location.origin + location.pathname + location.search;
let configOptions: anyObj;
v.$Http.post('/act/wechat/shares/sign', { data }, '').then((res: any) => {
    var data = res.data;

    if (data.appId) {
        configOptions = data;
        configWxApis()
    }
});
let jsApiList = [
    "openEnterpriseChat",
    "openEnterpriseContact",
    "onMenuShareTimeline",    // 分享到朋友圈
    "onMenuShareAppMessage",  // 分享给好友
    "onMenuShareQQ",
    "onMenuShareWeibo",
    "onMenuShareQZone",
    "startRecord",
    "stopRecord",
    "onVoiceRecordEnd",
    "playVoice",
    "pauseVoice",
    "stopVoice",
    "onVoicePlayEnd",
    "uploadVoice",
    "downloadVoice",
    "chooseImage",
    "previewImage",
    "uploadImage",
    "downloadImage",
    "translateVoice",
    "getNetworkType",
    "openLocation",
    "getLocation",
    "hideOptionMenu",
    "showOptionMenu",
    "hideMenuItems",  // 隐藏菜单
    "showMenuItems",  // 打开菜单
    "hideAllNonBaseMenuItem", // 隐藏所有菜单
    "showAllNonBaseMenuItem", // 打开所有菜单
    "closeWindow",
    "scanQRCode"
]
let defaultShareOption = config.defaultShareOption
function configWxApis() {
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: configOptions.appId, // 必填，公众号的唯一标识
        timestamp: configOptions.timestamp, // 必填，生成签名的时间戳
        nonceStr: configOptions.noncestr, // 必填，生成签名的随机串
        signature: configOptions.sign,// 必填，签名，见附录1
        jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(() => {
        wx.onMenuShareAppMessage({
            title: defaultShareOption.title,
            desc: defaultShareOption.desc,
            link: defaultShareOption.link,
            imgUrl: handleLocalImgUrl(defaultShareOption.imgUrl),
            success: function () {
                // wxsdk.onShareSuccess && wxsdk.onShareSuccess('appMessage');
            },
            cancel: function () {
                // wxsdk.onShareCancel && wxsdk.onShareCancel('appMessage');
            }
        });

        wx.onMenuShareTimeline({
            title: defaultShareOption.title,
            link: defaultShareOption.link,
            imgUrl: handleLocalImgUrl(defaultShareOption.imgUrl),
            success: function () {
                // wxsdk.onShareSuccess && wxsdk.onShareSuccess('timeline');
            },
            cancel: function () {
                // wxsdk.onShareCancel && wxsdk.onShareCancel('timeline');
            }
        });
    });
}
function handleLocalImgUrl(url: string) {
    url = url + '';
    //服务器绝对路径
    if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) {
        return url;
    }
    //本地图片
    if (url.indexOf('data:image') !== -1) {
        // base64 图片操作
        return url;
    } else {
        //path 图片操作
        url = './' + url
        let u = location.origin + location.pathname;
        let lastIndex = u.lastIndexOf('/');
        let imgUrlOri = u.slice(0, lastIndex);

        if (url[0] == '.') {
            return imgUrlOri + url.slice(1);
        } else {
            return imgUrlOri + url;
        }

    }
}
