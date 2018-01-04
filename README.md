# Generator-matise
[![npm version](https://badge.fury.io/js/generator-matise.svg)](http://badge.fury.io/js/generator-matise)

Yeoman generator for matise projects


# Getting Started
- npm install -g generator-matise
- mkdir [new project]
- cd [new dir]
- yo matise

# Angular
- npm install
- npm run dev

of

- npm install
- grunt

# Wordpress
- CHANGE vagrant IP in Vagrantfile!!!!!
- vagrant up
- composer install
- npm install
- npm run dev

#### Font generation
In order to be able to generate icon fonts and webfonts from ttf/otf.
- `brew install batik fontforge ttfautohint ttf2eot`
- Generate icons: `grunt icons`
- Convert fonts: `grunt fonts`

#### Vagrant Database creds
powered by: https://box.scotch.io/

- User: root
- Pass: root
- DB: scotchbox
- Host: [vagrant ip]

# Releasing new version
- `npm login`
- commit new code
- `npm version <update_type>` (update type can be: patch, minor, major)
- `npm publish`

## If not on a npm registered machine yet
https://docs.npmjs.com/getting-started/publishing-npm-packages

### References (Inspiration)
- https://github.com/wesleytodd/YeoPress
