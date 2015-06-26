var React = require('react');

var ConfirmedRow = React.createClass({

  render: function() {
    return (
      <tr>
        <td>{this.props.crewMember.firstName} {this.props.crewMember.lastName}</td>
        <td>{this.props.crewMember.formattedPhone}</td>
      </tr>
    );
  }

});

module.exports = ConfirmedRow;