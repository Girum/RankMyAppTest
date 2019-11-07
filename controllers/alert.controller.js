const Alert = require('../models/alert.model');
const axios = require('axios');

const nodemailer = require('nodemailer');

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
    text: 'Este é um email teste para ver se está enviando.'
};


let MyAppID = "Giovanni-RankMyAp-PRD-8b31a1ca7-8498fbd8";
let OPERATION_NAME = "findItemsByKeywords";
let sortOrder = "PricePlusShippingLowest";
let qtyPerPage = 3;

exports.test = async function (req, res) {

    var keywords = req.body.keywords;
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

    try{
    const response = await axios.get(url);
    var itemsFound = response.data.findItemsByKeywordsResponse[0].searchResult[0].item;
    var count = 0;
    itemsFound.forEach(items =>{
        //console.log("Item " + String(++count) + ":");
        //console.log(items);
    });
    res.send(itemsFound);
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log(err);
        } else {
            console.log(data);
            console.log("Email sent!");
        }
    });
    
    } catch (error){
        console.log(error);
    }

};

exports.createAlert = function (req,res) {

    let alert = new Alert(
        {
            searchPhrase: req.body.searchPhrase,
            email: req.body.email,
            updateTime: req.body.updateTime
        }
    );

    Alert.findOne({ email: req.body.email, searchPhrase: req.body.searchPhrase}, function(err, hasAlert){
        if(err){
            console.log(err);
        } else if(hasAlert) {
            res.send({ status: "Alert with this search already saved for this email address!"});
        } else {
            console.log(alert);
            alert.save(function (err){
                if(err){
                    console.log(err);
                } else {
                    res.send({ status: "Alert created sucessfully!"});
                }
            });
        }
    })
    
};

exports.getAlerts = function (req, res) {
    Alert.find({email: req.query.email}, function (err, alerts){
        if(err){
            console.log(err);
        } else if(Array.isArray(alerts)){
            res.send({ status: "Alerts not found!"});
        } else {
            res.send(alerts);
        }
    });
};

exports.updateAlert = function (req, res) {
    Alert.findOne({ email: req.body.email, searchPhrase: req.body.updatedSearchPhrase}, function(err, hasAlert){
        if(err){
            console.log(err);
        } else if(hasAlert) {
            res.send({ status: "Alert with this search already saved for this email address!"});
        } else {
            Alert.findOneAndUpdate({email: req.body.email, searchPhrase: req.body.searchPhrase}, {searchPhrase: req.body.updatedSearchPhrase},function (err, alertUpdated){
                if(err){
                    console.log(err);
                } else if(!alertUpdated){
                    res.send({ status: "Alert not found!"});
                } else {
                    res.send({ status: "Alert updated sucessfully!"});
                }
            });
            
        }
    })
};

exports.deleteAlert = function (req, res) {
    Alert.findOneAndDelete({email: req.body.email, searchPhrase: req.body.searchPhrase}, function (err, alertDeleted){
        if(err){
            console.log(err);
        } else if(!alertDeleted){
            res.send({ status: "Alert not found!"});
        } else {
            res.send({ status: "Alert deleted sucessfully!"});
        }
    });
};