// enable the developer tools
var devtools = false;

// get the webview
var webview = document.querySelector('#webview-game');

// add event for window resizes
var addEvent = function(object, type, callback) {
  if (object == null || typeof(object) == 'undefined') return;

  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  } else {
    object["on" + type] = callback;
  }
};

// add listener for the dom and then add the function for the windows resize
webview.addEventListener("dom-ready", function() {
  if (devtools) { webview.openDevTools(); }

  addEvent(window, "resize", function(event) {
    var w = window.innerWidth;
    var z = w / 320;

    // this "abuses" the function they already have for us to
    // fix the resolution
    webview.executeJavaScript("window.deviceRatio = window.displayInitialize();");
    webview.executeJavaScript("window.Game = Game;window.fitScreenByZoom(window.deviceRatio);");
  });
});
