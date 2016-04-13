define(function (require, exports, module) {
  var getData = require('weibo_m');
  var view = require('weibo_v');
  exports.send = function () {
    var oBtn =document.getElementById('btn1');
    var oT=document.getElementById('t1');
    var reply = document.getElementById('reply');
    function clearInput() {
      var  msgContainer = document.getElementById('t1');
      msgContainer.innerHTML = '';
    }
    oBtn.onclick=function(){
      getData.sendMsg(oT,function(data) {
        clearInput();
        var weibo = view.add(reply, {
          content : oT.value,
          time : data.time,
          acc : 0,
          ref : 0
        });
        bindActions(data.id, weibo);
      });
    };
  };

  function bindActions(id, weibo) {
    var btn = weibo.getElementsByTagName('a');
    btn[0].onclick = function () {
      getData.like(id, function () {
        btn[0].innerHTML = parseInt(btn[0].innerHTML) + 1;
      })
    };

    btn[1].onclick = function () {
      getData.downVote(id, function () {
        btn[1].innerHTML = parseInt(btn[1].innerHTML) + 1;
      })
    };

    btn[2].onclick = function () {
      getData.deleteWeibo(id, function () {
        weibo.parentNode.removeChild(weibo);
      })
    };
  }

  function getWeiBo(num, parent) {
    getData.getPageContent(num, function (data) {
      for (var i = 0; i < data.length; i++) {
        var weibo = view.add(parent, data[i]);
        bindActions(data[i].id, weibo);
      }
    })
  }

  exports.getPages = function () {
    getData.getCount(function (data) {
      var pageContainer = view.addPageCount(data);
      var pages = pageContainer.children;
      var reply = document.getElementById('reply');
      for (var i = 0; i < pages.length; i++) {
        (function (index) {
          pages[index].onclick = function () {
            for (var i = 0; i < pages.length; i++) {
              pages[i].className = '';
            }
            this.className = 'active';
            var parent = reply.parentNode;
            while (parent.children.length > 1) {
              parent.removeChild(parent.lastChild);
            }
            getWeiBo(index, reply);
          }
        })(i)
      }
      pages[0].className = 'active';
      getWeiBo(0, reply);
    })
  }

})