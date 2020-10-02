//import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
//import { v4 as uuidv4 } from 'uuid';

dotenv.config({ 
  path: './.env' 
});


const bodyReqJia = {
  _id: 'Jia',
  email: '',
  password: 'Jeyon'
}

const bodyReqJeyon = {
  _id: 'Jeyon',
  email: '',
  password: 'Jia'
}

const bodyReqJeyon = {
  _id: 'guest',
  email: '',
  password: 'guest'
}



const signUp = async(bodyReq) => {
  
  try {
    const res = await axios.post(`${process.env.URL_BACK}/auth/sign-up`, bodyReq);
  }
  catch(error) {
    console.log(error)  
  }
  
}


signUp(bodyReqJia);
signUp(bodyReqJeyon);
signUp(bodyReqJeyon);