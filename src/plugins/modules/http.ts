import axios from 'axios';
import  Vue from "vue";

class Http{ 
    public domain='';
    public constructor(){
    }
    public setDomain(value:string){
        this.domain=value
    }
    public setHeader(opt:any){
        Object.keys(opt).forEach(key => {
            axios.defaults.headers.common[key] =opt[key]; 
        });
    }
    private get(path:string,opt:object,domain:string) {
        let preUrl=domain?domain:this.domain
        return axios.get(`${preUrl + path}`, opt);
    }
    private post(path:string,opt:object,domain:string) {
        let preUrl=(domain||domain=='')?domain:this.domain
        return axios.post(`${preUrl + path}`, opt);
    }

}
interface option{
    domain?:string;
    [propName: string]: any;
}
var install = function(Vue:any,option:option) {
    var http = new Http();
    Vue.prototype.$Http = http;
    if(option&&option.domain){
        http.setDomain(option.domain)
    }
};

export default {
    install: install
}; 
