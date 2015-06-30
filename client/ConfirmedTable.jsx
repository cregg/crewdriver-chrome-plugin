var React = require('react');
var ConfirmedRow = require('./ConfirmedRow.jsx');

var ConfirmedTable = React.createClass({

  render: function() {
    var crewMembers = this.props.confirmed;
    var rows = [];
    for(var i = 0; i < crewMembers.length; i++){
      rows.push(<ConfirmedRow crewMember={crewMembers[i]} />);
    }  
    return (
      <div style={{ overflowY : 'scroll', maxHeight : '350px' }}>
        <table>
          <thead>
            <tr>
              <th>Crew</th>
              <th>Phone</th>
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

module.exports = ConfirmedTable;