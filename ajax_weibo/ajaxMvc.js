/**
 * Created by xiaolili on 16/4/9.
 */
define(function (require, exports, module) {
  exports.ajax = function (json) {
    function jsonToUrl(json) {
      json.t = Math.random();
      var arr = [];
      for (var i in json) {
        arr.push(i + '=' + json[i]);
      }
      return arr.join('&');
    }
    if (!json.url) {
      alert('url错误,请检查url');
      return
    }
    var json =  json || {};
    json.type = json.type || 'get';
    json.time = json.time || '30000';
    json.data = json.data || {};
    var timer = setTimeout(function () {
      alert('请求超时');
      ajax.onreadystatechange = null;
    },json.time);
    if (window.XMLHttpRequest) {
      var ajax = new XMLHttpRequest();
    } else {
      var ajax = new ActiveXObject('MicrosoftHTTP');
    }
    switch (json.type.toLocaleLowerCase()) {
      case 'get' :
        ajax.open('GET', json.url + '?' + jsonToUrl(json.data), true);
        ajax.send();
        break;
      case  'post' :
        ajax.open('POST', json.url, true);
        ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    }
    json.loading && json.loading();
    ajax.onreadystatechange = function () {
      if(ajax.readyState == 4) {
        json.complete && json.complete();
        if(ajax.status >= 200 && ajax.status < 300 || ajax == 304 ) {
          json.success && json.success(ajax.responseText);
        } else {
          json.failFn && json.failFn();
        }
        clearInterval(timer);
      }
    }

  }
})