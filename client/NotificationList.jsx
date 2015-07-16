var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var List = mui.List;
var ListItem = mui.ListItem;
var Avatar = mui.Avatar;
var NotificationsAjax = require('./NotificationsAjax.js');
var NotificationListItem = require('./NotificationListItem.jsx');

var NotificationList = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentDidMount: function() {
    NotificationsAjax.setNotificationsAsRead(this.props.updates);    
  },
  render: function() {
    var listItems = [];
    var updates = this.props.updates;
    for(var i = 0; i < updates.length; i++){
      var avatar = <Avatar style={{fontSize : '15px'}} >{updates[i].jobId}</Avatar>;
      listItems.push(<NotificationListItem leftAvatar={avatar} 
                                                primaryText={updates[i].details}
                                                notification={updates[i]}
                                                hideLandingPage={this.props.handleJobView}
                                                mountLandingPage={this.props.mountLandingPage} />);
    }
    return (
      <List subheader='Notifications'>
        {listItems}
      </List>
    );
  }

});

module.exports = NotificationList;