const { ipcMain, app, BrowserWindow } = require('electron');

let win;

function createWindow() {
     win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.setMenu(null);
    win.loadFile('index.html');
    win.on('closed', () => {
        win = null; // destroy window
    });
}

exports.say = function say(data) {
    console.log(data);
}

ipcMain.on('click', () => {
    console.log("clicked!");
})

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
app.on('activate', () => {
    if (win === null)
        createWindow();
});