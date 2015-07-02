var React = require('react');
var $ = require('jquery');
var JobRow = require('./JobRow.jsx');
var ClassNames = require('classnames');
var CreateButton = require('./CreateButton.jsx');
var CDAConsts = require('./CrewDriverAppConsts.js');
var Environment = require('./Environment.js');

var JobTable = React.createClass({
  getInitialState : function(){
    return {
      hide : '',
      hoverable : 'hoverable',
    }
  },
  render: function() {
    var rows = [];
    var jobs = this.props.jobs;
    for(var i = 0; i < jobs.length; i++){
      rows.push(< JobRow job={jobs[i]} key={jobs[i].id} table={this} />);
    }
    var divClassNames = ClassNames(this.state.hide);
    var tableClassNames = ClassNames(this.state.hoverable);
    var createJobUrl = CDAConsts.getUrl(Environment.env) + 'rest/jobs/new';
    var dashboardUrl = CDAConsts.getUrl(Environment.env) + 'rest/jobs/'
    return (
        <div className={divClassNames}>
          <table className={tableClassNames}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Show</th>
                <th>Call</th>                
                <th>Shifts</th>
                <th>Tier</th>
                <th>Escalates In</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          <div className="row">
            <div className="col s6">
              <div className="left-align"><CreateButton url={dashboardUrl} icon="assessment" /></div>
            </div>
            <div className="col s6">
              <div className="right-align"><CreateButton url={createJobUrl} icon="add" /></div>
            </div>
          </div>
        </div>
   );
  }
});

module.exports = JobTable;