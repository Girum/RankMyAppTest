const express = require('express');
const bodyParser = require('body-parser');

const searchForAlertsAndSendEmail = require('./searchForAlertsAndSendEmail');

/*
Function to return time and test the sendTime
function returnTime(){
let date_ob = new Date();
let Hour = date_ob.getHours();
let Minute = date_ob.getMinutes();
let Second = date_ob.getSeconds();
console.log("Hora: " + String(Hour) + ":" + String(Minute) + ":" + String(Second));
};
*/

const app = express();

const mongoose = require('./db');

const alerts = require('./routes/alert.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/alert', alerts);

let port = process.env.PORT || 3030;

app.listen(port, () => {
    console.log('Server running at: ' + port);
});

async function sendEmail(updateTime) {
  await searchForAlertsAndSendEmail.search(updateTime);
}

setInterval(sendEmail, 120000, "2MIN");

setInterval(sendEmail, 600000, "10MIN");

setInterval(sendEmail, 1800000, "30MIN");

