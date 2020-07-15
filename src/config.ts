import shareIcon from '@/assets/img/shareicon.jpg'
import {parseUrl} from './util/js/utils'
let isProduct:boolean=process.env.NODE_ENV=='production'&&process.env.VUE_APP_BUILD_TYPE!='test';
var source =parseUrl('source');
let agentoid=parseUrl('agentoid')||parseUrl('oid') // 如果没有agentoid ,那就是代理人就用代理人的oid
export default {
    // projectTitle: '',
    // storageScope: 'my',
    defaultShareOption: {
        title: '邀请你参加“第二职业体验班”', 
        desc: '体验第二职业，解锁人生更多可能！',
        imgUrl: shareIcon,
        link: `${location.origin}${location.pathname}?agentoid=${agentoid}`
    },
    activeId:'sh_recruit',
    domain: isProduct?'':'', 
    isProduct,
    productCode:'',
    project_name:'sh_recruit',//用于埋点的
    msurl:isProduct?'http://www.msjk95596.com':'http://test.msjk95596.com',
}


