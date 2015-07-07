var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FloatingActionButton = mui.FloatingActionButton;
var FontIcon = mui.FontIcon;

var CreateButton = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  openNewCallPage: function(){
    var win = window.open(this.props.url);
    win.focus(); 
  },
  render: function() {
    return (
      <FloatingActionButton mini={true} 
                                              secondary={true}>
        <FontIcon className="material-icons"
                           onClick={this.openNewCallPage}>{this.props.icon}
        </FontIcon>
      </FloatingActionButton>
    );
  }
});

module.exports = CreateButton;