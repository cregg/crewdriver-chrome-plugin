var $ = require('jQuery');
var CDAConsts = require('./CrewDriverAppConsts.js');
var Environment = require('./Environment.js');

var JobAjax = {
	getJobs : function(){
		return $.ajax({
			url : CDAConsts.getUrl(Environment.env) + 'rest/jobs',
			headers : { 'max' : '10' },
			dataType : 'json'

	});
	}
};

module.exports = JobAjax;