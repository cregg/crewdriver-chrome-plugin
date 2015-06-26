var React = require('react');
var $ = require('jquery');

var InSMSRow = React.createClass({
  render: function() {
    return (
        <tr>
          <td>{this.props.sms.contractor.firstName[0]}. {this.props.sms.contractor.lastName}</td>
          <td>{this.props.sms.contractor.formattedPhone}</td>
          <td>{this.props.sms.outboundMessage.sentOutTime} ago</td>
        </tr>
    );
  }

});

module.exports = InSMSRow;