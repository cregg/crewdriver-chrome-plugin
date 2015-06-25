var React = require('react');
var $ = require('jquery');
var InSMSAjax = require('./InSMSAjax.js');
var InSMSTable = require('./InSMSTable.jsx');

var InSMSRow = React.createClass({
  render: function() {
    return (
        <tr>
          <td>{this.props.sms.body}</td>
          <td>{this.props.sms.phone}</td>
          <td>{this.props.sms.sentInTime}</td>
        </tr>
    );
  }

});

module.exports = InSMSRow;