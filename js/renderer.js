var fs = require('fs');

// enable the developer tools for the webview
var webview_devtools = false;
var sound_always_on = true;

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

  // inject css
  fs.readFile('css/webview.css', 'utf8', function(err, data) {
    if (err) throw err;
    webview.insertCSS(data);
  });

  // inject touch events
  fs.readFile('js/create-touch.js', 'utf8', function(err, data) {
    if (err) throw err;
    webview.executeJavaScript(data);
  });

  // resize the game window based on the window resize
  addEvent(window, "resize", function(event) {
    var w = window.innerWidth;
    var z = w / 320; // 320px is the 100% width
    // this "abuses" the function they already have for us to resize it properly
    webview.executeJavaScript("window.deviceRatio = window.displayInitialize();");
    webview.executeJavaScript("window.Game = Game;window.fitScreenByZoom(window.deviceRatio);");
  });

  if (sound_always_on) {
    // Currently uses setTimeout to prevent a hang
    // Should really be in a listener for a game event to prevent this from being a race condition
    webview.executeJavaScript(
        " var vira_mute_saved = undefined;                "
      + " setTimeout(function(){                          "
      + "   require([\"lib/sound-player\"], function(sp){ "
      + "     vira_mute_saved = sp.mute;                  "
      + "     sp.mute = undefined;                        "
      + "   });                                           "
      + " }, 500);                                        "
    );
  }
});

webview.addEventListener('console-message', function(e) {
  console.log('[webview] ', e.message);
});