[![Build Status](https://travis-ci.org/fit52/ui.svg?branch=master)](https://travis-ci.org/fit52/ui)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Development

If you would like to contribute to this project please create a fork, and submit pull requests. We also welcome issues and enhancement requests.

Set up the local config to point to the cloudant database. Copy `config/default.json` to `config/local.json` and enter the correct connection details. Without this, the app won't run

run `yarn install` then `yarn dev` to run the UI and Back-end concurrently

# Pushing to production

For now, only @ajdaniel should do this. However, the publishing of the website happens for every commit to the master branch using Travis-CI.

`yarn build` will compile the React code to the `/dist` directory.

`yarn start` will start the server connect to the database, and will serve files in the `dist` directory.

Log into Bluemix via the cli, and push the app. The manifest file will do the rest.
