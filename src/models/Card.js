const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schemaQuiz = new Schema({
  _id: String,
  
  instruction: [String],
  text: [String],
  
  answer: [String]
  
});


const schemaReward = new Schema({
  _id: String,
  
  type: String,
  
  link: String,
  text: String
  
});



const schemaCard = new Schema({
  
  _id: String,
  
  author: String,
  source: String,
  
  symbol: String,
  number: Number,
  
  quiz: schemaQuiz,
  reward: [schemaReward],
  
  created: Date,
  updated: Date
  
}, { collection: 'Card_', versionKey: false, strict: false});



module.exports = mongoose.model('Card', schemaCard);