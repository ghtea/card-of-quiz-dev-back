import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import User from '../../models/User';

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



const singUp = async (obj) => {
  
  try {
    
    // req = { ..., body ={ email, _id, password}}

    // email 중복 체크
    let existingEmail = null;
    try {
      existingEmail = await User.findOne({email: obj.email}).exec(); 
    } catch (error) {
      console.log(error);
      return; 
    }

    if(existingEmail) {
    // 중복되는 이메일이 있을 경우
      console.log("duplicate email") 
      return; 
    }

    
    // 계정 생성
    let mongoUser = null;
    try {
      mongoUser = await User.register( obj );   
      console.log(`User ${obj._id} has been signed up!`);
      return;
    } catch (error) {
      console.log(error);
      return;
    }

  } catch(error) { console.log(error) }
  
};



// data

const objJia = {
  _id: 'Jia',
  email: 'Jia',
  password: 'Jeyon',
  
  listSubject: ['Korean'],
  listSymbol: ['Heart']
}

const objJeyon = {
  _id: 'Jeyon',
  email: 'Jeyon',
  password: 'Jia',
  
  listSubject: ['Korean'],
  listSymbol: ['Heart']
}

const objGuest = {
  _id: 'guest',
  email: 'guest',
  password: 'guest',
  
  listSubject: [  ],
  listSymbol: [  ]
}


const signUpAll = async () => {
  await singUp(objJia);
  await singUp(objJeyon);
  await singUp(objGuest);
};

signUpAll();


