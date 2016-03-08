# Generator-matise
[![npm version](https://badge.fury.io/js/generator-matise.svg)](http://badge.fury.io/js/generator-matise)

Yeoman generator for matise projects with Docker


# Getting Started
- npm install -g generator-matise
- yo matise

# Wordpress
- bash run.sh
- npm install
- grunt doedingen
- grunt

# Wordpress Docker Database
- User: admin
- Pass: matise
- DB: wordpress

# Angular
- CHANGE vagrant IP in Vagrantfile!!!!!
- vagrant up
- npm install
- grunt doedingen
- grunt

# Releasing new version
- `npm login`
- commit new code
- `npm version <update_type>` (update type can be: patch, minor, major)
- `npm publish`

## If not on a registred machine yet
https://docs.npmjs.com/getting-started/publishing-npm-packages

### References (Inspiration)
- https://github.com/wesleytodd/YeoPress
