import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Quiz from '../models/Quiz';
import listPartQuiz from './addListQuiz/listPartQuiz';


dotenv.config({ 
  path: './.env' 
});



// mongo db 와 연결
mongoose
.connect(process.env.DB_URL, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});


/*

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
  },
  
  created: Date,
  updated: Date

*/

const addQuiz = async (partQuiz) => {
  
  const date = Date.now();
  
  try {
    
    const objQuiz = {
      
      _id: uuidv4(),
  
      //number: number,   // 1,2,3,4,5,...
      
      ...partQuiz,
      
      listScore: [],
      
      created: date,
      updated: date
    }
    
    const mongoQuiz = new Quiz(objQuiz);
    
    await mongoQuiz.save();
      
    
    console.log(`Quiz ${objQuiz._id} has benn saved successfully!`);
     
  } catch (error) {
    console.error(error);
  }
  
};
    

const addListQuiz = async () => {
  for (var i = 0; i < listPartQuiz.length; i++){
    const partQuiz = listPartQuiz[i];
    //const number = i + 1;
    
    await addQuiz(partQuiz);
  }
}


addListQuiz();