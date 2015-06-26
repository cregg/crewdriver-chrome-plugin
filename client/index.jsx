var React = require('react');
var mui = require('material-ui');
var LoginComponent = require('./LoginComponent.jsx');
var Authenticate = require('./Authenticate.js');
var LoadingComponent = require('./LoadingComponent.jsx');
var JobTable = require('./JobTable.jsx');
var $ = require('jquery');
var JobAjax = require('./JobAjax.js');
var administratorCheck = Authenticate.checkAdministrator();

React.render(<LoadingComponent />, document.getElementById('loading'));

administratorCheck.done(function(response) {
  $('#loading').hide();	
  var jobsAjax = JobAjax.getJobs();
  jobsAjax.done(function(response){
  	var jobs = response;
  	React.render(<JobTable jobs={jobs} />, document.getElementById('jobRows'));
  });
});

administratorCheck.fail(function(response) {
  $('#loading').hide();
  React.render(<LoginComponent />, document.getElementById('crewdriver'));
  $('#crewdriver').show();
});