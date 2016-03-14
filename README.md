# Generator-matise
[![npm version](https://badge.fury.io/js/generator-matise.svg)](http://badge.fury.io/js/generator-matise)

Yeoman generator for matise projects with Docker


# Getting Started
- Install [Docker toolbox](https://docs.docker.com/toolbox/overview/)
- npm install -g generator-matise
- yo matise

# Wordpress
- grunt buildcontainer
- grunt startcontainer
- grunt bowerinit
- grunt

To see the running containers use:
- docker ps

To see all containers (both running en not running):
- docker ps -a

To stop a docker container use:
- grunt stopcontainer

Destroy a docker container:
- grunt destroycontainer

# Wordpress Docker Database
- User: admin
- Pass: matise
- DB: wordpress

# Angular
- CHANGE vagrant IP in Vagrantfile!!!!!
- vagrant up
- npm install
- grunt bowerinit
- grunt

# Releasing new version
- `npm login`
- commit new code
- `npm version <update_type>` (update type can be: patch, minor, major)
- `npm publish`

# Docker docs
[Docker documentation](https://docs.docker.com/)
[Tutum/Lamp Docker image](https://github.com/tutumcloud/lamp)

## If not on a registred machine yet
https://docs.npmjs.com/getting-started/publishing-npm-packages

### References (Inspiration)
- https://github.com/wesleytodd/YeoPress
