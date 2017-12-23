import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import {Meteor} from "meteor/meteor";

import Papa from 'papaparse';
import _ from 'lodash';
import moment from 'moment';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.buttons.events({
  'click button'(event, instance) {
    Meteor.call('empData33a');
  },
});

/* Template.readCSV.events({
  "click .btnReadCsv": function(event, template) {
    Papa.parse(template.find('#csv-file').files[0], {
      config: {
        skipEmptyLines: true,
        header: true,
      },
      complete: function(results) {
        // console.log(results);
        _.each(results.data, function(csvData) {
          console.log(csvData[2]);
        });
        console.log (results.meta);
      },
    });
  }
}); */

Template.readCSV.events({
  "click .btnReadCsv": function(event, template) {
    Papa.parse(template.find('#csv-file').files[0], {
      header: true,
      complete: function(results) {
        _.each(results.data, function(csvData, j) {
          console.log(`line ${j+1}`);
          _.each(csvData, function(lineData, i) {
            switch (i) {
              case 'Company' :
                if (!_.inRange(lineData,1,999)) console.log (`line ${j+1}: field: ${i} data: ${lineData} - should be a number between 1 and 999`);
                break;
              case 'Employee' :
              case 'Surname' :
              case 'Known as' :
              case 'First name' :
            //    console.log(i);
             //   console.log(lineData.match(/^[0-9a-zA-Z\s]+$/));
                if (!lineData.match(/^[0-9a-zA-Z\s]+$/)) console.log (`line ${j+1}: field: ${i} data: ${lineData} - should be alphanumeric`);
                break;
              case 'Date of birth' :
              case 'Date terminated' :
                let newDate = new moment(lineData);
                if (newDate == null || !newDate.isValid()) console.log (`line ${j+1}: field: ${i} data: ${lineData} - should be a date`);
                break;
              case 'Group' :
                if (!lineData.match(/^[CAWI]$/)) console.log (`line ${j+1}: field: ${i} data: ${lineData} - unallowed value`);
                break;
            }
          });
         // console.log(csvData['Company']);
         // console.log(csvData[results.meta.fields[3]])
        });
       // console.log(results.meta);
      },
    skipEmptyLines: true,
    });
  }
});