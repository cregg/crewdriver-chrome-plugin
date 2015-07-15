var $ = require('jQuery');
var CDAConsts = require('./CrewDriverAppConsts.js');
var Environment = require('./Environment.js');
var Authenticate = {
	authenticate : function(login, password){
		var loginObject = {
			'login' : login,
			'password' : password
		 };
		 return $.ajax({
		 	url : CDAConsts.getAuthUrl(Environment.env),
		 	data : JSON.stringify(loginObject),
		 	method : 'POST',
		 	contentType : 'application/json'
		 });
 	},
	checkAdministrator : function(){
		return $.get(CDAConsts.getAuthCheckUrl(Environment.env));
	},
	setCookie : function(response){
		localStorage.setItem('adminKey', response.value);
		chrome.cookies.set({
            		url : CDAConsts.getUrl(Environment.env),
            		name : 'gw_sess_id',
            		value : response.value,
            		expirationDate : ((new Date().getTime()/1000) + (3600*24))
        	});
	}
};

module.exports = Authenticate;