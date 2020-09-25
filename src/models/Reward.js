const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schemaReward = new Schema({
  
  _id: String,
  
  author: String,
  source: String,
  
  type: String,   // img, gif, text, ...
  
  link: String,
  text: String,
  
  tags: [String]
  
}, { collection: 'Reward_', versionKey: false, strict: false});



module.exports = mongoose.model('Reward', schemaReward);