var React = require('react');
var mui = require('material-ui');
var LinearProgress = mui.LinearProgress;
var ThemeManager = new mui.Styles.ThemeManager();

var LoadingComponent = React.createClass({

  childContextTypes: {
      muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    var message = this.props.message !== null ? this.props.message : "";
    return (
        <div>
          <div className="row">
            <div className="col s12">
              <h5>{message}</h5>
            </div>
          </div>
            <LinearProgress mode="indeterminate" />
        </div>
    );
  }

});

module.exports = LoadingComponent;