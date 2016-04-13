/**
 * Created by xiaolili on 16/3/31.
 */
function jsonToUrl(json) {
    json.t = Math.random();
    var arr = [];
    for (var i in json) {
        arr.push(i + '=' + json[i]);
    }
    return arr.join('&');
}
function ajax(json) {
    if (!json.url) {
        alert('url错误,请检查url');
        return
    }
    var json =  json || {};
    json.type = json.type || 'get';
    json.time = json.time || '3000';
    json.data = json.data || {};
    // todo (xiaolili) 网络超时,也是需要像成功和失败一样报告出去的,由上层决定网络失败后的动作.
    // 如:重试,ui显示等.
    var timer = setTimeout(function () {
        json.ontimeout && json.ontimeout();
        ajax.onreadystatechange = null;
    }, json.time);

    var ajax;
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
    } else {
        ajax = new ActiveXObject('MicrosoftHTTP');
    }
    switch (json.type.toLocaleLowerCase()) {
        case 'get' :
            ajax.open('GET', json.url + '?' + jsonToUrl(json.data), true);
            ajax.send();
            break;
        case 'post' :
            ajax.open('POST', json.url, true);
            ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            ajax.send(jsonToUrl(json.data));
    }
    json.loading && json.loading();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            json.complete && json.complete();
            if(ajax.status >= 200 && ajax.status < 300 || ajax == 304 ) {
                json.succeedFn && json.succeedFn(ajax.responseText);
            } else {
                json.failFn && json.failFn(ajax.status);
            }
            clearInterval(timer);
        }
    }

}