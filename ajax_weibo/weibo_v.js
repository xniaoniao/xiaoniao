define(function (require, exports, module) {
  exports.add = function (reply, data) {
    function format(str, data) {
      return str.replace(/\{\{\w+\}\}/g, function (s) {
        s = s.substring(2, s.length - 2);
        return data[s];
      })
    }

    function createView(parent) {
      return parent.cloneNode(true);
    }
    
    function bindView(view, data) {
      view.innerHTML = format(view.innerHTML, data);
      view.removeAttribute('id');
    }
  
    function addMsg(data) {
      var view = createView(reply);
      var date = new Date();
      date.setTime(data.time * 1000);
      var setMsgTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-'
          + date.getDate() + ' ' +   date.getHours() + ':' + date.getMinutes()
          + ':' + date.getSeconds();
      bindView(view, {
        content : data.content,
 	    	time : setMsgTime,
  		  acc : data.acc,
  		  ref : data.ref
      });
      var parentNode = reply.parentNode;
      parentNode ? parentNode.insertBefore(view, parentNode.children[0])
          : parentNode.appendChild(view);
      return view;
    }
    return addMsg(data);
    
  }
  exports.addPageCount = function (data) {
    function clearPage() {
      var pageContainer = document.getElementById('page_box');
      pageContainer.innerHTML = '';
    }

    function addPages() {
      var pageContainer = document.getElementById('page_box');
      clearPage();
      for (var i = 0; i < data.count; i++) {
        var page = document.createElement('a');
        page.innerHTML = i + 1;
        pageContainer.appendChild(page);
      }
      return pageContainer;
    }
    return addPages();
  }
})