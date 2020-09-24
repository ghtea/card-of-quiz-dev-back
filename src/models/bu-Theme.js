const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// https://www.npmjs.com/package/uuid

// https://velog.io/@hoi/Styled-components-ThemeProvider%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%8A%A4%ED%83%80%EC%9D%BC-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95
// https://dev.to/aromanarguello/how-to-use-themes-in-styled-components-49h

var schemaThemeColor = new Schema({
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



var schemaTheme = new Schema({
  
  _id: String
  , author: String
  
  , title: String
  
  
  , color: {
    
    
  }
  
  
  , media: {
    // 360 ~ ( min-width를 360으로 잡는다)
    
    // mobile(normal): 360~576           default (mobile first)
    // mobile(horizon): 576~768          @media (min-width: 576px)
    
    // tablet(vertical): 768~992         @media (min-width: 768px)
    // tablet(horison) or monitor: 992~  @media (min-width: 992px)
    
    sm: { type: Number, default: 576 } 
    , md: { type: Number, default: 768 } 
    , lg: { type: Number, default: 992 } 
    , xl: { type: Number, default: 1200 }  // 참고로만, 아직 이용할 생각 X
    // 360, 740 (768), 1000
  }
  
  
  //, listUserGood: { type: [String], default: [] }
  //, listUserBad: { type: [String], default: [] }
  
  , created: Date
  , updated: Date
  
}, { collection: 'Theme_', versionKey: false, strict: false});



module.exports = mongoose.model('Theme', schemaTheme);