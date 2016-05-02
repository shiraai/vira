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
	// hide scrollbar because it's ugly
	// webview.insertCSS("html { overflow:hidden;}");
    // webview.openDevTools();
    addEvent(window, "resize", function(event) {
	    var w = window.innerWidth;
	    var z = w / 320;
	    webview.executeJavaScript("window.deviceRatio = window.displayInitialize();");
	    webview.executeJavaScript("window.Game = Game;window.fitScreenByZoom(window.deviceRatio);");
	    // this "abuses" the function they already have for us to fix the resolution
	});
});

// IPC TEST, no point now
require('electron').ipcRenderer.on('ping', function(event, message) {
    var w = window.innerWidth;
    // zoom 1.0 = wide 320px
    var z = w / 320;
    console.log(z)
    //webview.insertCSS("html { zoom:" + z + ";}");
    // need to apply zoom in a sane way
    // this is dumb and it doesn't actually have to be applied by the IPC message, the render already knows how big the window is by itself.
});