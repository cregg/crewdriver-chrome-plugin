var React = require('react');
var mui = require('material-ui');
var $ = require('jquery');
var ThemeManager = new mui.Styles.ThemeManager();
var List = mui.List;
var ListItem = mui.ListItem;
var OutSMSAjax = require('./OutSMSAjax.js');
var ConfirmedAjax = require('./ConfirmedAjax.js');
var JobAjax = require('./JobAjax.js');
var ResultsTable = require('./ResultsTable.jsx');
var LoadingComponent = require('./LoadingComponent.jsx');

var NotificationListItem = React.createClass({
  buildResultsTable: function(){
    this.props.hideLandingPage();
    // This block is also in JobRow.jsx. Should be refactored. 
    var outSMSAjax = OutSMSAjax.getJobs(this.props.notification.jobId);
    var confirmedAjax = ConfirmedAjax.getConfirmed(this.props.notification.jobId);
    var jobXhr = JobAjax.getJob(this.props.notification.jobId); 
    var loadingComponent = React.render(<LoadingComponent message="Loading Job Details..."/>, document.getElementById('loading'));
    var mountLandingPageFunction = this.props.mountLandingPage;
    $.when(outSMSAjax, confirmedAjax, jobXhr).done(function (outListResponse, confirmedListResponse, jobResponse){
      var job = jobResponse[0];
      var outList = outListResponse[0];
      outList = OutSMSAjax.getOffersOnly(outList);
      React.unmountComponentAtNode(document.getElementById('loading'));
      var confirmedList = ConfirmedAjax.getCrewObjects(confirmedListResponse[0].contractorHash);
      React.render(<ResultsTable confirmed={confirmedList}
                                                      rows={outList}
                                                      job={job}
                                                      mountLandingPage={mountLandingPageFunction} />,
                                                      document.getElementById('inSMSTable')); 
    });
  },
  render: function() {
    return (
      <div>
        <ListItem leftAvatar={this.props.leftAvatar} 
                        primaryText={this.props.primaryText} 
                        onClick={this.buildResultsTable}/> 
      </div>
    );
  }

});

module.exports = NotificationListItem;