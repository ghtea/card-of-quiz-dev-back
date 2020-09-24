const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schemaColorSeries = new Schema({
  _id: String,
  
  white: [Number],
  '10': [Number],
  '20': [Number],
  '30': [Number],
  '40': [Number],
  '50': [Number],
  '60': [Number],
  '70': [Number],
  '80': [Number],
  '90': [Number],
  '100': [Number],
  black: [Number]
});


const schemaColorTable = new Schema({
  
  _id: String,
  title: String,
  
  author: String,
  source: String,
  tags: [String],
  
  table: [schemaColorSeries],  
    
  created: Date,
  updated: Date
  
}, { collection: 'ColorTable_', versionKey: false, strict: false});



module.exports = mongoose.model('ColorTable', schemaColorTable);