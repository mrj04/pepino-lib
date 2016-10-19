#!/bin/bash

set -eo pipefail
buildkite-agent meta-data set "acklen:slack:channel" "pepino"
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm current
nvm use 4 | tee bk-pipeline.log
echo "--- NPM Login"  | tee bk-pipeline.log
npm login <<!
$NPM_USERNAME
$NPM_PASSWORD
$NPM_EMAIL
!
echo "--- Install Dependencies" | tee bk-pipeline.log
yarn | tee bk-pipeline.log
echo "--- Build And Test" | tee bk-pipeline.log
gulp bump | tee bk-pipeline.log
gulp | tee bk-pipeline.log
