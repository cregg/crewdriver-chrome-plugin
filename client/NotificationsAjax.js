var $ = require('jQuery');
var CDAConsts = require('./CrewDriverAppConsts.js');
var Environment = require('./Environment.js');

var NotificationAjax = {
	setNotificationsAsRead : function(notifications){
		var unreadNotifications = [];
		for(var i = 0; i < notifications.length; i++){
			if(!notifications[i].viewed){
				notifications[i].viewed = true;
				unreadNotifications.push(notifications[i]);
			}
		}
		if(unreadNotifications.length <= 0){
			return;
		}
		$.ajax({
			url : CDAConsts.getUrl(Environment.env) + 'rest/notifications/',
			data : JSON.stringify(unreadNotifications),
			method : 'PUT',
			contentType : 'application/json',
			success : function(response){
				chrome.browserAction.setBadgeText({ text :  '' });
			}	
		});
	}
};

module.exports = NotificationAjax;
