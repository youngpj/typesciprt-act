
// 生产随机id
function uuid(len?:number, radix?:number) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

// 解析获取url参数
function parseUrl(queryKey:string) {
  var search = location.search;

  if (search.length > 0 && search.indexOf('?') > -1) {
    search = search.substring(1);
    var cArr = search.split('&');

    for (var i = 0, len = cArr.length; i < len; i++) {
      var item = cArr[i],
        key = cArr[i].split('=')[0],
        val = cArr[i].split('=')[1];

      if (key === queryKey) {
        return val;
      }
    }
  }

  return null;
}



// 获取url中的source，返回对应的shareSource
function getShareSource() {
  var source = parseUrl('source');
  if (source && /^share(\d)+$/.test(source)) {
    source = 'share' + (Number(source.slice(5)) + 1);
  } else {
    source = 'share0';
  }

  try {
    var liverInfo = parseUrl("liverInfo")
    if (liverInfo) {
      source = "liver" + source
    }
  } catch (error) {
    console.log("爆肝分享错误", error);
  }


  return source;
}






export {
  uuid,
  parseUrl,
  getShareSource,
}
