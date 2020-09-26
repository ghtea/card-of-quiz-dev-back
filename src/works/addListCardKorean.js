import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Card from '../models/Card';
import listPartCardKorean from './addListCardKorean/listPartCardKorean';


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

const addCardKorean = async (partCardKorean, number) => {
  
  const date = Date.now();
  
  try {
    
    const objCard = {
      
      _id: uuidv4(),
  
      author: 'Jeyon',
      
      subject: 'Korean',   // Korean
      symbol: 'heart',   // Star
      number: number,   // 1,2,3,4,5,...
      
      ...partCardKorean,
      
      created: date,
      updated: date
    }
    
    const mongoCard = new Card(objCard);
    
    await mongoCard.save();
      
    
    console.log(`Card ${objCard._id} has benn saved successfully!`);
     
  } catch (error) {
    console.error(error);
  }
  
};
    

const addListCardKorean = async () => {
  for (var i = 0; i < listPartCardKorean.length; i++){
    const partCardKorean = listPartCardKorean[i];
    const number = i + 1;
    
    await addCardKorean(partCardKorean, number);
  }
}


addListCardKorean();