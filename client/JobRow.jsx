var React = require('react');
var $ = require('jquery');
var InSMSAjax = require('./InSMSAjax.js');
var InSMSTable = require('./InSMSTable.jsx');

var JobRow = React.createClass({
  handleClick : function(event){
    this.props.table.setState({
      hide : 'hide'
    });
    var inSMSAjax = InSMSAjax.getJobs(this.props.job.jobId);
    var thisJob = this.props.job;
    var thisTable = this.props.table;
    inSMSAjax.done(function(inSMSList){
        React.render(<InSMSTable rows={inSMSList} 
                                                        job={thisJob} 
                                                        table={thisTable}/>, 
                                                        document.getElementById('inSMSTable'));
    });  
  },
  render: function() {
    return (
        <tr>
          <td>{this.props.job.jobId}</td>
          <td>{this.props.job.showName}</td>
          <td>{this.props.job.callName}</td>
          <td>{this.props.job.jobSlots}</td>
          <td>{this.props.job.tier}</td>
          <td><a href="#" onClick={this.handleClick}><i className="material-icons">pageview</i></a></td>
        </tr>
    );
  }
});

module.exports = JobRow;