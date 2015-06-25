var React = require('react');
var $ = require('jquery');
var InSMSRow = require('./InSMSRow.jsx');
var ClassNames = require('classnames');
var InSMSTable = React.createClass({
  handleBackClick : function(){
    this.props.table.setState({
      hide : 'display'
    });
    React.unmountComponentAtNode(document.getElementById('inSMSTable'));
  },
  getInitialState : function(){
    return {
      hide : false,
      hoverable : true
    }
  },
  render: function() {
    var rows = [];
    var sms = this.props.rows;
    for(var i = 0; i < sms.length; i++){
      if (sms[i].type !== 'UNKNOWN'){
        rows.push(< InSMSRow sms={sms[i]} key={sms[i].id} />);
      }
    }
    var showDivClass = ClassNames(this.state);
    console.log(this.isMounted());
    return (
        <div className={showDivClass}>
          <h4><a href="#" onClick={this.handleBackClick}><i className="material-icons">keyboard_arrow_left</i></a> {this.props.job.showName}</h4>
          <table>
            <thead>
              <tr>
                <th>Message</th>
                <th>Phone</th>
                <th>Date</th>
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

module.exports = InSMSTable;