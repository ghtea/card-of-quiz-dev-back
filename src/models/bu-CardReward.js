const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schemaCardReward = new Schema({
  
  _id: String,
  
  author: String,
  //source: String,
  
  // subject: String,   // Love
  // symbol: String,   // Heart
  //number: Number,   // 1,2,3,4,5,...
  
  reward: {
    kind: String,   // img, gif, text, ...
    
    link: String,
    text: String,
  
    tags: [String]  // (whatever) character, cute
  },
  
  created: Date,
  updated: Date
  
}, { collection: 'CardReward_', versionKey: false, strict: false});



module.exports = mongoose.model('CardReward', schemaCardReward);