define(function (require, exports, module) {
  var ajax = require('ajaxMvc');


  function proxy(callback) {
    return function (str) {
      if (callback) {
        var json = eval('(' + str + ')');
        callback(json);
      }
    }
  }

  exports.sendMsg = function (obj, callBack) {
    ajax.ajax({
      'url' : 'weibo.php',
      'data':{
        act : 'add',
        content : obj.value
      },
      'success' : proxy(callBack)
    });
  }
  //weibo.php?act=get_page_count
  exports.getCount = function (callBack) {
    ajax.ajax({
      'url' : 'weibo.php',
      'data' : {
        'act' : 'get_page_count'
      },
      'success' : proxy(callBack)
    })
  }
  exports.getPageContent = function (num, callBack) {
    ajax.ajax({
      'url' : 'weibo.php',
      'data' : {
        'act' : 'get',
        'page' : num
      },
      'success' : proxy(callBack)
    })
  }
  exports.like = function (id, callBack) {
    ajax.ajax({
      'url' : 'weibo.php',
      'data' : {
        'act' : 'acc',
        'id' : id
      },
      'success' : proxy(callBack)
    })
  }

  exports.downVote = function (id, callback) {
    ajax.ajax({
      'url' : 'weibo.php',
      'data' : {
        'act' : 'ref',
        'id' : id
      },
      'success' : proxy(callback)
    })
  }

  exports.deleteWeibo = function (id, callback) {
    ajax.ajax({
      'url' : 'weibo.php',
      'data' : {
        'act' : 'del',
        'id' : id
      },
      'success' : proxy(callback)
    })
  }

})