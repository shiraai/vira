'use strict';

// enable the developer tools for electron ui
var electron_devtools = false;

const electron = require('electron'),
  ipcMain = require('electron').ipcMain,
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;
  require('electron-reload')(__dirname);

//app.commandLine.appendSwitch('proxy-server', 'http=localhost:8080'); for mitmproxy

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 500, height: 875, frame: false });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  if (electron_devtools) { mainWindow.webContents.openDevTools(); };

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

// live-reload
require('electron-reload')(__dirname, {
  electron: require('electron-prebuilt')
});