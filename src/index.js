const { remote } = require('electron');
const { dialog } = remote;
const fs = require('fs');
const path = require('path');

function loadTarget() {
	// show OpenFileDialog and prompt user to select a file

	dialog.showOpenDialog().then((filename) => {
		if (filename == undefined) return;

		document.getElementById('targetField').value = filename.filePaths.shift();
	});
}

function runRenamer() {
	try {
		const t0 = performance.now(); // timestamp at execution start

		const targetField = document.getElementById('targetField');
		const targetPath = targetField.value;

		const exists = fs.existsSync(targetPath);

		if (!exists) {
			dialog.showMessageBox(null, {
				message: "Jeepers! That path doesn't exist. :/",
			});
			return;
		}

		const pathField = document.getElementById('copyField');
		const delimField = document.getElementById('delimField');
		const destroyField = document.getElementById('destroyField');
		const implyField = document.getElementById('implyField');

		let delim = delimField.value;

		// newline char cant be stored in html attribute
		// if actual attribute is '\n', replace with newline char
		// otherwise, don't change delimeter
		delim = delim == '\\n' ? '\n' : delim;

		// get non-whitespace paths
		// and trim possible whitespace (such as when a comma is the delimeter)
		let paths = pathField.value
			.split(delim)
			.filter((elem) => elem != '')
			.map((elem) => elem.trim());

		// populate missing extensions
		if (implyField.checked) {
			const ext = targetPath.split('.').pop();
			paths = paths.map((elem) => {
				if (elem.split('.').length == 1) return elem + `.${ext}`;
				else return elem;
			});
		}

		const dataBuffer = fs.readFileSync(targetPath);

		for (let thisPath of paths) {
			fs.writeFileSync(path.join(targetPath, '../' + thisPath), dataBuffer);
		}

		if (destroyField.checked) fs.unlinkSync(targetPath); // delete original file

		const t = performance.now(); // timestamp at exection finish
		dialog.showMessageBox(null, {
			message: 'Kaz Renamer finished in ' + (t - t0).toFixed(2) + ' ms',
		});
	} catch (ex) {
		dialog.showMessageBox(null, {
			message: 'An error was thrown!\n\n' + JSON.stringify(ex),
		});
	}
}
