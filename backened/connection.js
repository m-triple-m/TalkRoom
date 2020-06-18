const mongoose = require('mongoose')
const connection_url = 'mongodb://localhost:27017/talkroom'

mongoose.connect(connection_url, {useNewUrlParser : true, useUnifiedTopology : true})
.then(() => {
    console.log('database successfully connected!!');
})
.catch((err) => {
    console.error(err);
})

module.exports = mongoose;