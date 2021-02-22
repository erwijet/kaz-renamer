const electronInstaller = require('electron-winstaller');

(async () => {
	try {
		await electronInstaller.createWindowsInstaller({
			appDirectory: 'dist/KazRenamer-win32-x64',
			outputDirectory: 'dist/installer',
			loadingGif: 'res/splash/KazLoadingSplash.gif',
			authors: 'Tyler Holewinski',
			exe: 'KazRenamer.exe',
			description: 'Duplicate files quickly with unique names',
			version: '3.0.0',
		});

		console.log('woot woot! Installer Built :D');
	} catch (ex) {
		console.log('no dice: ' + ex.message);
	}
})();
