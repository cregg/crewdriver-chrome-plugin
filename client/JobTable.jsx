var React = require('react');
var $ = require('jquery');
var JobRow = require('./JobRow.jsx');
var ClassNames = require('classnames');
var CreateButton = require('./CreateButton.jsx');
var CDAConsts = require('./CrewDriverAppConsts.js');
var Environment = require('./Environment.js');
var mui = require('material-ui');
var Table = mui.Table;
var OutSMSAjax = require('./OutSMSAjax.js');
var ResultsTable = require('./ResultsTable.jsx');
var ConfirmedAjax = require('./ConfirmedAjax.js');
var LoadingComponent = require('./LoadingComponent.jsx');
var IconButton = mui.IconButton;

var JobTable = React.createClass({
  getButtonColor: function(status){
    if(status === 'All Done'){
      return {
        color : '#5CB85C'
      };
    }
    if(status === 'Complete'){
     return {
        color : '#D9534F'
      }; 
    }
    return {
      color: '#F0AD4E'
    };
  },
  getInitialState : function(){
    return {
      hide : '',
      hoverable : 'hoverable',
    }
  },
  showJobInfo: function(job){
    this.props.handleJobView();
    // This block is also in NotificationListItem.jsx. Should be refactored. 
    var outSMSAjax = OutSMSAjax.getJobs(job.jobId);
    var confirmedAjax = ConfirmedAjax.getConfirmed(job.jobId);
    var thisTable = this;
    var loadingComponent = React.render(<LoadingComponent message="Loading Job Details..."/>, document.getElementById('loading'));
    $.when(outSMSAjax, confirmedAjax).done(function (outListResponse, confirmedListResponse){
      var outList = outListResponse[0];
      outList = OutSMSAjax.getOffersOnly(outList);
      React.unmountComponentAtNode(document.getElementById('loading'));
      var confirmedList = ConfirmedAjax.getCrewObjects(confirmedListResponse[0].contractorHash);
      React.render(<ResultsTable confirmed={confirmedList}
                                  rows={outList}
                                  job={job}
                                  table={thisTable}
                                  mountLandingPage={thisTable.props.mountLandingPage} />,
                                  document.getElementById('inSMSTable'));
    });
  },
  getIconColor: function(job){

  },
  generateRowData: function(job){
    var linkHTML = <div title=''><IconButton iconStyle={this.getButtonColor(job.status)}
                                             iconClassName="material-icons"
                                             onClick={this.showJobInfo.bind(null, job)}>pageview</IconButton> {job.jobId}</div>

    // <a href="#" title="" onClick={this.showJobInfo.bind(null, job)}><i className="material-icons">pageview</i> {job.jobId}</a>;
    return {
      view: {
        content: linkHTML
      },
      id: {
        content: job.jobId
      },
      show: {
        content: "" + job.showName + " " + job.callName
      },
      shifts: {
        content: job.jobSlots
      },
      tier: {
        content: job.tier
      },
      escalatesIn: {
        content: job.nextActionRelative
      },
    }
  },
  render: function() {
    var rows = [];
    var jobs = this.props.jobs;
    var headerCols = {
      view: {
        content: 'View'
      },
      id : {
        content: 'ID',
      },
      show: {
        content: 'Show',
      },
      shifts: {
        content: 'Shifts'
      },
      tier: {
        content: 'Tier'
      },
      escalatesIn: {
        content: 'Jumps In'
      }
    };
    var columnOrder = ['id', 'show', 'shifts', 'tier', 'escalatesIn', 'view'];
    for(var i = 0; i < jobs.length; i++){
      rows.push(this.generateRowData(jobs[i]));
    }
    var divClassNames = ClassNames(this.state.hide);
    return (
        <div className={divClassNames} id="jobTable" style={{ 'overflow-y' : 'scroll', 'max-height' : '350px' }}>
          <Table headerColumns={headerCols}
                columnOrder={columnOrder}
                rowData={rows}
                selectable={false}
                displayRowCheckbox={false}
                canSelectAll={false}
                displaySelectAll={false} />
         </div>
   );
  }
});

module.exports = JobTable;