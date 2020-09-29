const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schemaReward = new Schema({
  
  _id: String,
  
  author: String,
  //source: String,
  
  // subject: String,   // Love
  // symbol: String,   // Heart
  //number: Number,   // 1,2,3,4,5,...
  
  kind: String,   // img, gif, text, youtube, twitch, ...
  link: String,   // url of img, gif, video
  text: String,

  tags: [String],  // (whatever) character, cute
  
  created: Date,
  updated: Date
  
}, { collection: 'Reward_', versionKey: false, strict: false});



module.exports = mongoose.model('Reward', schemaReward);