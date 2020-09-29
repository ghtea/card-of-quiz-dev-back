const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var schemaScore = new Schema({
  _id: String, 
  idUser: String, // Jia
  solved: Boolean,
  score: Number,
  updated: Date
});


const schemaCardQuiz = new Schema({
  
  _id: String,
  
  author: String,
  //source: String,
  
  
  subject: String,   // Korean
  symbol: String,   // Star
  //level: String
  //number: Number,   // 1,2,3,4,5,...
  
  quiz: {
    instruction: [String],
    text: [String],
    hint: [String]
  },
  
  answer: {
    kind: String,   // text, choice
    text: {
      valueCorrect: String,
      valueTrying: { type: String, default: ""},
      placeholder: String
    }
  },
      
  reward: {
    appointed: [String],
    
    ready: { type: Boolean, default: false}, // for redux (in device)
    loading: { type: Boolean, default: false}, // for redux (in device)
    
    showing: { type: Boolean, default: false} // for redux (in device)
  },
  
  listScore: [ schemaScore ],
  solved: { type: Boolean, default: false}, // for redux (in device)
  
  
  created: Date,
  updated: Date
  
}, { collection: 'CardQuiz_', versionKey: false, strict: false});



module.exports = mongoose.model('CardQuiz', schemaCardQuiz);