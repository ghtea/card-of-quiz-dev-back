import express from 'express';
//import Joi from 'joi';
import crypto from 'crypto';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import querystring from 'querystring';
import User from '../models/User';

import { generateToken, jwtMiddleware } from '../works/auth/token';

var router = express.Router();

// 의존한 강의 https://backend-intro.vlpt.us/5/01.html

router.use(jwtMiddleware);


const hash = (password) => {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}


// https://devlog-h.tistory.com/13  koa vs express
router.post('/sign-up', async (req, res, next) => {
  
  try {
    
    // req = { ..., body ={ email, _id, password}}

    // email 중복 체크
    let existingEmail = null;
    try {
      existingEmail = await User.findOne({email: req.body.email}).exec(); 
    } catch (error) {
      console.log(error);
      res.status(500).send() // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
    }

    if(existingEmail) {
    // 중복되는 이메일이 있을 경우
      console.log("duplicate email") 
      res.status(403).send("duplicate email");
      // 클라이언트에서 자세한 정보를 듣고 이용하기 위해 status 코드보다는 그냥 상황 정보를 보낸다... 내 실력을 고려한 결과...
      return; 
      
      // https://backend-intro.vlpt.us/3/04.html
      // https://velog.io/@kim-macbook/Cannot-set-headers-after-they-are-sent-to-the-client
    }

    
    // 계정 생성
    let mongoUser = null;
    try {
      mongoUser = await User.register(req.body);   
    } catch (error) {
      console.log(error);
      res.status(500).send() // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }


    let token = null;
    try {
      token = await mongoUser.generateToken(); 
    } catch (error) {
      console.log(error);
      res.status(500).send(error);  // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    
    // 여기까지 에러가 없었으면 성공적으로 아래와 같이 실행!
    
    res.cookie('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7}); // cookie 에 토큰 보내주기  // 참고로 아마 브라우져에서 확인할 수 없으니 노력 no
    res.json(
      {
        _id: mongoUser._id
        , email: mongoUser.email
      }
    ); // 유저 정보로 응답합니다.
    //console.log(res)

  } catch(error) { next(error) }
  
});






router.post('/log-in', async (req, res, next) => {
  
  try {
    
    const { identification, password } = req.body; 
    
    
    let foundUser = null;
    try {
      // 이메일로 계정 찾기
      foundUser = await User.findOne({ email: identification }).exec();
    } catch (error) {
      console.log(error);
      res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    if(!foundUser) {
    // 이메일로 부터 해당 유저가 존재하지 않으면, 아이디로 이용해본다!
    
      try {
        // 아이디로 계정 찾기
        foundUser = await User.findOne({ _id: identification }).exec();
      } catch (error) {
        console.log(error);
        res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
        return;
      }
    
      if(!foundUser) {
        res.status(403).send("There is no user with this email or id");
        return;
      } 
      
      else if(!foundUser.validatePassword(password)) {
      // 아이디로 찾았지만, 비밀번호가 일치하지 않으면
        res.status(403).send("There is a user with this id, but password is wrong");
        return;
      }
      // 배틀태그 confirmed로 찾았고, 비번 검증까지 통과한 경우가 살아서 남아있다
    } // if (!foundUser)
    else if(!foundUser.validatePassword(password)) {
    // 이메일로 찾았지만, 비밀번호가 일치하지 않으면
      res.status(403).send("There is a user with this email, but password is wrong");
      return;
    }
    

    let token = null;
    try {
      token = await foundUser.generateToken();
      
      console.log("following is generated token")
      console.log(token);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);  // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    // 평범하게 assign 할때는 foundUser.키명 으로 되지만 아래처럼 이용할때는 _doc 써야하는 듯...
    let resUser = Object.assign({}, foundUser._doc);
    delete resUser.passwordHashed;   // 비번 정보는 제외하고 제공
    
    //console.log(token)
    res.cookie('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }); 
    // cookie 브라우저가 설정하려면 별도의 추가 설정 필요
    // https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275
    res.json(resUser); // 유저 정보로 응답합니다.
    //console.log(res)

    
  } catch(error) { next(error) }
  
});


router.post('/log-out', async (req, res, next) => {
  
  try {
    
    res.cookie('access_token', null, {
        maxAge: 0, 
        httpOnly: true
    });
    
    res.status(204).send("log out")
    
  } catch(error) { next(error) }
  
});


// 
router.get('/check', async (req, res, next) => {
  
  // 여기서 jwt 미들웨어가 중간에 일해주고, req에 tokenUser 을 끼워준다
  // tokenUser 란 token 으로 부터 알게된 유저 정보
  
  try {
    
    //console.log("hello, I'm check")
    //console.log(req);
    
    const { tokenUser } = req;
    
    
    if(!tokenUser) {
      console.log("there is no tUser")
      res.status(403).send("there is no valid token"); // forbidden
      return;
    }
    
    
    let foundUser = null;
    try {
      // 이메일로 계정 찾기
      foundUser = await User.findOne({ email: tokenUser.email }).exec();
    } catch (error) {
      console.log(error);
      res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    if(!foundUser) {
    // 해당 유저가 존재하지 않으면
      res.status(403).send("There is no user with this email");
      return;
    }
    
    // 평범하게 assign 할때는 foundUser.키명 으로 되지만 아래처럼 이용할때는 _doc 써야하는 듯...
    let resUser = Object.assign({}, foundUser._doc);
    delete resUser.passwordHashed;
    
    res.json(resUser); // 유저 정보로 응답합니다.
    
  } catch(error) { next(error) }
  
});







router.put('/change-password', async (req, res, next) => {
  
  try {
    
    const { _id, passwordCurrent, passwordNew } = req.body; 
    
    
    let foundUser = null;
    try {
      // id로 계정 찾기
      foundUser = await User.findOne({ _id: _id }).exec();
    } catch (error) {
      console.log(error);
      res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    if(!foundUser) {
  
      res.json({code_situation: "aloca201"});
      //res.status(403).send("no user by this id")
      return;
    }
    
    else if(!foundUser.validatePassword(passwordCurrent)) {
    
      res.json({code_situation: "aloca202"});
      //res.status(403).send("wrong password")
      return;
    }
    
    else { // 유저를 찾았고, 비번도 맞을 때
      
      const filter = {_id: _id};
      const update = {passwordHashed: hash(passwordNew)};
      
      try {
        await User.updateOne(filter, update);
        console.log("successfully changed user's password");
        
        // 아래와 같이해도 로그아웃이 안되네..
        res.cookie('access_token', null, {
          maxAge: 0, 
          httpOnly: true
        });
        
        res.status(200).send("changed password")
        return;
        
      } 
      catch (error) {
        console.log(error);
        res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
        return;
      }
      
    }
      
    
  } catch(error) { next(error) }
  
});




module.exports = router;









