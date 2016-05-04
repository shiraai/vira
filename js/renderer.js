// enable the developer tools for the webview
var webview_devtools = true;

// get the webview
var webview = document.querySelector('webview');

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
    webview.insertCSS("html { overflow-x: hidden; }");
    webview.insertCSS("::-webkit-scrollbar { width: 4px; }");
    webview.insertCSS("::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2); }");
    webview.insertCSS("::-webkit-scrollbar-thumb { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4); }");
    webview.insertCSS(".mask { right: -4px !important; }");
    webview.insertCSS("#loading, #ready { right: -4px !important; }");

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
