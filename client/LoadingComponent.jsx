var React = require('react');
var mui = require('material-ui');
var LinearProgress = mui.LinearProgress;
var ThemeManager = new mui.Styles.ThemeManager();

var LoadingComponent = React.createClass({

  childContextTypes: {
      muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    var message = this.props.message !== null ? this.props.message : "";
    return (
        <div>
            <h5>{message}</h5>
          <div>
            <LinearProgress mode="indeterminate" />
          </div>
        </div>
    );
  }

});

module.exports = LoadingComponent;