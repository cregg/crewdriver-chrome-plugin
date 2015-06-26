var React = require('react');
var $ = require('jquery');
var ConfirmedTable = require('./ConfirmedTable.jsx');
var InSMSRow = require('./InSMSRow.jsx');
var OutSMSTable = require('./OutSMSTable.jsx');
var ClassNames = require('classnames');
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var ThemeManager = new mui.Styles.ThemeManager();


injectTapEventPlugin();

var ResultsTable = React.createClass({
  
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
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
    var showDivClass = ClassNames(this.state);
      return (
        <div>
          <Tabs>
            <Tab label="Confirmed"> 
              <div> 
                <h5>Confirmed Crew for call {this.props.job.showName}</h5> 
                <ConfirmedTable confirmed={this.props.confirmed} />
              </div> 
            </Tab> 
            <Tab label="Messaged" className="overFlowY"> 
              <div> 
                <OutSMSTable sms={this.props.rows} />
              </div> 
            </Tab>
          </Tabs>
          <Tabs>
            <Tab label="Return To Jobs" onActive={this.handleBackClick}/>
          </Tabs>
        </div>
   );
  }
});

module.exports = ResultsTable;