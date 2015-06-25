var $ = require('jQuery');
var CDAConsts = require('./CrewDriverAppConsts.js');

var InSMSAjax = {
	getJobs : function(jobId){
		return $.getJSON(CDAConsts.getUrl('staging') + 'rest/jobs/' + jobId + '/in_sms');
	}
}

module.exports = InSMSAjax;