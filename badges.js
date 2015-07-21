var serverEvent;
var intervalId = setInterval(function(){
  var adminId = localStorage.getItem('adminKey');
  if(adminId !== null && serverEvent == null){
    serverEvent = new EventSource("https://productiondriver-notifications.herokuapp.com/NotificationsSSE?token="+adminId);
      serverEvent.onopen = function(){
        // console.log("Connection Opened.");
        clearInterval(intervalId);      
      };
      serverEvent.onmessage = function(event){
        if(event.data.indexOf("connection-alive") > -1){ 
          // console.log("Connection Alive."); 
          return; 
        }
        var updatesArray = JSON.parse(event.data);
        var newNotifications = [];
        for(var i = 0; i < updatesArray.length; i++){
          if(!updatesArray[i].viewed){
            newNotifications.push(updatesArray[i]);
          }
        }
        if(newNotifications.length > 0){
          chrome.browserAction.setBadgeText({ text :  newNotifications.length.toString() });
        }
        else{
          chrome.browserAction.setBadgeText({ text :  '' });
        }
        localStorage.setItem('updates', JSON.stringify(updatesArray));
      };
    serverEvent.onerror = function(event){
      // console.log("Error");
      serverEvent = null;
    };
  }
}, 1000);