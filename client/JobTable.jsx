var React = require('react');
var $ = require('jquery');
var JobRow = require('./JobRow.jsx');
var ClassNames = require('classnames');

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
        </div>
   );
  }
});

module.exports = JobTable;