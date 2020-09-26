import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Reward from '../models/Reward';
import {returnStringFromNumber} from '../tools/vanilla/number-string';

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
      
    
    console.log(`Reward ${objReward._id} has benn saved successfully!`);
     
  } catch (error) {
    console.error(error);
  }
  
};


/*
  {
		_id: uuidv4(), author: 'Jeyon',
	  type: 'gif',  link: 'https://storage.avantwing.com/gifs/jia/love-cute-character/01.gif',
	  //text: '',
	  tags: ['love', 'cute', 'character']
	}	
*/


const returnListReward = (number, author, type, linkBasic, tags) =>{
  
  let listReward = [];
  for (var iReward=0; iReward<number; iReward++){
    
    console.log(iReward)
    const link = `${linkBasic}/${returnStringFromNumber(iReward+1,2)}.${type}`;
    
    const obj = {
      _id: uuidv4(),
      author: author,
      type: type,
      link: link,
      tags: ['love', 'cute', 'character']
    }
    
    listReward.push(obj);
    
    console.log(listReward)
  }
  
  return (listReward);
}


const addListReward = async() => {
  
  const listReward = returnListReward( 16, 'Jeyon', 'gif', 'https://storage.avantwing.com/gifs/jia/love-cute-character', ['love', 'cute', 'character'] );
  
  
  for ( const objReward of listReward ){
    await addReward(objReward);
    //console.log(objReward);
  }
  console.log('all rewards have been saved');
}



addListReward();