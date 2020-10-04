import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

// 아래 필수!
dotenv.config({ 
  path: './.env' 
});

const secretJwt = process.env.SECRET_JWT;


// https://backend-intro.vlpt.us/4/01.html

/**
 * JWT 토큰 생성
 * @param {any} payload 
 * @returns {string} token
 */
function generateToken(payload) {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                payload,
                secretJwt,
                {
                    expiresIn: '7d'
                }, (error, token) => {
                    if(error) reject(error);
                    resolve(token);
                }
            );
        }
    );
};
exports.generateToken = generateToken;



//
function decodeToken(token) {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, secretJwt, (error, decoded) => {
                if(error) reject(error);
                resolve(decoded);
            });
        }
    );
}



exports.jwtMiddleware = async (req, res, next) => {
    console.log("hi, i'm jwtMiddleware");
    const token = req.cookies.access_token;//  access_token 을 읽어옵니다
    console.log(token);
    
    if(!token) return next(); // 토큰이 없으면 바로 다음 작업을 진행합니다.

    try {
      const decoded = await decodeToken(token); // 토큰을 디코딩 합니다

      // 토큰 만료일이 하루밖에 안남으면 토큰을 재발급합니다
      if(Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
        // 하루가 지나면 갱신해준다.
        const { _id, email } = decoded;
        
        const freshToken = await generateToken({ _id, email}, 'User');
        
        req.cookie('access_token', freshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
          httpOnly: true
        });
      }
        
    console.log("token has been confirmed")
      // ctx.request.user 에 디코딩된 값을 넣어줍니다
      req.tokenUser = decoded;
    } catch (e) {
        // token validate 실패
        req.tokenUser = null;
    }

    return next();
};