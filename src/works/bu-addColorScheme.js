import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import ColorScheme from '../models/ColorScheme';
import IbmColorTable from './addColorScheme/Ibm';



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




const addColorScheme = async () => {
  
  const date = Date.now();
  
  try {
    
    const objColorScheme = {
      
    	_id: uuidv4()
    	
      , author: "mbcat"
      , title: "test"
      
      , color: {
    
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
    
    const mongoColorScheme = new ColorScheme(objColorScheme);
    
    await mongoColorScheme.save();
      
    
    console.log("A ColorScheme has benn saved successfully!");
     
  } catch (error) {
    console.error(error);
  }
  
};
    



addColorScheme();