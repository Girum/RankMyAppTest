const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');



function returnTime(){
let date_ob = new Date();
let Hour = date_ob.getHours();
let Minute = date_ob.getMinutes();
let Second = date_ob.getSeconds();
console.log("Hora: " + String(Hour) + ":" + String(Minute) + ":" + String(Second));
};

returnTime();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'giotestemail16@gmail.com',
      pass: 'gigi160693'
  }

});

let mailOptions = {
   from: 'giotestemail16@gmail.com',
   to: 'giovanni.bonin@gmail.com',
   subject: 'Teste de email NodeMailer',
   text: 'Este é um email teste para ver se está enviando em 2 min.'
};

let mailOptions10 = {
  from: 'giotestemail16@gmail.com',
  to: 'giovanni.bonin@gmail.com',
  subject: 'Teste de email NodeMailer',
  text: 'Este é um email teste para ver se está enviando em 10 min.'
};

let mailOptions30 = {
  from: 'giotestemail16@gmail.com',
  to: 'giovanni.bonin@gmail.com',
  subject: 'Teste de email NodeMailer',
  text: 'Este é um email teste para ver se está enviando em 30 min.'
};

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

function sendEmail() {
  transporter.sendMail(mailOptions, function(err, data){
    if(err){
        console.log(err);
    } else {
        //console.log(data);
        console.log("Email sent in 2 minutes");
        returnTime();
    }
});
}

function sendEmail10() {
  transporter.sendMail(mailOptions10, function(err, data){
    if(err){
        console.log(err);
    } else {
        //console.log(data);
        console.log("Email sent in 10 minutes");
        returnTime();
    }
});
}

function sendEmail30() {
  transporter.sendMail(mailOptions30, function(err, data){
    if(err){
        console.log(err);
    } else {
        //console.log(data);
        console.log("Email sent in 30 minutes");
        returnTime();
    }
});
}

setInterval(sendEmail, 120000);

setInterval(sendEmail10, 600000);

setInterval(sendEmail30, 1800000);

