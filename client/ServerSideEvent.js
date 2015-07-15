// var ServerSideEvent = {
//   init : function(){
//     var serverEvent = new EventSource("/MessageUpdateSSE");
//     serverEvent.onopen = function(){
//       console.log("Connection Opened.");
//     };
//     serverEvent.onmessage = function(event){
//       if(event.data.indexOf("connection-alive") > -1){ console.log("Connection Alive."); return; }
//       var updatesArray = JSON.parse(event.data);
//       console.log(updatesArray.length);
//     };
//     $(window).unload(function (){
//         serverEvent.close();
//     });
//   }
// }