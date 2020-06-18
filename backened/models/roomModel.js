const mongoose = require('../connection');
const Schema = mongoose.Schema;

const schema = new Schema({
    name : String,
    admin : {type : mongoose.Types.ObjectId, ref : 'Users'},
    password : String,
    created : Date,
    private : Boolean,
    members : [{type : mongoose.Types.ObjectId, ref : 'Users'}]
})

const model = mongoose.model('Rooms', schema);
module.exports = model;