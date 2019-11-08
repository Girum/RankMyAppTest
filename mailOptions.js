mailOptions = function (to, data) {

    /*console.log(`Email will be sent to ${to}`);
    console.log(data);
    console.log("\n");*/
    var itemsAcc="";
    data.forEach(item => {
        itemsAcc = itemsAcc.concat(item);
        itemsAcc = itemsAcc.concat('\n');
    });
    let mailOptions = {
        from: 'giotestemail16@gmail.com',
        to: to,
        subject: 'Look this offers!',
        text: itemsAcc
     };
     return mailOptions;
};

module.exports.mailOpt = mailOptions;