const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const dotenv = require('dotenv');

const { generateToken } = require('../works/auth/token');


const hash = (password) => {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}



const User = new Schema({
	
  //username: String
  _id: String,
  type: { type: String, default: "normal" },
  
  email: { type: String },
  passwordHashed: String, // 비밀번호를 해싱해서 저장합니다
  
  twitter: String,
  google: String,
  
  joined: { type: Date, default: Date.now },
  accessed: { type: Date, default: Date.now },

  listSubject: [String],
  listSymbol: [String]
    
}, { collection: 'User_', versionKey: false, strict: false} );


//username, email, password
// this 를 사용하려면 화살표 함수는 X 인듯?
User.statics.register = async function ( obj ) {
  // 데이터를 생성 할 때는 new this() 를 사용합니다.
  
  const passwordHashed = hash(obj.password);
  delete obj.password;
  
  const mongoUser = new this({
    ...obj
    , passwordHashed: passwordHashed
  });
    return mongoUser.save();  //약간 의문이 들지만 우선 다음에 살펴보자
};


User.methods.validatePassword = function(passwordTrying) {
    // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const passwordTryingHashed = hash(passwordTrying);
    return this.passwordHashed === passwordTryingHashed;
};



User.methods.generateToken = function() {
  
    // JWT 에 담을 내용
    const payload = {
      _id: this._id,
      email: this.email
    };

    return generateToken(payload, 'User');  // 'User' 는 그냥 구분용으로 ?
};





module.exports = mongoose.model('User', User);