const electron = require('electron');
const { BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const fetch = require('../../common/fetch')
const config = require('../../common/config')
const {makeDir} =require('../../common/util')
let mainWindow;

async function createWindow() {
    const Menu = electron.Menu
    Menu.setApplicationMenu(null)
    // Create the browser window.
    mainWindow = new BrowserWindow({
        // width: 800,
        // height: 500,
        webPreferences: {
            devTools: true, //  Boolean (可选) - 是否开启 DevTools. 如果设置为 false, 则无法使用
            // Boolean (可选) - 是否集成Node，默认为false
            nodeIntegration: true,
            webviewTag: true,
        }
    })
    mainWindow.webContents.openDevTools()
    await mainWindow.loadFile(path.join(__dirname,'/index.html'))
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}
function saveImgBase64Data (base_64_url) {
    var fs = require("fs");  // 引入fs模块
    makeDir(path.join(config.outputDir, `美女`))
    var distPath = path.join(config.outputDir, `美女/${Date.now()}.png`)
    var base64 = base_64_url.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = Buffer.alloc(base64, 'base64'); //把base64码转成buffer对象，
    console.log(distPath)
    fs.writeFile(distPath,dataBuffer,function(err){//用fs写入文件
        if(err){
            console.log('写入失敗', err);
        }else{
            console.log('写入成功！');
        }
    });

}

ipcMain.on('callFunction', function (event, data) {
    if (data.name === 'base64') {
       saveImgBase64Data(data.data)
    }
})


module.exports = {
    createWindow,
    mainWindow
}