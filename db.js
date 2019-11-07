const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://rankmyappuser:rankmyappuser@iotgio-rubq3.mongodb.net/rankmyapptest?retryWrites=true'
const mongoDB =  dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true } );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:  '));

module.exports = mongoose;