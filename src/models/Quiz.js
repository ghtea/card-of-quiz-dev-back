const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var schemaScore = new Schema({
  _id: String, 
  idUser: String, // Jia
  solved: Boolean,
  score: Number,
  updated: Date
});


/*
author: 'Jeyon', subject: 'Korean', symbol: 'Heart',
	  
		question: {
      instruction: ['Translate into Korean'],
      content: ['Good Night']
    },
    answer: { 
      kind: 'text', 
      
      text: {
        content: '잘자',
        hint: 'ㅈㅈ'
      }
      
      explanation: ['잘: well, 자: sleep']
      link: ['https://translate.google.co.kr/#view=home&op=translate&sl=auto&tl=en&text=%EC%9E%98%EC%9E%90']
    },  
    
    tagsReward:  ['love', 'cute', 'character'] 
*/

const schemaQuiz = new Schema({
  
  _id: String,
  
  author: String,
  //source: String,
  
  subject: String,   // Korean
  symbol: String,   // Star
  
  question: {
    instruction: [String],
    content: [String]
  },
  
  answer: {
    kind: String,   // text, choice
    text: {
      content: String,
      hint: String
    },
    explanation: [String],
    link: [String]
  },
  
  tagsReward: { type: [String], default: []},
  
  listScore: { type: [schemaScore], default: []},
  created: Date,
  updated: Date
  
}, { collection: 'Quiz_', versionKey: false, strict: false});



module.exports = mongoose.model('Quiz', schemaQuiz);



/*

reward: {
  appointed: [String],
  
  ready: { type: Boolean, default: false}, // for redux (in device)
  loading: { type: Boolean, default: false}, // for redux (in device)
  
  showing: { type: Boolean, default: false} // for redux (in device)
},

listScore: [ schemaScore ],

status : { // for redux, in device
  solved: { type: Boolean, default: false}, 
  rotation: { type: Number, default: 0}
},  
  

*/