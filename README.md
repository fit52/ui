[![Build Status](https://travis-ci.org/fit52/ui.svg?branch=master)](https://travis-ci.org/fit52/ui)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/867941?v=4" width="100px;" alt="Andrew Daniel"/><br /><sub><b>Andrew Daniel</b></sub>](http://www.andrewdaniel.co.uk)<br />[🐛](https://github.com/fit52/ui/issues?q=author%3Aajdaniel "Bug reports") [💻](https://github.com/fit52/ui/commits?author=ajdaniel "Code") [🎨](#design-ajdaniel "Design") [🖋](#content-ajdaniel "Content") [🤔](#ideas-ajdaniel "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/16669769?v=4" width="100px;" alt="Mark Vardy"/><br /><sub><b>Mark Vardy</b></sub>](https://github.com/markvardy)<br />[🤔](#ideas-markvardy "Ideas, Planning, & Feedback") [🐛](https://github.com/fit52/ui/issues?q=author%3Amarkvardy "Bug reports") [💻](https://github.com/fit52/ui/commits?author=markvardy "Code") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!