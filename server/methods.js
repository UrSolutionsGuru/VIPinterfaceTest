import {Meteor} from "meteor/meteor";
import Papa from 'papaparse';

Meteor.methods({
  empData33a() {
   // let csvfile = new eFile([""],'/Users/ur/WebstormProjects/VIPinterfaceTest/csvFiles/empData33b.csv');
    console.log('emp Data');

    Papa.parse(csvfile, {
      // Papa.parse(fileInput.files[0], {
      complete: function(results) {
        console.log(results);
      }
    });


  },
});