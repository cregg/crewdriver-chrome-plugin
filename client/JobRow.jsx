var React = require('react');
var $ = require('jquery');
var OutSMSAjax = require('./OutSMSAjax.js');
var ResultsTable = require('./ResultsTable.jsx');
var ConfirmedAjax = require('./ConfirmedAjax.js');
var LoadingComponent = require('./LoadingComponent.jsx');
var jobStatusStyle = {
  'All Done' : {
    backgroundColor : '#B2DFDB'
  },
  'Complete' : {
    backgroundColor : '#FFE082'
  }
}
var JobRow = React.createClass({
  handleClick : function(event){
    this.props.table.setState({
      hide : 'hide'
    });
    this.props.handleJobView();
    var outSMSAjax = OutSMSAjax.getJobs(this.props.job.jobId);
    var confirmedAjax = ConfirmedAjax.getConfirmed(this.props.job.jobId);
    var thisJob = this.props.job;
    var thisTable = this.props.table;
    var loadingComponent = React.render(<LoadingComponent message="Loading Job Details..."/>, document.getElementById('loading'));
    var thisJobRow = this;
    $.when(outSMSAjax, confirmedAjax).done(function (outListResponse, confirmedListResponse){
      var outList = outListResponse[0];
      outList = OutSMSAjax.getOffersOnly(outList);
      React.unmountComponentAtNode(document.getElementById('loading'));
      var confirmedList = ConfirmedAjax.getCrewObjects(confirmedListResponse[0].contractorHash);
      React.render(<ResultsTable confirmed={confirmedList}
                                                      rows={outList}
                                                      job={thisJob}
                                                      table={thisTable}
                                                      mountLandingPage={thisJobRow.props.mountLandingPage} />,
                                                      document.getElementById('inSMSTable')); 
    });
  },
  render: function() {
    return (
        <tr style={jobStatusStyle[this.props.job.status]}>
          <td>{this.props.job.jobId}</td>
          <td>{this.props.job.showName}</td>
          <td>{this.props.job.callName}</td>
          <td>{this.props.job.jobSlots}</td>
          <td>{this.props.job.tier}</td>
          <td className="center-align">{this.props.job.nextActionRelative}</td>
          <td style={{ backgroundColor : '#FFFFFF' }}><a href="#" onClick={this.handleClick}><i className="material-icons" >pageview</i></a></td>
        </tr>
    );
  }
});

module.exports = JobRow;