//Variables
var array_names = new Array;
var array_hours = new Array;
var array_text = new Array;
var dat = new Object;
var equal_pos = 0;

/*Function Text pre-work data
    The function extracts from the text the names of the employees 
    and working hours and creates an object with these values.
    Input: text
    Return Data with keys(names, hours for employeer, length data)

*/
function textArray(txt) {
    let i = 0;
    array_text = txt.split("\r\n");
    for (let value of array_text) {
        equal_pos = value.indexOf("=");
        //Split the names and hours of the data
        array_names[i] = value.substring(0, equal_pos);
        array_hours[i] = value.substring(equal_pos + 1).split(",");
        i += 1;
    }
    dat = {names:array_names , hours:array_hours, len:i};
    return dat ;
}

/*Add hours to day worked in a Map if hours for days is not empty
    Data Input: 
        aux_map: Map to add hours
        day: Days worked
        array_hours: Array with hours for day
    Return: Map with hours worked for day
*/
function arrayMap(aux_map,day,array_hours){
    if (array_hours.length > 0){
        aux_map.set(day,array_hours.toString());
    }
    return aux_map;
}

/*Convert data of hour to min
    Data Input: 
        array_aux: array with hours, example = [12:00-14:00,16:00-20:00]
    Return
        array_min_day : array with minutes, example = [720-840,960-1200]
*/
function hourToMin(array_aux){
    let array_min = [];
    let array_min_day = [];
    let j=0;
    let ind = 0;
    let i = 0;
    for (var value of array_aux){
        //Split the data in a array of income  and exit hours
        array_hours = value.split("-");
        i = 0;
        array_min = [];
        for(let val of array_hours){
            /*Split data in a array of hours and minutes, 
            and convert this data in array only minutes*/
            ind = val.indexOf(":");
            array_min[i] = parseInt(val.substr(0,ind))*60+parseInt(val.substr(ind+1,));
            i += 1;
        }
        array_min_day[j] =array_min[0]+"-"+array_min[1];
        j +=1;
    }
    return array_min_day;
}


/*Create a Map  with hours worked for day in the week for  person
    Data Input: 
        hours_pe: String hours worked for day in the week example: ["MO10:00-12:00","TU10:00-12:00"]
    Return
        aux_map: Map  with hours worked for day for person in minutes
        aux_map= [{"MO" => "600-720"},{"TU" => "600-720"}]
*/
function arrayMapPer(hours_pe){
    let aux_map = new Map;
    let array_mo=[];
    let array_tu=[];
    let array_we=[];
    let array_th=[];
    let array_fr=[];
    let array_sa=[];
    let array_su=[];
    var hours_aux = [];
    let day = 0;
    //aux_map.clear();
    for(let hours_day of hours_pe){
        //Split the data in days and hours
        day = hours_day.substring(0,2);
        hours_aux = hours_day.substring(2);
        //Switch to create array for day with the hours
        switch(day){
            case "MO":
                array_mo=[hours_aux,...array_mo];
                break;
            case "TU":
                array_tu=[hours_aux,...array_tu];
                break;
            case "WE":
                array_we=[hours_aux,...array_we];
                break;
            case "TH":
                array_th=[hours_aux,...array_th];
                break;
            case "FR":
                array_fr=[hours_aux,...array_fr];
                break;
            case "SA":
                array_sa=[hours_aux,...array_sa];
                break;
            case "SU":
                array_su=[hours_aux,...array_su];
                break;
            default:
                break;
        }
        
    }
    //Convert arrays hours at day in a map with minutes at day
    aux_map = arrayMap(aux_map,"MO",hourToMin(array_mo));
    aux_map = arrayMap(aux_map,"TU",hourToMin(array_tu));
    aux_map = arrayMap(aux_map,"WE",hourToMin(array_we));
    aux_map = arrayMap(aux_map,"TH",hourToMin(array_th));
    aux_map = arrayMap(aux_map,"FR",hourToMin(array_fr));
    aux_map = arrayMap(aux_map,"SA",hourToMin(array_sa));
    aux_map = arrayMap(aux_map,"SU",hourToMin(array_su));

    return aux_map;
}

