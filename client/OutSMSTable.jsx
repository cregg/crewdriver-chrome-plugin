var React = require('react');
var InSMSRow = require('./InSMSRow.jsx');
var mui = require('material-ui');
var Table = mui.Table;

var OutSMSTable = React.createClass({
  generateRowData: function(sms){
    return {
      name : {
        content: sms.contractor.firstName[0] + ' ' + sms.contractor.lastName
      },
      formattedPhone: {
        content: sms.contractor.formattedPhone
      },
      time: {
        content: sms.outboundMessage.sentOutTime
      }
    }
  },
  getRowHeaders: function(){
    return {
      name : {
        content: 'Name'
      },
      formattedPhone: {
        content: 'Phone'
      },
      time: {
        content: 'Sent'
      }
    }
  },
  getHeaderOrder: function(){
    return ['name', 'formattedPhone', 'time'];
  },
  render: function() {
    var sms = this.props.sms;
    var rows = [];
    for(var i = 0; i < sms.length; i++){
      rows.push(this.generateRowData(sms[i]));
    }
    return (
      <div style={{ 'overflow-y' : 'scroll', 'max-height' : '350px' }}>
        <Table headerColumns={this.getRowHeaders()}
                columnOrder={this.getHeaderOrder()}
                rowData={rows}
                selectable={false}
                displayRowCheckbox={false}
                canSelectAll={false}
                displaySelectAll={false}
                stripedRows={true}
                showRowHover={true} />
      </div>
    );
  }

});

module.exports = OutSMSTable;