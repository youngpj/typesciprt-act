class Hmt{ 
    public domain:object={};
    public url:string='';
    public constructor(value:option){
        this.domain=value
        this.url=value.reqUrl;
    }
    public setDomain(value:object){
       
    }
    public trackPage(value:string){
        let params:object=Object.assign({},this.domain,{'page':value})
        this.post(params)
    }
    public trackEvent(page:string,event:string){
        let params:object=Object.assign({},this.domain,{'page':page,'event':event})
        this.post(params)
    }

    private post(params:object,url:string=this.url) {
        var xhr = new XMLHttpRequest();
        var jsonData = JSON.stringify(params);

        if (!url) {
            throw new Error('action-monitor: request url is null');
            return;
        }

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.send(jsonData);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // console.log('action monitor => request success');
            }
        }
    }

}
interface option{
    reqUrl:string;
    [propName: string]: any;
}
var install = function(Vue:any,option:option) {
    var hmt = new Hmt(option);
    Vue.prototype.$hmt = hmt;

};

export default {
    install: install
}; 
