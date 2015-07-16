var React = require('react');
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var JobTable = require('./JobTable.jsx');
var NotificationList = require('./NotificationList.jsx');
var ThemeManager = new mui.Styles.ThemeManager();
var injectTapEventPlugin = require("react-tap-event-plugin");
var AppBar = mui.AppBar;
var IconButton = mui.IconButton;
var CDAConsts = require('./CrewDriverAppConsts.js');
var Environment = require('./Environment.js');

injectTapEventPlugin();

var LandingPage = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function(){
    return {
      visible : true,
      activeTab : 0,
      homeUrl : CDAConsts.getUrl(Environment.env) + 'rest/jobs/',
      createUrl : CDAConsts.getUrl(Environment.env) + 'rest/jobs/new',
    };
  },
  handleMount: function(){
    this.setState({
      visible : true,
      activeTab : 1,
    });
  },
  handleJobView: function(){
    this.setState({
      visible : false
    });
  },
  openNewCallPage: function(){
    var win = window.open(this.state.createUrl);
    win.focus(); 
  },
  openCallsListPage: function(){
    var win = window.open(this.state.homeUrl);
    win.focus(); 
  },
  render: function() {
    var updates = JSON.parse(localStorage.getItem('updates'));
    var landingPage = !this.state.visible ? '' : 
    <Tabs initialSelectedIndex={this.state.activeTab} inkBarStyle={{ display : 'none' }} >
      <Tab label='Notifications' style={{ backgroundColor : '#276B57' }}>
        <NotificationList updates={updates} 
                                    handleJobView={this.handleJobView} 
                                    mountLandingPage={this.handleMount} />
      </Tab>
      <Tab label='Jobs' style={{ backgroundColor : '#276B57' }}>
        <JobTable jobs={this.props.jobs} 
                          handleJobView={this.handleJobView} 
                          mountLandingPage={this.handleMount} />
      </Tab>
    </Tabs>
    return (
      <div>
        {landingPage}         
        <AppBar title='CrewDriver'
                        style={{ backgroundColor : '#276B57' }}
                        iconElementLeft={<IconButton iconClassName="material-icons"
                                                                              tooltip='DashBoard' 
                                                                              tooltipPosition='top-right'
                                                                              onClick={this.openCallsListPage}>home</IconButton>}
                        iconElementRight={<IconButton iconClassName="material-icons"
                                                                                tooltip='Create Call' 
                                                                                tooltipPosition='top-left'
                                                                                onClick={this.openNewCallPage}>add</IconButton>} />
      </div>
    );
  }
});

module.exports = LandingPage;