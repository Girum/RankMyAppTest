const Alert = require('./models/alert.model');
const searchEbay = require('./searchEbay');
const nodemailer = require('nodemailer');
const mailOptions = require('./mailOptions');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'giotestemail16@gmail.com',
      pass: 'gigi160693'
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
        console.log(alert.searchPhrase);
        var email = alert.email;
        console.log(email);
        searchEbay.search(alert.searchPhrase).then( function(response){
          var items = response.data.findItemsByKeywordsResponse[0].searchResult[0].item;
          var itemsAcc = [];
          items.forEach(item => {
          var itemName = item.title[0];
          var itemURL = item.viewItemURL[0];
          var itemPrice = item.sellingStatus[0].currentPrice[0].__value__;
          //var itemCurrency = item.sellingStatus[0].currentPrice[0].currencyId;
            var Item = `${itemName}, just USD ${itemPrice}! Visit: ${itemURL}`;
            itemsAcc.push(Item);
            
            //console.log(result);
            /*transporter.sendMail(mailOpt, function(err, data){
              if(err){
                  console.log(err);
              } else {
                  //console.log(data);
                  console.log(`Email sent in ${minute} minutes`);
              }
          });*/
            //console.log(Item);
            //mailOptions.mailOpt("giovanni.bonin@gmail.com", Item);
          //console.log(`Item found -> ${itemName}, just USD ${itemPrice}! Visit: ${itemURL}`)
          });
          var mailOpt = mailOptions.mailOpt(email, itemsAcc);
          transporter.sendMail(mailOpt, function(err, data){
            if(err){
                console.log(err);
            } else {
                //console.log(data);
                console.log(`Email sent in ${minute} minutes`);
            }
        });
          //console.log(mailOpt);
        });
      });
    }
});
};

module.exports.search = searchAlerts;