const Alert = require('./models/alert.model');
const searchEbay = require('./searchEbay');
const nodemailer = require('nodemailer');
const mailOptions = require('./mailOptions');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS
  }
});

searchAlerts = async function (updateTime){
  var minute = updateTime.substring(0,updateTime.indexOf('M'));
  await Alert.find({ updateTime: updateTime}, function(err, alerts){
      if(err){
        console.log(err);
      } else if (Array.isArray(alerts) && [].length){
        console.log(`There are no alerts for ${minute} minutes.`);
      } else {
        alerts.forEach(alert => {
          var email = alert.email;
          searchEbay.search(alert.searchPhrase).then( function(response){
            var items = response.data.findItemsByKeywordsResponse[0].searchResult[0].item;
            var itemsAcc = [];
            items.forEach(item => {
            var itemName = item.title[0];
            var itemURL = item.viewItemURL[0];
            var itemPrice = item.sellingStatus[0].currentPrice[0].__value__;

            var currency = item.sellingStatus[0].currentPrice[0];
            var currencyAux = JSON.stringify(currency);
            var itemCurrency = currencyAux.substring(currencyAux.indexOf(':')+2, currencyAux.indexOf(',')-1);
            
            var Item = `${itemName}, just ${itemCurrency} ${itemPrice}! Visit: ${itemURL}`;
            itemsAcc.push(Item);
            });
            var mailOpt = mailOptions.mailOpt(email, itemsAcc);
            transporter.sendMail(mailOpt, function(err, data){
              if(err){
                  console.log(err);
              } else {
                  console.log(`Email sent in ${minute} minutes`);
              }
            });
          });
        });
      }
  });
};

module.exports.search = searchAlerts;