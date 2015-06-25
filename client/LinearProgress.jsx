/** LinearProgressComponent.jsx */
 

  var mui = require('material-ui'),
  LinearProgress = mui.LinearProgress,
  ThemeComponent = require('./ThemeComponent.jsx');
   
var LinearProgressBar = React.createClass({
 
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
 
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
 
  render: function() {
    return (
        <LinearProgress mode='determinate' value={this.props.val} max={100} />
    );
  }
 
});
 
module.exports = LinearProgressBar;