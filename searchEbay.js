const axios = require('axios');

searchEbay = async function (keywords) {

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
      
  };

  module.exports.search = searchEbay;