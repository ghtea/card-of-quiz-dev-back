import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import CardReward from '../models/CardReward';
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




const addCardReward = async (obj) => {
  
  const date = Date.now();
  
  try {
    
    const objNew = {
      
      ...obj,
      
      created: date,
      updated: date
    };
    
    const mongoCardReward = new CardReward(objNew);
    
    await mongoCardReward.save();
      
    
    console.log(`CardReward ${obj._id} has benn saved successfully!`);
     
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


const returnListCardReward = ({
  numberAll, author, kind, symbol, linkBasic, tags
}) =>{
  
  let listCardReward = [];
  for (var iCardReward=0; iCardReward<numberAll; iCardReward++){
    
    console.log(iCardReward)
    const link = `${linkBasic}/${returnStringFromNumber(iCardReward+1,2)}.${kind}`;
    
    const obj = {
      _id: uuidv4(),
      author: author,
      
      symbol: symbol,   // Heart
      number: iCardReward+1,   // 1,2,3,4,5,...
      
      reward: {
        kind: kind,   // img, gif, text, ...
        
        link: link,
        //text: String,
      
        tags: tags  // (whatever) character, cute
      },
      
      created: Date,
      updated: Date
    }
    
    listCardReward.push(obj);
    
    //console.log(listCardReward)
  }
  
  return (listCardReward);
}


const addListCardReward = async() => {
  
  try {
    const obj ={
      numberAll: 16,
      author: 'Jeyon',
      kind: 'gif',
      symbol: 'Heart',
      linkBasic: 'https://storage.avantwing.com/gifs/jia/love-cute-character',
      tags: ['love', 'cute', 'character']
    };
    
    const listCardReward = returnListCardReward( obj );
    
    
    for ( const objCardReward of listCardReward ){
      await addCardReward(objCardReward);
      //console.log(objCardReward);
    }
    console.log('all CardRewards have been saved');
    
  } catch(error) {console.error(error);}
}


addListCardReward();