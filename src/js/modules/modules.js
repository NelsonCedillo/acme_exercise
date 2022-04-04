/**
 * Function Text pre-work data
    The function extracts from the text the names of the employees
    and working hours and creates an object with these values.
    @param {string} txt - hola mundo
    Return Data with keys(names, hours for employeer, length data)
    @return {any} - Data with keys(names, hours for employeer, length data)
*/
function textArray(txt) {
  const arrayNames = [];
  const arrayHours = [];
  let dat = {};
  let equalPos = 0;
  let i = 0;
  const arrayText = txt.split('\r\n');
  for (const value of arrayText) {
    equalPos = value.indexOf('=');
    // Split the names and hours of the data
    arrayNames[i] = value.substring(0, equalPos);
    arrayHours[i] = value.substring(equalPos + 1).split(',');
    i += 1;
  }
  dat = {names: arrayNames, hours: arrayHours, len: i};
  return dat;
}

/**
 * Add hours to day worked in a Map if hours for days is not empty
 * Data Input:
 * @param {Map} auxMap - Map to add hours
 * @param {string} day - Days worked
 * @param {array} arrayHours - Array with hours for day
 * @return {Map} Map with hours worked for day
*/
function arrayMap(auxMap, day, arrayHours) {
  if (arrayHours.length > 0) {
    auxMap.set(day, arrayHours.toString());
  }
  return auxMap;
}

/**
 * Convert data of hour to min
 * Data Input:
 * @param {string} arrayAux - array with hours,
 * example = [12:00-14:00,16:00-20:00]
 * @return {array} array with minutes, example = [720-840,960-1200]
*/
function hourToMin(arrayAux) {
  let arrayMin = [];
  const arrayMinDay = [];
  let j = 0;
  let ind = 0;
  let i = 0;
  for (const value of arrayAux) {
    // Split the data in a array of income  and exit hours
    const arrayHours = value.split('-');
    i = 0;
    arrayMin = [];
    for (const val of arrayHours) {
      /* Split data in a array of hours and minutes,
            and convert this data in array only minutes*/
      ind = val.indexOf(':');
      arrayMin[i] =
                parseInt(val.substr(0, ind)) * 60 +
                parseInt(val.substr(ind + 1));
      i += 1;
    }
    arrayMinDay[j] = arrayMin[0] + '-' + arrayMin[1];
    j += 1;
  }
  return arrayMinDay;
}

/**
 * Create a Map  with hours worked for day in the week for  person
 * Data Input:
 * @param {array} hoursPe - String hours worked for day in the
 * week example: ["MO10:00-12:00","TU10:00-12:00"]
 * @return {Map} - Map  with hours worked for day for person in minutes
        aux_map= [{"MO" => "600-720"},{"TU" => "600-720"}]
*/
function arrayMapPer(hoursPe) {
  let auxMap = new Map();
  let arrayMo = [];
  let arrayTu = [];
  let arrayWe = [];
  let arrayTh = [];
  let arrayFr = [];
  let arraySa = [];
  let arraySu = [];
  let hoursAux = [];
  let day = 0;
  // aux_map.clear();
  for (const hoursDay of hoursPe) {
    // Split the data in days and hours
    day = hoursDay.substring(0, 2);
    hoursAux = hoursDay.substring(2);
    // Switch to create array for day with the hours
    switch (day) {
      case 'MO':
        arrayMo = [hoursAux, ...arrayMo];
        break;
      case 'TU':
        arrayTu = [hoursAux, ...arrayTu];
        break;
      case 'WE':
        arrayWe = [hoursAux, ...arrayWe];
        break;
      case 'TH':
        arrayTh = [hoursAux, ...arrayTh];
        break;
      case 'FR':
        arrayFr = [hoursAux, ...arrayFr];
        break;
      case 'SA':
        arraySa = [hoursAux, ...arraySa];
        break;
      case 'SU':
        arraySu = [hoursAux, ...arraySu];
        break;
      default:
        break;
    }
  }
  // Convert arrays hours at day in a map with minutes at day
  auxMap = arrayMap(auxMap, 'MO', hourToMin(arrayMo));
  auxMap = arrayMap(auxMap, 'TU', hourToMin(arrayTu));
  auxMap = arrayMap(auxMap, 'WE', hourToMin(arrayWe));
  auxMap = arrayMap(auxMap, 'TH', hourToMin(arrayTh));
  auxMap = arrayMap(auxMap, 'FR', hourToMin(arrayFr));
  auxMap = arrayMap(auxMap, 'SA', hourToMin(arraySa));
  auxMap = arrayMap(auxMap, 'SU', hourToMin(arraySu));

  return auxMap;
}

