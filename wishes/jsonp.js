function  jsonp(json) {
  var json = json || {};
  if(!json.url) {
    alert('参数错误');
    return;
  }
  json.data = json.data || {};
  json.cbName = json.cbName || 'cb';
  var fnName = 'jsonp' + Math.random();
  fnName = fnName.replace('.', '0');
  window[fnName] = function (data) {
    json.fnSuccess && json.fnSuccess(data);
    headTag.removeChild(scriptLink);
  }
  json.data[json.cbName] = fnName;
  var arr = [];
  for (var name in json.data) {
    arr.push(name + '=' + json.data[name]);
  }
  var str = arr.join('&');
  var scriptLink = document.createElement('script');
  scriptLink.src = json.url + '?' + str;
  var headTag = document.getElementsByTagName('head')[0];
  headTag.appendChild(scriptLink);
}
