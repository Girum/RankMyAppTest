mailOptions = function (to, data) {

    var itemsAcc="";
    data.forEach(item => {
        itemsAcc = itemsAcc.concat(item);
        itemsAcc = itemsAcc.concat('\n\n');
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