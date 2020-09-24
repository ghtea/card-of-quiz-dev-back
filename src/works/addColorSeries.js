import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import ColorSeries from '../models/ColorSeries';
import listColorSeriesIbm from './addColorSeries/listColorSeriesIbm';



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




const addColorSeries = async (colorSeries) => {
  
  const date = Date.now();
  
  try {
    
    const objColorSeries = {
      
      ...colorSeries,
      
      created: date,
      updated: date
      
      
    }
    
    const mongoColorSeries = new ColorSeries(objColorSeries);
    
    await mongoColorSeries.save();
      
    
    console.log(`${colorSeries.title} has benn saved successfully!`);
     
  } catch (error) {
    console.error(error);
  }
  
};


const addListColorSeriesIbm = async () => {
  
  // 동시진행
  for (let i = 0; i < listColorSeriesIbm.length; i++) {
    await addColorSeries(listColorSeriesIbm[i]);
  }
  
}



addListColorSeriesIbm();