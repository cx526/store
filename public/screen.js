(function () { 
  // 设计稿尺寸为750
  var baseWidth = 750;
  var set = function () {
    var baseFontSize = 100;
    // 获取当前屏幕的宽度;
    var clientWidth = document.documentElement.clientWidth || document.innerWidth;
    if (clientWidth != baseWidth) {
      baseFontSize = clientWidth / baseWidth * baseFontSize;
    }
    document.querySelector("html").style.fontSize = baseFontSize + "px";
  }
  set();
  // 监听屏幕尺寸变化
  window.addEventListener("resize", set);
  // window.onresize=set
}())