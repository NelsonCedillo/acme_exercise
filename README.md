# ACME Exercise

## Table of Contents
  1. [General Info](#general_info)
  2. [Interfaces](#interfaces)
  3. [Technologies](#technologies)
  4. [Installation](#installation)
  5. [Arquitecture](#arquitecture)
 
## General Info
The goal of this exercise is to output a table containing pairs of employees and how often they have coincided in the office.

  ### Example
  
  #### INPUT
    RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00
    ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
    ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

  #### OUTPUT:
    ASTRID-RENE: 2
    ASTRID-ANDRES: 3
    RENE-ANDRES: 2

## Interfaces

The application has an interface developed in HTML which allows to visualize the input data and the result of the match search between pairs of employees at the same time in a table.
The input data can be uploaded to a button, which allows to attach an input file with the data. The allowed file type is '.txt'.
The logic development was implemented in Javascript, two Javascript execution files were implemented. The 'index.js' file has the main functional logic for finding the match between employees, and the 'modules'js' file contains all the secondary functions implemented.

## Technologies

The following programming languages were used to develop the application:

  ### HTML
  To create la structure the interface
  ### JavaScript
  To create the logic for obtain the matching 
  ### CSS
  To add Styles the HTML.
  ### JEST
  To Realized the Test units
  ### Babel
  To supported Javascript version

## Installation

A little intro about the installation. 
```
$ git clone https://github.com/NelsonCedillo/acme_exercise.git
$ cd ../path/to/the/file
$ npm install
$ npm start
$ npm install --save-dev jest
$ npm install --save-dev @babel/preset-env
```
Finally for test the aplication your run the index.html

## Arquitecture

The development was based on functional programming, for which Javascript was used as the programming language to obtain schedule matching by employee pairs. 

In a first instance a ".txt" file is read which contains the data to be compared. If no file has been loaded, the code is executed with a ".txt" file to perform the tests.

After this, the function findMatch(text) is called, which is the main function in which the whole comparison process takes place.

Within this function a first data processing is performed through the function textToObject(text), this function receives the input text and creates an object with the names of the people, times and number of people to compare.

A second treatment is performed on the data, but especially on the information containing the days and hours. For this, the function arrayMapPer(hoursPe) is used, as an argument the text with the days and hours worked per person is loaded, this function returns a map that contains as keys the days and hours as values. For this step the hours worked were converted only to minutes, because it facilitates the comparison of the frame times worked.

Once all the data pre-processing is done, the function mapMatching(dataPrework) is called, which performs the comparison by day if there is any intersection of hours worked of pairs of employees, and returns a map only with the pairs of employee names where the coincidence of hours was found.

Finally, to display the results in HTML in a table, the function generateTable(mapResult) is called, which as input data receives a map with the names of the pairs of employees and the matching schedules.  This function creates the table inside HTML with the matching results.
