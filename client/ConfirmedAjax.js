var $ = require('jquery');
var CDAConsts = require('./CrewDriverAppConsts.js');

var ConfirmedAjax = {
  getConfirmed : function(jobId){
    return $.ajax({
      url : CDAConsts.getUrl('staging') + 'rest/jobs/' + jobId + '/jobSlots/-1',
      headers : { 'confirmed' : 'true', 'all' : 'true'}
    });
  },
  getCrewObjects: function(crewHash){
    var crewArray = [];
    for(var key in crewHash){
      if (crewHash.hasOwnProperty(key)) {
        crewArray.push(crewHash[key]);
      }
    }
    return crewArray;
  }
}

module.exports = ConfirmedAjax;