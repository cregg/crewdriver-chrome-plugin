var CrewDriverAppConsts = {
	'prodUrl' : 'https://go.crewdriverapp.com/',
	'stagingUrl' : 'http://stagedriver.herokuapp.com/',
	'devUrl' : 'http://localhost:8080/',
	'authUrl' : 'rest/sessions/signIn',
	'authCheckUrl' : 'rest/sessions/',
	getAuthUrl : function(env){
		if (env === 'dev'){
			return this.devUrl + this.authUrl;
		}	
		if (env === 'staging'){
			return this.stagingUrl + this.authUrl;
		}
	},
	getAuthCheckUrl : function(env){
		if(env === 'dev'){
			return this.devUrl + this.authCheckUrl;
		}	
		if (env === 'staging'){
			return this.stagingUrl + this.authCheckUrl;
		}
	},
	getUrl : function(envString){
		if(envString === 'dev'){
			return this.devUrl;
		}	
		if (envString === 'staging'){
			return this.stagingUrl;
		}	
	}
};

module.exports = CrewDriverAppConsts;