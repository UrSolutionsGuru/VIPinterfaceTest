import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import {Meteor} from "meteor/meteor";

import Papa from 'papaparse';
import _ from 'lodash';

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
        _.each(results.data, function(csvData) {
          console.log(csvData['Company']);
          console.log(csvData[results.meta.fields[3]])
        });
        console.log(results.meta);
      },
    skipEmptyLines: true,
    });
  }
});