import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import ColorAssignment from '../models/ColorAssignment';
import IbmColorTable from './addColorAssignment/Ibm';



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




const addColorAssignment = async () => {
  
  const date = Date.now();
  
  try {
    
    const objColorAssignment = {
      
    	_id: uuidv4()
    	, title: "test"
    	
      , author: "mbcat"
      , source: 'IBM'
      , tags: ['IBM']
      
      , assignment: {
    
        // ex: [ [10,10,10], [10,10,10], [10,10,10], ...   ] 총 9개
        basic: IbmColorTable['Cool Gray']
          
        , main: IbmColorTable['Teal']
        , sub1: IbmColorTable['Cool Gray']
        , sub2: IbmColorTable['Cool Gray']
        , sub3: IbmColorTable['Cool Gray']
        
        , success: IbmColorTable['Blue']
        , failure: IbmColorTable['Red']
        , warning: IbmColorTable['Purple']
        , info: IbmColorTable['Cyan']
      }
      
    }
    
    const mongoColorAssignment = new ColorAssignment(objColorAssignment);
    
    await mongoColorAssignment.save();
      
    
    console.log("A ColorAssignment has benn saved successfully!");
     
  } catch (error) {
    console.error(error);
  }
  
};
    



addColorAssignment();