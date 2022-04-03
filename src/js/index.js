import {textArray,arrayMapPer,generate_table,mapMatching} from "./modules/modules.js";
//Variables
var text = new String;
let div_text = document.getElementById('file_text');
const document_txt = new XMLHttpRequest;
const file_path = "/src/index.txt";


//
const fileSelector = document.getElementById('input_file');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files[0];

    if(fileList){
        let reader = new FileReader;
        reader.onload = function(e) {
            let contenido = e.target.result;
            div_text.innerHTML = contenido;
            console.log(contenido);
            findMatch(contenido);
        }
        reader.readAsText(fileList);
    }else{
        document_txt.open("GET",file_path,false);
        document_txt.send(null);
        text = document_txt.responseText; 
        div_text.innerHTML = "No files were loaded. It is evaluated with test data. </br>"+text;
        console.log(text);
        findMatch(text);
    }
    
})


//Read file
/*
document_txt.open("GET",file_path,false);
document_txt.send(null);
text = document_txt.responseText; 
div_text.innerHTML = text;
*/
//Print in console data input



function findMatch(data_text){
    var data_prework = new Object;
    let x=0;
    var map_matching_pairs = new Map;

    //Create a object with data names and hours worked 
    data_prework = textArray(data_text); 

    //Convert to map the data hours for person

    for (let hours_pe of data_prework.hours){
        data_prework.hours[x] = arrayMapPer(hours_pe);
        x +=1;
    }

    //Create a map with the pairs names employees 
    //and numbers to maching frame times
    map_matching_pairs = mapMatching(data_prework);

    // Print in console the result
    for (let data_print of map_matching_pairs.entries()){
        console.log(data_print[0]+": "+data_print[1]);
    }

    //Call the function for generate the table with the results
    generate_table(map_matching_pairs);
}
