const electron = require('electron')
const ipcMain = require('electron').ipcMain;
const app = electron.app

// enable touch (??)
app.commandLine.appendSwitch('--touch-devices');
const BrowserWindow = electron.BrowserWindow
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 500, height: 770, frame: false})
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // debug shit, this is pointless though
  mainWindow.on('resize', function () {
    testlol = mainWindow.getContentSize();
    //console.log("[resized] w: " + testlol[0] + " h: " + testlol[1]);
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})