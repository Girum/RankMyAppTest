const Alert = require('../models/alert.model');

exports.getAlerts = async function (req, res) {
    try{
        await Alert.find({}, function (err, alerts){
            if(err){
                console.log(err);
            } else if(Array.isArray(alerts) && [].length){
                res.send({ status: "Alerts not found!"});
            } else {
                res.send(alerts);
            }
        });
    } catch(err) {
        console.log(err);
    }
};

exports.getAlertsByEmail = async function (req, res) {
    const email = req.query.email.trim();
    try{
        await Alert.find({email: email}, function (err, alerts){
            if(err){
                console.log(err);
            } else if(Array.isArray(alerts) && [].length){
                res.send({ status: "Alerts not found!"});
            } else {
                res.send(alerts);
            }
        });
    } catch(err) {
        console.log(err);
    }
};

exports.getAlertsByTime = function (req, res) {
    const updateTime = req.query.updateTime.trim();
    try{
        Alert.find({updateTime: updateTime}, function (err, alerts){
            if(err){
                console.log(err);
            } else if(Array.isArray(alerts) && [].length){
                res.send({ status: "Alerts not found!"});
            } else {
                res.send(alerts);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.createAlert = async function (req,res) {
    const email = req.body.email.trim();
    const searchPhrase = req.body.searchPhrase.trim();
    const updateTime = req.body.updateTime.trim();

    let alert = new Alert(
        {
            searchPhrase: searchPhrase,
            email: email,
            updateTime: updateTime
        }
    );

    try{
        await Alert.findOne({ email: email, searchPhrase: searchPhrase}, function(err, hasAlert){
            if(err){
                console.log(err);
            } else if(hasAlert) {
                res.send({ status: "Alert with this search already saved for this email address!"});
            } else if(updateTime != "2MIN" && updateTime != "10MIN" && updateTime != "30MIN"){
                res.send({ status: "Alerts must be 2MIN, 10MIN or 30MIN!"});
            } else {
                alert.save(function (err){
                    if(err){
                        console.log(err);
                    } else {
                        res.send({ status: "Alert created sucessfully!"});
                    }
                });
            }
        })
    } catch(err) {
        console.log(err);
    }
    
};

exports.updateAlertSearchPhrase = async function (req, res) {
    const email = req.body.email.trim();
    const searchPhrase = req.body.searchPhrase.trim();
    const updatedSearchPhrase = req.body.updatedSearchPhrase.trim();
    try{
        await Alert.findOne({ email: email, searchPhrase: updatedSearchPhrase}, function(err, hasAlert){
            if(err){
                console.log(err);
            } else if(hasAlert) {
                res.send({ status: "Alert with this search already saved for this email address!"});
            } else {
                Alert.findOneAndUpdate({email: email, searchPhrase: searchPhrase}, {searchPhrase: updatedSearchPhrase},function (err, alertUpdated){
                    if(err){
                        console.log(err);
                    } else if(!alertUpdated){
                        res.send({ status: "Alert not found!"});
                    } else {
                        res.send({ status: "Alert search phrase updated sucessfully!"});
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.updateAlertTime = async function (req, res) {
    const email = req.body.email.trim();
    const searchPhrase = req.body.searchPhrase.trim();
    const newTime = req.body.newTime.trim();
    try{
        await Alert.findOneAndUpdate({email: email, searchPhrase: searchPhrase}, {updateTime: newTime},function (err, alertUpdated){
            if(err){
                console.log(err);
            } else if(!alertUpdated){
                res.send({ status: "Alert not found!"});
            } else if(newTime != "2MIN" && newTime != "10MIN" && newTime != "30MIN"){
                res.send({ status: "Alerts must be 2MIN, 10MIN or 30MIN!"});
            } else{
                res.send({ status: "Alert time updated sucessfully!"});
            }
        });
    } catch (err) {
        console.log(err);
    }      
};

exports.deleteAlert = async function (req, res) {
    const email = req.body.email.trim();
    const searchPhrase = req.body.searchPhrase.trim();
    try{
        await Alert.findOneAndDelete({email: email, searchPhrase: searchPhrase}, function (err, alertDeleted){
            if(err){
                console.log(err);
            } else if(!alertDeleted){
                res.send({ status: "Alert not found!"});
            } else {
                res.send({ status: "Alert deleted sucessfully!"});
            }
        });
    } catch (err) {
        console.log(err);
    }
};