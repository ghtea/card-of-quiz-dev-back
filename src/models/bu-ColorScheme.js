const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schemaColorRow = new Schema({
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



var schemaColorScheme = new Schema({
  
  _id: String
  , author: String
  , title: String
  
  
  , color: {
    // ex: [ [10,10,10], [10,10,10], [10,10,10], ...   ] 총 9개
    basic: schemaColorRow
      
    , main: schemaColorRow
    , sub1: schemaColorRow
    , sub2: schemaColorRow
    , sub3: schemaColorRow
    
    , success: schemaColorRow
    , failure: schemaColorRow
    , warning: schemaColorRow
    , info: schemaColorRow
  }
    
  , created: Date
  , updated: Date
  
}, { collection: 'ColorScheme_', versionKey: false, strict: false});



module.exports = mongoose.model('ColorScheme', schemaColorScheme);