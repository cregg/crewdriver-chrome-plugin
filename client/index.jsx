var React = require('react');
var mui = require('material-ui');
var LoginComponent = require('./LoginComponent.jsx');
var Authenticate = require('./Authenticate.js');
var LoadingComponent = require('./LoadingComponent.jsx');
var JobTable = require('./JobTable.jsx');
var $ = require('jquery');
var JobAjax = require('./JobAjax.js');
var administratorCheck = Authenticate.checkAdministrator();
var LandingPage = require('./LandingPage.jsx');

var loadingComponent = React.render(<LoadingComponent message="Loading Details..."/>, document.getElementById('loading'));

administratorCheck.done(function(response) {
  var jobsAjax = JobAjax.getJobs();
  jobsAjax.done(function(response){
  	React.unmountComponentAtNode(document.getElementById('loading'));
  	var jobs = response;
  	React.render(<LandingPage jobs={jobs} />, document.getElementById('jobRows'));
  });
});

administratorCheck.fail(function(response) {
  React.unmountComponentAtNode(document.getElementById('loading'));
  React.render(<LoginComponent />, document.getElementById('crewdriver'));
  $('#crewdriver').show();
});