/*Compare two array with frame times and return 
the number intersections in the frames times
    Data input: 
        array_one: array with frame times in minutes 
        array_two: array with frame times in minutes 
    Return
        match: Numbers the matching in the frame times
*/
function compare_minutes(array_one,array_two){
    let frame_1 = [];
    let frame_2 = [];
    let match = 0;
    array_one = array_one.split(',');
    array_two = array_two.split(',');
    for(let nums_one of array_one){
        for(let nums_two of array_two){
            //Split the data in a array of income  and exit hours
            frame_1 = nums_one.split('-');
            frame_2 = nums_two.split('-');
            // Compare if the frame times is matching
            if((frame_2[0]>=frame_1[0] && frame_2[0]<frame_1[1]) ||
                (frame_2[1]<=frame_1[1] && frame_2[1]>frame_1[0]) ||
                (frame_2[0]<=frame_1[0] && frame_2[1]>=frame_1[1])
                ){
                match +=1; 
            }
        }
    }
    return match;
}

/*Function for create a map with the pairs names employees 
and numbers to maching frame times in the week
Data input:
    Object with the attributes : names, hours, len
Return
    Map with the pairs names employees 
    and numbers to maching frame times

*/
function mapMatching(data_obj){
    let pair_names;
    let i = 0;
    let j = 0;
    var aux_data = new Object;
    var map_matching = new Map;
    var days_match = new Map;
    let match_for_day = 0;
    let match_for_pair = 0;
    
    for (let hours_pe of data_obj.hours){
        //Iterate the data per person to find time matches with other people
        aux_data.len = data_obj.len - (i+1);
    
        if (aux_data.len == 0){
            //
            break;
        }
        //Assign names and times to an auxiliary object without taking 
        //into account the name and time of the person being iterated.
        aux_data.names = data_obj.names.slice(i+1);
        aux_data.hours = data_obj.hours.slice(i+1);
    
        
        for (let hours_com of aux_data.hours){
            //For to iterate the times of the auxiliary object and find matches in frame times
            pair_names = data_obj.names[i]+"-"+aux_data.names[j];
    
            for(let key_data_map_1 of hours_pe){
                //For para iterar los dias por persona
                if (hours_com.has(key_data_map_1[0])){
                    //if the day of the person in the main object 
                    //is the same as the day of the person in the auxiliary object
                    match_for_day = compare_minutes(hours_pe.get(key_data_map_1[0]),hours_com.get(key_data_map_1[0]));
                    if (match_for_day>0){
                        //Sum the num the matching for day
                        days_match.set(key_data_map_1[0],match_for_day);
                        match_for_pair += match_for_day;
                    }
                }
                match_for_day = 0;
            }
            map_matching.set(pair_names,match_for_pair);
            match_for_pair = 0;
            days_match.clear();
            j += 1;
        }
        
        i += 1;
        j = 0;
    }
    return map_matching;
}



//Create function for Generate table to results in HTML
function generate_table(map_table) {
    // Get the body element reference
    var div_result = document.getElementById("result");
    div_result.innerHTML = "";
    // Creates a <table> and <tbody> elements
    var table   = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    //Asign a Id to table for change styles
    table.id = "table_result";
    //Create titles in the columns of the table
    var row_title = document.createElement("tr");
    var titles = ["Employee Couple","Match Times"];

    for (var j = 0; j < 2; j++) {
        /*Create a <th> element and a text node, 
        make the text node the content of <th>, 
        place the <th> element at the end of the table row.
        */       
        var celda_title = document.createElement("th");
        var text_title = document.createTextNode(titles[j]);
        celda_title.appendChild(text_title);
        row_title.appendChild(celda_title);
    }
    tblBody.appendChild(row_title);

    // creates the cells
    for (let data_print of map_table.entries()) {
      // Creates the table rows
      var row = document.createElement("tr");
  
      for (var j = 0; j < 2; j++) {
        /*Create a <td> element and a text node, 
        make the text node the content of <td>, 
        place the <td> element at the end of the table row.
        */ 
        var cell = document.createElement("td");
        var text_cell = document.createTextNode(data_print[j]);
        cell.appendChild(text_cell);
        row.appendChild(cell);
      }
  
      // adds the row at the end of the table (at the end of the tblbody element)
      tblBody.appendChild(row);
    }
  
    // positions the <tbody> below the <table> element.
    table.appendChild(tblBody);
    // appends <table> into <body>
    div_result.appendChild(table);
}

//Export Functions
export {textArray,arrayMap,hourToMin,arrayMapPer,compare_minutes,generate_table,mapMatching};