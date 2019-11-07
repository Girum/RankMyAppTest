const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AlertsSchema = new Schema({

        searchPhrase: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        updateTime: {
            type: String,
            required: true
        }        
    
});

module.exports = mongoose.model('Alerts', AlertsSchema);