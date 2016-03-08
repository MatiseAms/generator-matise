module.exports = {
	bowerinstall: {
		command: 'bower install'
	},
	pulldatabase: {
		command: 'sh pulldatabase.sh'
	},
	builddockercontainer: {
		command: 'sh run.sh'
	},
	startcontainer: {
		command: 'docker start <%= appName %>'
	},
	stopcontainer: {
		command: 'docker stop <%= appName %>'
	}
};
