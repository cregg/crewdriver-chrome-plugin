var React = require('react');
var mui = require('material-ui');
var CircularProgress = mui.CircularProgress;
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
    return (
      <div>
        <CircularProgress mode="indeterminate" />
      </div>
    );
  }

});

module.exports = LoadingComponent;