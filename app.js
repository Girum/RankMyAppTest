const express = require('express');
const bodyParser = require('body-parser');
//const mailOptions = require('./mailOptions');
//const axios = require('axios');

//const Alert = require('./models/alert.model');

const searchForAlertsAndSendEmail = require('./searchForAlertsAndSendEmail');

function returnTime(){
let date_ob = new Date();
let Hour = date_ob.getHours();
let Minute = date_ob.getMinutes();
let Second = date_ob.getSeconds();
console.log("Hora: " + String(Hour) + ":" + String(Minute) + ":" + String(Second));
};

/*async function searchEbay(keywords) {

  let MyAppID = "Giovanni-RankMyAp-PRD-8b31a1ca7-8498fbd8";
  let OPERATION_NAME = "findItemsByKeywords";
  let sortOrder = "PricePlusShippingLowest";
  let qtyPerPage = 3;

  var keywords = keywords;
  var splittedKeywords = keywords.split(" ");
  var auxKeywords = "";
  splittedKeywords.forEach(element => {
      auxKeywords = auxKeywords.concat(element);
      auxKeywords = auxKeywords.concat("%20");
  });

  var sendKeywords = auxKeywords.substring(0, auxKeywords.length -3);

  console.log("Keywords: " + sendKeywords);

  var url = "http://svcs.ebay.com/services/search/FindingService/v1";
  url += "?OPERATION-NAME="+OPERATION_NAME;
  url += "&SERVICE-VERSION=1.0.0";
  url += "&SECURITY-APPNAME="+MyAppID;
  url += "&GLOBAL-ID=EBAY-US";
  url += "&RESPONSE-DATA-FORMAT=JSON";
  url += "&REST-PAYLOAD";
  url += "&keywords="+sendKeywords;
  url += "&paginationInput.entriesPerPage="+String(qtyPerPage);
  url += "&sortOrder="+sortOrder;

    return await axios.get(url);
    
    
};*/

returnTime();

/*const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'giotestemail16@gmail.com',
      pass: 'gigi160693'
  }

});*/

/*let mailOptions = {
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
};*/

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
  //console.log(data);
  //mailOptions.mailOpt("giovanni.bonin@gmail.com", data);
/*await Alert.find({ updateTime: "2MIN"}, function(err, alerts){
    if(err){
      console.log(err);
    } else if (Array.isArray(alerts) && [].length){
      console.log("There are no alerts for 2 Minutes.");
    } else {
      alerts.forEach(alert => {
        console.log(alert.searchPhrase);
        searchEbay(alert.searchPhrase).then( function(response){
          var items = response.data.findItemsByKeywordsResponse[0].searchResult[0].item;
          items.forEach(item => {
          var itemName = item.title[0];
          var itemURL = item.viewItemURL[0];
          var itemPrice = item.sellingStatus[0].currentPrice[0].__value__;
          //var itemCurrency = item.sellingStatus[0].currentPrice[0].currencyId;

          console.log(`Item found -> ${itemName}, just USD ${itemPrice}! Visit: ${itemURL}`)
          });
        });
         


      });
    }
});*/

  /*transporter.sendMail(mailOptions, function(err, data){
    if(err){
        console.log(err);
    } else {
        //console.log(data);
        console.log("Email sent in 2 minutes");
        returnTime();
    }
});*/
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

//setInterval(sendEmail, 120000);

setInterval(sendEmail, 120000, "2MIN");

setInterval(sendEmail, 600000, "10MIN");

setInterval(sendEmail, 1800000, "30MIN");

