/** MyAwesomeReactComponent.jsx */
 
var React = require('react');
var mui = require('material-ui');
var Authenticate = require('./Authenticate.js');
var ThemeManager = new mui.Styles.ThemeManager();
var JobTable = require('./JobTable.jsx');
var JobAjax = require('./JobAjax.js');
var LoadingComponent = require('./LoadingComponent.jsx');

var LoginComponent = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function(){
    return { visible : 'inline' };
  },
  setVisibleState: function(value){
    this.state.visible = value;
  },
  handleSubmit: function(e){
    e.preventDefault();
    var loginComponent = this;
    loginComponent.setState({visible : 'none'});
    var loadingComponent = React.render(<LoadingComponent message="Loading Jobs..."/>, document.getElementById('loading'));
    var ajaxAuth = Authenticate.authenticate(this.state.login, this.state.password);
    ajaxAuth.done(function(key){
      Authenticate.setCookie(key);
      var jobsAjax = JobAjax.getJobs();
      jobsAjax.done(function(response){
        React.unmountComponentAtNode(document.getElementById('loading'));
        var jobs = response;
        React.render(<JobTable jobs={jobs} />, document.getElementById('jobRows'));
      });
    });
  },
  handlePasswordChange: function(e){
    this.setState({password: e.target.value});
  },
  handleLoginChange: function(e){
    this.setState({login: e.target.value});
  },
  render: function() {
    var cx = React.addons.classSet;
    var fullRowInputClass = cx({
      'input-field' : true,
      'col': true,
      's12': true  
    });
    var buttonClass = cx({
      'waves-effect': true,
      'waves-light': true,
      'btn': true
    });
    return (
        <div style={{display : this.state.visible}}>
          <form onSubmit={this.handleSubmit}>
            <div className='row'>
              <div className={fullRowInputClass}>
                <input placeholder='Login' type="text" onChange={this.handleLoginChange}/>
              </div>
            </div>
            <div className='row'>
              <div className={fullRowInputClass}>
                <input placeholder='Password' type="password" onChange={this.handlePasswordChange}/>
              </div>
            </div>
            <div style={{width: "100%"}}>
              <button className={buttonClass} type="submit" style={{color : "#5AC4A4", width : "100%"}}>Sign In</button>
            </div>
          </form>
        </div>
    );
  }
 
});
 
module.exports = LoginComponent;