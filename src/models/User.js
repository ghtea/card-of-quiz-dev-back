const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const dotenv = require('dotenv');

const { generateToken } = require('../works/auth/token');


const hash = (password) => {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

/*

const schemaRegionMmr = new Schema({
  _id: { type: String, default: uuidv4() }
  , mmr: Number   
  , tier: String  
  , games: Number
});

const schemaMmr = new Schema({
  _id: { type: String, default: uuidv4() }
  , NA: schemaRegionMmr   // mmr of region which have more than 100 games
  , EU: schemaRegionMmr   
  , KR: schemaRegionMmr  
  , CN: schemaRegionMmr   
  
  , orderMainRegion: [String]  // only regions which have more than 100 games, sorting 'more games - more front'
});

*/

const User = new Schema({
	
  //username: String
  _id: String
  , type: { type: String, default: "normal" } 
  
  , email: { type: String }
  , passwordHashed: String // 비밀번호를 해싱해서 저장합니다
  
  , battletagPending: String
  , battletagConfirmed: String
  , whenBattletagPendingAdded: Date
  
  //, mmr: schemaMmr
  //, updatedMmr: Date
  
  
  
  , joined: { type: Date, default: Date.now }
  , accessed: { type: Date, default: Date.now }

  
  , profile: {
    listIdPalette: { type: [String] , default: ['Default'] }
    // hero, universe 등을 표현하는 두가지 색상 컬러  // 맨 앞의 것이 현재 설정한 것
    , listIdShape: { type: [String] , default: ['Default'] }
    , listIdBadge: { type: [String] , default: ['Default'] }
  }
  
  
    
}, { collection: 'User_', versionKey: false, strict: false} );


/*
, works: {
    listIdPlanTeam: [String]
    , listIdComp: [String]
    , listIdComment: [String]
    , listIdVideo: [String] // for Comp-Gallery, Guide (talent, ...)
  }
  
  , likes: {
    listIdComp: [String]
    , listIdComment: [String]
    , listIdVideo: [String] // for Comp-Gallery, Guide (talent, ...)
  }
    */

/*
User.statics.findByUsername = function(username) {
    // 객체에 내장되어있는 값을 사용 할 때는 객체명.키 이런식으로 쿼리하면 됩니다
    return this.findOne({'username': username}).exec();
};
*/
/*
User.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

User.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};
*/
/*
User.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다
        $or: [
            { 'username': username },
            { email }
        ]
    }).exec();
};
*/

//username, email, password
// this 를 사용하려면 화살표 함수는 X 인듯?
User.statics.register = async function ( payload ) {
  // 데이터를 생성 할 때는 new this() 를 사용합니다.
  
  const mongoUser = new this({
      _id: payload._id
      , type: "normal"
    
      , email: payload.email
      , passwordHashed: hash(payload.password)
      
      , battletagPending: payload.battletagPending
      , whenBattletagPendingAdded: Date.now()
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