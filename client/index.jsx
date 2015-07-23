var React = require('react');
var mui = require('material-ui');
var LoginComponent = require('./LoginComponent.jsx');
var Authenticate = require('./Authenticate.js');
var LoadingComponent = require('./LoadingComponent.jsx');
var JobTable = require('./JobTable.jsx');
var $ = require('jquery');
var JobAjax = require('./JobAjax.js');
var NotesAjax = require('./NotesAjax.js');
var administratorCheck = Authenticate.checkAdministrator();
var LandingPage = require('./LandingPage.jsx');
var CDAConsts = require('./CrewDriverAppConsts.js');
var Environment = require('./Environment.js')

var loadingComponent = React.render(<LoadingComponent message="Loading Details..."/>, document.getElementById('loading'));

administratorCheck.done(function(response) {
  var jobsAjax = JobAjax.getJobs();
  var notesAjax = NotesAjax.getNotes();
  $.when(notesAjax, jobsAjax).done(function(notesResponse, jobsResponse){
        React.unmountComponentAtNode(document.getElementById('loading'));
        var jobs = jobsResponse[0];
        var notes = notesResponse[0];
        React.render(<LandingPage jobs={jobs} notes={notes}/>, document.getElementById('jobRows'));
      });
});

administratorCheck.fail(function(response) {
  React.unmountComponentAtNode(document.getElementById('loading'));
  React.render(<LoginComponent />, document.getElementById('crewdriver'));
  $('#crewdriver').show();
});