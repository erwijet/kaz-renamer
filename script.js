// client script.js
const { remote } = require('electron');
const { writeFileSync } = remote.require('./writeFileSync');
const { readFileSync } = remote.require('./readFileSync');

document.getElementById('mainform').addEventListener('submit', (event) => {
    event.preventDefault();
    let target = document.getElementById('target').files[0].path;
    let data = readFileSync(target);
    let path = target.substring(0, target.length - target.split('\\').pop().length);
    let filesText = document.getElementById('files').value;
    let ext = document.getElementById('ext').value; // get extension to use
    let files = filesText.split('\n'); // seperate by lines
    for (let file of files) {
        if (file != '') // remove whitespace
            writeFileSync(path + file + ext, data);
    }
});

// handle dynamic file name preview
let fileInput = document.getElementById('target');
fileInput.addEventListener('change', (event) => {
    document.getElementById('file-name').innerHTML = fileInput.files[0].name;
    document.getElementById('ext').value = '.' + fileInput.files[0].name.split('.').pop();
});