/**
 * Compare two array with frame times and return
 * the number intersections in the frames times
 * Data input:
 * @param {array} arrayOne - array with frame times in minutes
 * @param {array} arrayTwo - array with frame times in minutes
 * @return {number} - Numbers the matching in the frame times
*/
function compareMinutes(arrayOne, arrayTwo) {
  let frame1 = [];
  let frame2 = [];
  let match = 0;
  arrayOne = arrayOne.split(',');
  arrayTwo = arrayTwo.split(',');
  for (const numsOne of arrayOne) {
    for (const numsTwo of arrayTwo) {
      // Split the data in a array of income  and exit hours
      frame1 = numsOne.split('-');
      frame2 = numsTwo.split('-');
      // Compare if the frame times is matching
      if (
        (frame2[0] >= frame1[0] && frame2[0] < frame1[1]) ||
                (frame2[1] <= frame1[1] && frame2[1] > frame1[0]) ||
                (frame2[0] <= frame1[0] && frame2[1] >= frame1[1])
      ) {
        match += 1;
      }
    }
  }
  return match;
}

/**
 * Function for create a map with the pairs names employees
 * and numbers to maching frame times in the week
 * Data input:
 * @param {Object} dataObj - array with hours,Object
 * with the attributes : names, hours, len
 * @return {Map} - Map with the pairs names employees
 * and numbers to maching frame times
*/
function mapMatching(dataObj) {
  let pairNames;
  let i = 0;
  let j = 0;
  const auxData = {};
  const mapMatching = new Map();
  const daysMatch = new Map();
  let matchForPair = 0;

  for (const hoursPe of dataObj.hours) {
    // Iterate the data per person to find time matches with other people
    auxData.len = dataObj.len - (i + 1);

    if (auxData.len == 0) {
      //
      break;
    }
    // Assign names and times to an auxiliary object without taking
    // into account the name and time of the person being iterated.
    auxData.names = dataObj.names.slice(i + 1);
    auxData.hours = dataObj.hours.slice(i + 1);

    for (const hoursCom of auxData.hours) {
      // For to iterate the times of the auxiliary object and
      // find matches in frame times
      pairNames = dataObj.names[i] + '-' + auxData.names[j];

      for (const keyDataMap1 of hoursPe) {
        // For para iterar los dias por persona
        if (hoursCom.has(keyDataMap1[0])) {
          // if the day of the person in the main object
          // is the same as the day of the person in the auxiliary object
          const matchForDay = compareMinutes(
              hoursPe.get(keyDataMap1[0]),
              hoursCom.get(keyDataMap1[0]),
          );
          if (matchForDay > 0) {
            // Sum the num the matching for day
            daysMatch.set(keyDataMap1[0], matchForDay);
            matchForPair += matchForDay;
          }
        }
      }
      mapMatching.set(pairNames, matchForPair);
      matchForPair = 0;
      daysMatch.clear();
      j += 1;
    }

    i += 1;
    j = 0;
  }
  return mapMatching;
}

/**
 * Create function for Generate table to results in HTML
 * Data input:
 * @param {Map} mapTable - Map with pairs employees with machin
 */
function generateTable(mapTable) {
  // Get the body element reference
  const divResult = document.getElementById('result');
  // Creates a <table> and <tbody> elements
  const table = document.createElement('table');
  const tblBody = document.createElement('tbody');

  // Asign a Id to table for change styles
  table.id = 'table_result';
  // Create titles in the columns of the table
  const rowTitle = document.createElement('tr');
  const titles = ['Employee Couple', 'Match Times'];

  for (let j = 0; j < 2; j++) {
    /* Create a <th> element and a text node,
        make the text node the content of <th>,
        place the <th> element at the end of the table row.
        */
    const cellTitle = document.createElement('th');
    const textTitle = document.createTextNode(titles[j]);
    cellTitle.appendChild(textTitle);
    rowTitle.appendChild(cellTitle);
  }
  tblBody.appendChild(rowTitle);

  // creates the cells
  for (const dataPrint of mapTable.entries()) {
    // Creates the table rows
    const row = document.createElement('tr');

    for (let j = 0; j < 2; j++) {
      /* Create a <td> element and a text node,
        make the text node the content of <td>,
        place the <td> element at the end of the table row.
        */
      const cell = document.createElement('td');
      const textCell = document.createTextNode(dataPrint[j]);
      cell.appendChild(textCell);
      row.appendChild(cell);
    }

    // adds the row at the end of the table (at the end of the tblbody element)
    tblBody.appendChild(row);
  }

  // positions the <tbody> below the <table> element.
  table.appendChild(tblBody);
  // appends <table> into <body>
  divResult.appendChild(table);
}

// Export Functions
export {
  textArray,
  arrayMap,
  hourToMin,
  arrayMapPer,
  compareMinutes,
  generateTable,
  mapMatching,
};
