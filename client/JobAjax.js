var $ = require('jQuery');
var CDAConsts = require('./CrewDriverAppConsts.js');

var JobAjax = {
	getJobs : function(){
		return $.ajax({
			url : CDAConsts.getUrl('staging') + 'rest/jobs',
			headers : { 'max' : '3' } 
	});
	}
}

module.exports = JobAjax;