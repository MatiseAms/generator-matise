module.exports = {
	bowerinstall: {
		command: 'bower install'
	},
	pulldatabase: {
		command: 'sh pulldatabase.sh'
	},
	buildcontainer: {
		command: 'sh run.sh'
	},
	startcontainer: {
		command: 'docker start <%= appName %>'
	},
	stopcontainer: {
		command: 'docker stop <%= appName %>'
	},
	destroycontainer: {
		command: 'docker rm <%= appName %>'
	}
};
