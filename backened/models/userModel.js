const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name : String,
    username : String,
    password : String,
    created : Date,
    email : String
})

const model = mongoose.model('Users', schema);
module.exports = model;