const mongoose = require('../database/mongodb');
const { v4:uuidv4 } = require('uuid');

const Heros = new mongoose.Schema({
   _id: { type:String,  default:uuidv4 },
   name: { type:String, required:true, lowercase:true },
   power: { type:String, lowercase:true }
});


const Hero = mongoose.model('heros', Heros);

module.exports = Hero;