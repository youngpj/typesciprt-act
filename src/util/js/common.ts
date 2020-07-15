import moment from 'moment'
function isPhoneNo(tel: number | string) {
    if (!tel) return false;
    let num: string = <string>tel.toString()
    var pattern = /^1[23456789]\d{9}$/;
    return pattern.test(num);
}
function isNameNo(str: string) {
    let pattern1 = /^[\u4e00-\u9fa5][\u4e00-\u9fa5(\.|·)]{0,30}[\u4e00-\u9fa5]+$/;
    let pattern2 = /(\.|·){2}/;
    return pattern1.test(str) && !pattern2.test(str);
    console.log(pattern1.test(str) && !pattern2.test(str), "444");
}
function isEmailNo(value: string) {
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return myreg.test(value);
}
function isAdressNo(value: string) {
    return value.length > 4;
}
function isCardNoa() {
    // 身份证号码验证
    // 验证身份证
    var powers = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];
    var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");

    return function (_id: string) {
        _id = _id.toUpperCase();
        if (_id.length != 18) {
            return false;
        }
        // var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        // return pattern.test(card);
        _id = _id + "";
        var _num = _id.substr(0, 17);
        var _parityBit = _id.substr(17);
        var _power: number = 0;
        for (var i = 0; i < 17; i++) {
            //校验每一位的合法性

            if (_num.charAt(i) < "0" || _num.charAt(i) > "9") {
                return false;
                break;
            } else {
                //加权

                _power +=
                    parseInt(_num.charAt(i)) * parseInt(powers[i]);
                // //设置性别
                // if (i == 16 && parseInt(_num.charAt(i)) % 2 == 0) {
                // sex = "female";
                // } else {
                // sex = "male";
                // }
            }
        }
        //取模
        var mod: number = _power % 11;
        console.log(_id, parityBit[mod], _parityBit);
        if (parityBit[mod] == _parityBit) {
            return true;
        }
        return false;
    };
};
function isCodeNo(str: string) {
    var pattern = /^\d{4}$/;
    return pattern.test(str);
}
function setCookie(name: string, value: string) {
    var Days = 30;
    var exp: any = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name: string) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name: string) {
    var exp: any = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
var isCardNo = isCardNoa();
function getAge(date: string, one = false) {
    var birthDate = moment(date);
    var birthTime = new Date(date).getTime();
    var now = new Date();
    var nowDate: any = one ? moment(Date.now() + (1000 * 60 * 60 * 24)) : moment(Date.now());
    var nowTime: any = new Date(nowDate).getTime();
    var age: any = 0;
    var ageDate: any = 0;

    if (birthDate.year() > nowDate.year()) {
        return null;
    } else if ((birthDate.month() < nowDate.month()) || (birthDate.month() === nowDate.month() && birthDate.date() <= nowDate.date())) {
        age = nowDate.year() - birthDate.year();
        ageDate = Math.floor((nowTime - new Date(`${nowDate.year()}/${birthDate.month() + 1}/${birthDate.date()}`).getTime()) / (1000 * 60 * 60 * 24));
    } else {
        age = nowDate.year() - birthDate.year() - 1;
        ageDate = Math.floor((nowTime - new Date(`${nowDate.year() - 1}/${birthDate.month() + 1}/${birthDate.date()}`).getTime()) / (1000 * 60 * 60 * 24));
    }
    return {
        age,
        ageDate
    };
}
const debounce=(fn:any, ms: number)=>{
    let timer:any;
    return function(...args:any[]) {
        console.log(fn);
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this,args)
            clearTimeout(timer)
        }, ms);
    }
} 
export {
    isCardNo, isAdressNo, isEmailNo, isNameNo, isPhoneNo, isCodeNo, setCookie, getCookie, delCookie, getAge,debounce
}