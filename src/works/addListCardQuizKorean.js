import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import CardQuiz from '../models/CardQuiz';
import listPartCardQuizKorean from './addListCardQuizKorean/listPartCardQuizKorean';


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

const addCardQuizKorean = async (partCardQuizKorean, number) => {
  
  const date = Date.now();
  
  try {
    
    const objCardQuiz = {
      
      _id: uuidv4(),
  
      author: 'Jeyon',
      
      subject: 'Korean',   // Korean
      symbol: 'Heart',   // Star
      number: number,   // 1,2,3,4,5,...
      
      ...partCardQuizKorean,
      
      created: date,
      updated: date
    }
    
    const mongoCardQuiz = new CardQuiz(objCardQuiz);
    
    await mongoCardQuiz.save();
      
    
    console.log(`CardQuiz ${objCardQuiz._id} has benn saved successfully!`);
     
  } catch (error) {
    console.error(error);
  }
  
};
    

const addListCardQuizKorean = async () => {
  for (var i = 0; i < listPartCardQuizKorean.length; i++){
    const partCardQuizKorean = listPartCardQuizKorean[i];
    const number = i + 1;
    
    await addCardQuizKorean(partCardQuizKorean, number);
  }
}


addListCardQuizKorean();