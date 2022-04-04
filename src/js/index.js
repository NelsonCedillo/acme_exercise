import {
  textArray,
  arrayMapPer,
  generateTable,
  mapMatching,
} from './modules/modules.js';
// Variables
let text = '';
const divText = document.getElementById('file_text');
const documentTxt = new XMLHttpRequest();
const FILE_PATH = '/src/index.txt';

/**
 * Function for findMatching
 * The function creates a map with the matching data by employee pairs.
 * and generate table in HTML with the result
 * @param {string} dataText - Text with the data
 */
function findMatch(dataText) {
  let dataPrework = {};
  let x = 0;

  // Create a object with data names and hours worked
  dataPrework = textArray(dataText);

  // Convert to map the data hours for person

  for (const hoursPe of dataPrework.hours) {
    dataPrework.hours[x] = arrayMapPer(hoursPe);
    x += 1;
  }

  // Create a map with the pairs names employees
  // and numbers to maching frame times
  const mapMatchingPairs = mapMatching(dataPrework);

  // Print in console the result
  [...mapMatchingPairs.entries()].forEach((dataPrint) => {
    console.log(dataPrint[0] + ': ' + dataPrint[1]);
  });

  // Call the function for generate the table with the results
  generateTable(mapMatchingPairs);
}

const fileSelector = document.getElementById('input_file');
fileSelector?.addEventListener('change', (event) => {
  const fileList = event.target?.files?.[0];

  if (fileList) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const contenido = e.target.result;
      divText.innerHTML = contenido;
      console.log(contenido);
      findMatch(contenido);
    };
    reader.readAsText(fileList);
  } else {
    documentTxt.open('GET', FILE_PATH, false);
    documentTxt.send(null);
    text = documentTxt.responseText;
    divText.innerHTML =
            'No files were loaded. It is evaluated with test data.</br>' + text;
    console.log(text);
    findMatch(text);
  }
});
export {findMatch};
