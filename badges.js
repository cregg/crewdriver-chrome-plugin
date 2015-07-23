var serverEvent;
var adminId;

var intervalNumber = setInterval(function(){
  chrome.cookies.get({
  url: 'https://go.crewdriverapp.com/',
  name: 'gw_sess_id'
}, 
function(cookie){
  adminId = cookie != null ? cookie.value : "";
  localStorage.setItem('adminKey', adminId);
  if(adminId !== ""){
    initSSE();
  }
});  
}, 10000);

  // var adminId = localStorage.getItem('adminKey');
function initSSE(){
  serverEvent = new EventSource("https://productiondriver-notifications.herokuapp.com/NotificationsSSE?token="+adminId);
    serverEvent.onopen = function(){
      console.log("Connection Opened.");
      clearInterval(intervalNumber);
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
    console.log("Error");
  }
}  
