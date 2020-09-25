const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const schemaCard = new Schema({
  
  _id: String,
  
  author: String,
  source: String,
  
  
  subject: String,   // Korean
  symbol: String,   // Star
  number: Number,   // 1,2,3,4,5,...
  
  quiz: {
    instruction: [String],
    text: [String],
    hint: [String],
    answer: String
  },
  
  reward: {
    appointed: Boolean,
    _id: String,
    number: Number,
    tags: [String]
  }
  
  created: Date,
  updated: Date
  
}, { collection: 'Card_', versionKey: false, strict: false});



module.exports = mongoose.model('Card', schemaCard);