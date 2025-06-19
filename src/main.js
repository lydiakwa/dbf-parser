import { Dbf } from 'dbf-reader';
import { DataTable } from 'dbf-reader/models/dbf-file';
import { Buffer } from 'buffer/';

window.Buffer = Buffer;
// var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!
console.log(Buffer);
console.log('hi');
let form = document.querySelector('form');
let fileInput = document.querySelector('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let reader = new FileReader();
  if (fileInput.files && fileInput.files.length > 0) {
    let file = fileInput.files[0];
    console.log(file);
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      var arrayBuffer = reader.result;
      if (arrayBuffer) {
        let buffer = Buffer.from(arrayBuffer);
        let datatable = Dbf.read(buffer);
        console.log(datatable);
      }
    };
  }
});
