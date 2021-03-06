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
var Table = mui.Table;
var ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();

var ResultsTable = React.createClass({  
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  handleBackClick : function(){
    this.props.mountLandingPage();
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
    var confirmMessage = this.props.confirmed.length > 0 ?  'Confirmed Crew for call ' : 'No Confirmed Crew for call ';
    confirmMessage += this.props.job.showName;
    var messagedMessage = this.props.rows.length > 0 ?  'Messaged Crew for call ' : 'No messaged Crew for call ';
    messagedMessage += this.props.job.showName;
      return (
        <div>
          <Tabs initialSelectedIndex={1} inkBarStyle={{ display : 'none' }} >
            <Tab label="<- Return To Jobs" onActive={this.handleBackClick}
                                                                  style={{ backgroundColor : '#276B57' }} />
            <Tab label="Confirmed" style={{ backgroundColor : '#276B57' }} > 
              <div className="row" style={{ marginBottom : '5px' }}> 
                <div className="col s12">
                  <h5>{confirmMessage}</h5> 
                </div>
              </div>
              <div>
                <ConfirmedTable confirmed={this.props.confirmed} />
              </div> 
            </Tab> 
            <Tab label="Messaged" style={{ backgroundColor : '#276B57' }}> 
              <div className="row" style={{ marginBottom : '5px' }}> 
                <div className="col s12">
                  <h5>{messagedMessage}</h5>
                </div>
              </div>
              <div> 
                <OutSMSTable sms={this.props.rows} />
              </div> 
            </Tab>
          </Tabs>
        </div>
   );
  }
});

module.exports = ResultsTable;