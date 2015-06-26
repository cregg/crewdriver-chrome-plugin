var React = require('react');
var InSMSRow = require('./InSMSRow.jsx');
var OutSMSTable = React.createClass({

  render: function() {
    var sms = this.props.sms;
    var rows = [];
    for(var i = 0; i < sms.length; i++){
      rows.push(< InSMSRow sms={sms[i]} key={sms[i].id} />);
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Crew Member</th>
              <th>Phone</th>
              <th>Sent</th>
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

module.exports = OutSMSTable;