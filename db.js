const mongoose = require('mongoose');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;

let db_url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

const mongoDB =  db_url;
try{
    mongoose.connect(mongoDB, 
        { useNewUrlParser: true, 
            useFindAndModify: false, 
            useUnifiedTopology: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500, 
            connectTimeoutMS: 10000 } ).then( function() {
                console.log('MongoDB connected!');
            });
} catch (err) {
    console.log(err);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:  '));

module.exports = mongoose;