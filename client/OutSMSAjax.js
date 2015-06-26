var $ = require('jQuery');
var CDAConsts = require('./CrewDriverAppConsts.js');

var OutSMSAjax = {
  getJobs : function(jobId){
    return $.getJSON(CDAConsts.getUrl('staging') + 'rest/jobs/' + jobId + '/out_sms');
  },
  getOffersOnly : function(outSMSList){
    var offers = [];
    for(var i = 0; i < outSMSList.length; i++){
      if(outSMSList[i].outboundMessage.type === 'STANDARD_SMS'){
        outSMSList[i].outboundMessage.type = 'WORK OFFER';
        offers.push(outSMSList[i]);
      }
    }
    return offers;
  }
};

module.exports = OutSMSAjax;