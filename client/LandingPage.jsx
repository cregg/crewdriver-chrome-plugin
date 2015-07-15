var React = require('react');
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var JobTable = require('./JobTable.jsx');
var NotificationList = require('./NotificationList.jsx');
var ThemeManager = new mui.Styles.ThemeManager();

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
      activeTab : 0
    };
  },
  handleMount: function(){
    this.setState({
      visible : true,
      activeTab : 1
    });
  },
  handleJobView: function(){
    this.setState({
      visible : false
    });
  },
  render: function() {
    var updates = JSON.parse(localStorage.getItem('updates'));
    var landingPage = !this.state.visible ? '' : 
    <Tabs initialSelectedIndex={this.state.activeTab} >
      <Tab label='Notifications'>
        <NotificationList updates={updates} />
      </Tab>
      <Tab label='Jobs'>
        <JobTable jobs={this.props.jobs} 
                          handleJobView={this.handleJobView} 
                          mountLandingPage={this.handleMount} />
      </Tab>
    </Tabs>
    return (
      <div>
        {landingPage}         
      </div>
    );
  }
});

module.exports = LandingPage;