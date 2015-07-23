var $ = require('jQuery');
var CDAConsts = require('./CrewDriverAppConsts.js');
var Environment = require('./Environment.js');

var NotesAjax = {
	getNotes : function(){
		return $.ajax({
			url : CDAConsts.getUrl(Environment.env) + 'rest/notifications',
			headers : { 'max' : '10' },
			dataType : 'json'

	});
	},
	getNote: function(id){
		return $.getJSON(CDAConsts.getUrl(Environment.env) + 'rest/notifications/' + id);
	}
};

module.exports = NotesAjax;