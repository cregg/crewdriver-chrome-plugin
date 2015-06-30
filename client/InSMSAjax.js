var $ = require('jQuery');
var CDAConsts = require('./CrewDriverAppConsts.js');
var Environment = require('./Environment.js');

var InSMSAjax = {
	getJobs : function(jobId){
		return $.getJSON(CDAConsts.getUrl(Environment.env) + 'rest/jobs/' + jobId + '/in_sms');
	}
};

module.exports = InSMSAjax;