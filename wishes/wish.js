/**
 * Created by xiaolili on 16/4/2.
 */
function getAllWishes(succeedFn, failedFn) {
  ajax({
    'url' : 'wish.php',
    'data' :  {
      'act' : 'get'
    },
    'succeedFn' : function (str) {
      var json = eval('(' + str + ')');
      if (json.error) {
        failedFn && failedFn(json);
      } else {
        succeedFn && succeedFn(json);
      }
    }
  })
}

function addWish(json) {
  var nickName = json.nick || "";
  var wishes = json.wishes || "";
  var failedFn = json.failedFn || function (msg) {
        alert(msg.msg);
      };
  if (nickName.length == 0) {
    failedFn({
      'error': 1,
      'msg': "nick name is empty"
    });
  }

  ajax({
    'url' : 'wish.php',
    'data' : {
      'act' : 'add',
      'username' : nickName,
      'content' : wishes
    },
    'succeedFn' : function (str) {
      var result = eval('(' + str + ')');
      if (result.error) {
        failedFn(result);
      } else {
        json.succeedFn && json.succeedFn(result);
      }
    }
  })
}

function deleteWish(id, succeedFn, failedFn) {
  ajax({
    'url' : 'wish.php',
    'data' : {
      'act' : 'delete',
      'id' : id
    },
    succeedFn : function (str) {
      var json = eval('(' + str + ')');
      if(json.error) {
        failedFn && failedFn(json);
      } else {
        succeedFn && succeedFn(json);
      }
    }
  })
}
