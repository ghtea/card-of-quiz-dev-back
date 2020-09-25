import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Reward from '../models/Reward';


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




const addReward = async (reward) => {
  
  const date = Date.now();
  
  try {
    
    const objReward = {
      _id: uuidv4(),
      ...reward
    }
    
    const mongoReward = new Reward(objReward);
    
    await mongoReward.save();
      
    
    console.log(`Reward ${_id} has benn saved successfully!`);
     
  } catch (error) {
    console.error(error);
  }
  
};









addReward();