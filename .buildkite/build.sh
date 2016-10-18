#!/bin/bash

set -eo pipefail
buildkite-agent meta-data set "acklen:slack:channel" "pepino"
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm current
nvm use 4
echo "--- NPM Login"
npm login <<!
$NPM_USERNAME
$NPM_PASSWORD
$NPM_EMAIL
!
echo "--- Install Dependencies"
npm update
echo "--- Build And Test"
gulp bump
gulp
if [[ "$BUILDKITE_BRANCH" == "develop"  ]]; then
  echo "--- deploy to develop"
  npm publish
  cd ..
  rm -rf pepino-demo
  git clone git@github.com:AcklenAvenue/pepino-demo.git
  cd pepino-demo
  git commit --allow-empty -m "empty commit"
  git push heroku develop:master
fi
if [[ "$BUILDKITE_BRANCH" == "staging"  ]]; then
  echo "--- deploy to staging"
  npm publish
fi
if [[ "$BUILDKITE_BRANCH" == "master"  ]]; then
  echo "--- deploy to production"
  npm publish
fi
