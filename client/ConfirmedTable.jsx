var React = require('react');
var ConfirmedRow = require('./ConfirmedRow.jsx');
var mui = require('material-ui');
var Table = mui.Table;


var ConfirmedTable = React.createClass({
  generateRowData: function(crewMember){
    return {
      name : {
        content: crewMember.firstName + ' ' + crewMember.lastName
      },
      formattedPhone: {
        content: crewMember.formattedPhone
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
      }
    }
  },
  getHeaderOrder: function(){
    return ['name', 'formattedPhone'];
  },
  render: function() {
    var crewMembers = this.props.confirmed;
    var rows = [];
    for(var i = 0; i < crewMembers.length; i++){
      rows.push(this.generateRowData(crewMembers[i]));
    }  
    return (
      <div style={{ overflowY : 'scroll', maxHeight : '350px' }}>
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

module.exports = ConfirmedTable;