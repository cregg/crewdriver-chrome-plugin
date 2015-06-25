var $ = require('jQuery');
var CDAConsts = require('./CrewDriverAppConsts.js');

var Authenticate = {
	authenticate : function(login, password){
		var loginObject = {
			'login' : login,
			'password' : password
		 };
		 return $.ajax({
		 	url : CDAConsts.getAuthUrl('staging'),
		 	data : JSON.stringify(loginObject),
		 	method : 'POST',
		 	contentType : 'application/json'
		 });
 	},
	checkAdministrator : function(){
		return $.get(CDAConsts.getAuthCheckUrl('staging'));
	},
	setCookie : function(response){
		chrome.cookies.set({
            		url : CDAConsts.getUrl('staging'),
            		name : 'gw_sess_id',
            		value : response.value,
            		expirationDate : ((new Date().getTime()/1000) + (3600*24))
        	});
	}
};

module.exports = Authenticate;