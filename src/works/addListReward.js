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




const addReward = async (obj) => {
  
  const date = Date.now();
  
  try {
    
    const mongoReward = new Reward(obj);
    
    await mongoReward.save();
      
    
    console.log(`Reward ${obj._id} has benn saved successfully!`);
     
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


const returnListReward = ({
  numberAll, author, kind, symbol, linkBasic, tags
}) =>{
  
  let listReward = [];
  for (var iReward=0; iReward<numberAll; iReward++){
    
    console.log(iReward)
    const link = `${linkBasic}/${returnStringFromNumber(iReward+1,2)}.${kind}`;
    
    const date = Date.now();
    
    const obj = {
      _id: uuidv4(),
      author: author,
      
      kind: kind,   // img, gif, text, ...
      link: link,
      //text: String,
    
      tags: tags,  // (whatever) character, cute
      
      created: date,
      updated: date
    }
    
    listReward.push(obj);
    
    //console.log(listReward)
  }
  
  return (listReward);
}


const addListReward = async() => {
  
  try {
    const obj ={
      numberAll: 16,
      author: 'Jeyon',
      kind: 'gif',
      symbol: 'Heart',
      linkBasic: 'https://storage.avantwing.com/gifs/jia/love-cute-character',
      tags: ['love', 'cute', 'character']
    };
    
    const listReward = returnListReward( obj );
    
    
    for ( const objReward of listReward ){
      await addReward(objReward);
      //console.log(objReward);
    }
    console.log('all Rewards have been saved');
    
  } catch(error) {console.error(error);}
}


addListReward();