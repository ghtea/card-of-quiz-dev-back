import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';


//const { jwtMiddleware } = require('./works/auth/token');

//const Comp = require('./models/Comp');

//const { generateToken, checkToken } = require('./works/auth/token');

dotenv.config({ 
  path: './.env' 
});

const app = express();

// https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275
app.use(cors({
  origin: true,
  credentials: true
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/auth', require('./routes/auth'));
app.use('/quiz', require('./routes/quiz'));
app.use('/reward', require('./routes/reward'));
//app.use('/auth-local', require('./routes/auth-local'));
//app.use('/auth-bnet', require('./routes/auth-bnet'));


mongoose
.connect(process.env.DB_URL, {
useUnifiedTopology: true,
useNewUrlParser: true,
useFindAndModify: false
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});



const port = parseInt(process.env.PORT);
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

