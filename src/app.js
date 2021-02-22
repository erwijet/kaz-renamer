/**
 * Kaz-Renamer (v3)
 *
 * index.js
 *
 * Spawn electron instance and load index.html
 *
 * @author Tyler "erwijet" Holewinski
 * @date 2/21/2021
 */

const { app, BrowserWindow, Menu } = require('electron');
if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
	const win = new BrowserWindow({
		title: 'Kaz Renamer 3',
		icon: 'res/icons/icon.png',
		width: 800,
		height: 650,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
	});

	win.loadFile('src/index.html');
	Menu.setApplicationMenu(null); // hide menu
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
