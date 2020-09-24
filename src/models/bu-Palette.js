const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// https://www.npmjs.com/package/uuid

// https://velog.io/@hoi/Styled-components-ThemeProvider%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%8A%A4%ED%83%80%EC%9D%BC-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95
// https://dev.to/aromanarguello/how-to-use-themes-in-styled-components-49h

var schemaPaletteColor = new Schema({
  _id: String
  
  
  , basic: {
    
      strong3: [Number]
    , strong2: [Number]
    , strong1: [Number]
    
    , normal: [Number]
    
    , weak1: [Number]
    , weak2: [Number]
    , weak3: [Number]
    
  }
  
  
  , background: {
    
    front3: [Number]
    , front2: [Number]
    , front1: [Number]
    
    , normal: [Number]
    
    , back1: [Number]
    , back2: [Number]
    , back3: [Number]
  }
  
});



var schemaPalette = new Schema({
  
  _id: String
  , author: String
  , title: String
  
  
  , color: {
    basic: schemaPaletteColor
      
    , active: schemaPaletteColor
      
    , success: schemaPaletteColor
    , failure: schemaPaletteColor
    , warning: schemaPaletteColor
    , info: schemaPaletteColor
      
    , sub: schemaPaletteColor
  }

    
  , created: Date
  , updated: Date
  
}, { collection: 'Palette_', versionKey: false, strict: false});



module.exports = mongoose.model('Palette', schemaPalette);