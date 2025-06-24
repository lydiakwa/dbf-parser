import { Dbf } from 'dbf-reader';
import { DataTable } from 'dbf-reader/models/dbf-file';
import { Buffer } from 'buffer/';
import { mkConfig, generateCsv, asBlob } from 'export-to-csv';

window.Buffer = Buffer;
const csvConfig = mkConfig({ useKeysAsHeaders: true });

let form = document.querySelector('form');
let fileInput = document.querySelector('#upload');
let csvContent = 'data:text/csv;charset=utf-8,';
const link = document.querySelector('a');
const mockData = {
  rows: [
    { date: new Date(), name: 'fdfds' },
    { date: new Date(), name: 'fdfds' },
    { date: new Date(), name: 'fdfds' },
  ],
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let reader = new FileReader();
  if (fileInput.files && fileInput.files.length > 0) {
    let file = fileInput.files[0];
    // console.log(file);
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      var arrayBuffer = reader.result;
      if (arrayBuffer) {
        let buffer = Buffer.from(arrayBuffer);
        let datatable = Dbf.read(buffer);
        console.log(datatable);
        const mappedRows = datatable.rows.map((row) => {
          Object.entries(row).forEach(([key, value]) => {
            // console.log(row[key]);

            row[key] = value.toString();
          });
          return row;
        });
        const csv = generateCsv(csvConfig)(mappedRows);
        const blob = asBlob(csvConfig)(csv);
        const url = URL.createObjectURL(blob);
        console.log(csv);
        link.setAttribute('href', url);
        link.setAttribute('download', 'csv export');
      }
    };
  }
});
