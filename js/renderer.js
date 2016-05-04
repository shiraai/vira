var fs = require('fs');

// enable the developer tools for the webview
var webview_devtools = false;

// get the webview
var app     = document.querySelector('body'),
    webview = document.querySelector('webview');

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
  if (webview_devtools) { webview.openDevTools(); }
  // should have our "inject" shit here in general
  // TODO:
  // https://gist.github.com/gyaru/d25f741d72669c1f4404630cc551ca8b#file-locallib-js-L1346
  // mute function

  fs.readFile('css/webview.css', 'utf8', function(err, data) {
    if (err) throw err;
    webview.insertCSS(data);
  });

  fs.readFile('js/create-touch.js', 'utf8', function(err, data) {
    if (err) throw err;
    webview.executeJavaScript(data);
  });

  addEvent(window, "resize", function(event) {
    var w = window.innerWidth;
    var z = w / 320;

    // this "abuses" the function they already have for us to
    // fix the resolution
    webview.executeJavaScript("window.deviceRatio = window.displayInitialize();");
    webview.executeJavaScript("window.Game = Game;window.fitScreenByZoom(window.deviceRatio);");
  });
});

webview.addEventListener('console-message', function(e) {
  console.log('[webview] ', e.message);
});
