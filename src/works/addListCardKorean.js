import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Card from '../models/Card';


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




const addCard = async () => {
  
  const date = Date.now();
  
  try {
    
    const objCard = {
      
      _id: uuidv4(),
        
      author: 'Jeyon',
      
      symbol: "",
      number: 1,
      
      quiz: schemaQuiz,
      reward: [schemaReward],
      
      created: date,
      updated: date
    }
    
    const mongoCard = new Card(objCard);
    
    await mongoCard.save();
      
    
    console.log(`Card ${_id} has benn saved successfully!`);
     
  } catch (error) {
    console.error(error);
  }
  
};
    

addCard();