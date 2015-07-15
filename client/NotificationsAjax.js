var $ = require('jQuery');
var CDAConsts = require('./CrewDriverAppConsts.js');
var Environment = require('./Environment.js');

var NotificationAjax = {
	setNotificationsAsRead : function(notifications){
		if(notifications.length <= 0){
			return;
		}
		for(var i = 0; i < notifications.length; i++){
			notifications[i].viewed = true;
		}
		$.ajax({
			url : CDAConsts.getUrl(Environment.env) + 'rest/messageUpdates/',
			data : JSON.stringify(notifications),
			method : 'PUT',
			contentType : 'application/json',
			success : function(response){
				chrome.browserAction.setBadgeText({ text :  '' });
			}	
		});
	}
};

module.exports = NotificationAjax;
