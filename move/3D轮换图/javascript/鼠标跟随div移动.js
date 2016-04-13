function hoverDirection(obj, ev) {
      var disX = ev.clientX;
      var disY = ev.clientY;
      var toBoxCenterLeftDistance = obj.offsetLeft + obj.offsetWidth / 2;
      var toBoxCenterTopDistance = obj.offsetTop + obj.offsetHeight / 2;
      var a = toBoxCenterLeftDistance  - disX;
      var b = toBoxCenterTopDistance - disY;
      retrun (Math.round(((Math.atan(a, b) * 180 / Math.PI) + 180) / 90)) % 4; 
}
var imgs = document.getElementsByTagName('img');
var mask = document.getElementsByTagName('mask');
for(var i = 0; i < imgs.length; i++) {
  imgs[i].index = i;
  imgs[i].onmouseover = function(e) {
    var ev = e || event;
    var n = hoverDirection(this, ev);
    var from = ev.formElement || ev.relatedTarget;
    if(this.contains(from)) return;
    switch(n) {
      case 0:
        mask.style.left = 200 + 'px';
        mask.style.top = 0;
        break;
      case 1:
        mask.style.left = 0;
        mask.style.top = 200 + 'px';
        break;
     case 2:
        mask.style.left = -200 + 'px';
        mask.style.top = 0 + 'px';
        break;
     case 3:
        mask.style.left = 0;
        mask.style.top = -200 + 'px';
    }
    move(mask[this.index], {'top' : 0, 'left' : 0 })
  }
}