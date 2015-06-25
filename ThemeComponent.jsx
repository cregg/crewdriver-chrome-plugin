/** LinearProgressComponent.jsx */
 
var React = require('react'),
  mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager();
 
var ThemeComponent = React.createClass({
 
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
 
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
 });
 
module.exports = ThemeComponent;